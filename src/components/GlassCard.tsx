"use client"

import styles from "./GlassCard.module.css"
import { db } from "../../src/lib/firebase"
import { doc, deleteDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { Calendar, Edit, FileText, StickyNote, Trash2 } from "lucide-react"

type Props = {
  uid: string
  id: string
  internName: string
  content: string
  data: string | number
  companyName: string
  status: string
  memo: string
  onDelete: () => void
}

export default function GlassCard({ uid, id, internName, content, memo, data, companyName, status, onDelete }: Props) {
  const router = useRouter()

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "users", uid, "todos", id))
      alert("削除しました！")
      onDelete()
      router.refresh()
    } catch (err) {
      console.error("削除エラー:", err)
      alert("削除に失敗しました")
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div className={styles.cardHeader}>
            <div className={styles.headerLeft}>
              <h3 className={styles.companyName}>{companyName}</h3>
              <p className={styles.internName}>{internName}</p>
            </div>
            <div className={styles.statusBadge}>{status}</div>
          </div>

          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <Calendar size={16} className={styles.infoIcon} />
              <span className={styles.value}>{data}</span>
            </div>

            <div className={styles.infoItem}>
              <FileText size={16} className={styles.infoIcon} />
              <span className={styles.value}>{content}</span>
            </div>

            <div className={styles.infoItem}>
              <StickyNote size={16} className={styles.infoIcon} />
              <span className={styles.value}>{memo}</span>
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
