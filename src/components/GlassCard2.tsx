"use client"

import styles from './GlassCard2.module.css'
import { db } from "../../src/lib/firebase"
import { doc, deleteDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { Briefcase, MapPin, Star, StickyNote, Trash2, Edit } from 'lucide-react'

type Props = {
  uid: string
  id: string
  companyName: string
  industry: string
  desire: string
  location: string
  memo: string
  onDelete: () => void
}

export default function GlassCard2({ uid, id, companyName, industry, desire, location, memo, onDelete }: Props) {
  const router = useRouter()

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "users", uid, "companyList", id))
      alert("削除しました！")
      onDelete()
      router.refresh()
    } catch (err) {
      console.error("削除エラー:", err)
      alert("削除に失敗しました")
    }
  }

  // 志望度に基づいて星の数を決定（例: "5" → 5つ星）
  const desireRating = parseInt(desire) || 0
  const maxRating = 5

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div className={styles.cardHeader}>
            <h3 className={styles.companyName}>{companyName}</h3>
            <div className={styles.industryBadge}>
              <Briefcase size={14} className={styles.badgeIcon} />
              <span>{industry}</span>
            </div>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <MapPin size={16} className={styles.infoIcon} />
                <span>勤務地</span>
              </div>
              <div className={styles.infoValue}>{location}</div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <Star size={16} className={styles.infoIcon} />
                <span>1~5</span>
              </div>
              <div className={styles.starRating}>
                {[...Array(maxRating)].map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className={`${styles.starIcon} ${index < desireRating ? styles.starActive : ''}`}
                    fill={index < desireRating ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>
                <StickyNote size={16} className={styles.infoIcon} />
                <span>メモ</span>
              </div>
              <div className={styles.infoValue}>{memo}</div>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button onClick={handleDelete} className={`${styles.cardButton} ${styles.deleteButton}`}>
              <Trash2 size={16} />
              <span>削除</span>
            </button>
            <button className={`${styles.cardButton} ${styles.editButton}`}>
              <Edit size={16} />
              <span>編集</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
