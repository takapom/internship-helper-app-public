"use client"

import { useState } from "react"
import useCurrentUser from "@/hooks/useCurrentUser"
import styles from "./analysis.module.css"

interface AnalysisEntry {
  id: string
  period: string
  stage?: string
  summary: string
  content: string
}

export default function SelfAnalysis() {
  const [entries, setEntries] = useState<AnalysisEntry[]>([])
  const [newEntry, setNewEntry] = useState<Omit<AnalysisEntry, "id">>({
    period: "",
    stage: "",
    summary: "",
    content: "",
  })

  const user = useCurrentUser()

  const handleAddEntry = () => {
    if (newEntry.period && newEntry.summary && newEntry.content) {
      const id = `entry-${Date.now()}`
      setEntries([...entries, { ...newEntry, id }])
      setNewEntry({ period: "", stage: "", summary: "", content: "" })
    }
  }


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>自己分析</h1>

      {user && (
        <div className={styles.userInfo}>
          <img
            src={user.photoURL || "/default-icon.png"}
            alt="User Icon"
            className={styles.userIcon}
          />
          <p className={styles.userName}>{user.displayName}</p>
        </div>
      )}

      <div className={styles.tableContainer}>
        <div className={styles.table}>
          <div className={styles.headerRow}>
            <div className={styles.headerCell}>いつ</div>
            <div className={styles.headerCell}>概要</div>
            <div className={styles.headerCell}>内容</div>
          </div>

          {entries.map((entry) => (
            <div key={entry.id} className={styles.row}>
              <div className={styles.periodCell}>{entry.period}</div>
              <div className={styles.summaryCell}>{entry.summary}</div>
              <div className={styles.contentCell}>{entry.content}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.formSection}>
        <h2 className={styles.formTitle}>新しいエントリーを追加</h2>
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="period" className={styles.label}>
              時期:
            </label>
            <input
              type="text"
              id="period"
              className={styles.input}
              value={newEntry.period}
              onChange={(e) => setNewEntry({ ...newEntry, period: e.target.value })}
              placeholder="例: 高校③"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="summary" className={styles.label}>
              概要:
            </label>
            <input
              type="text"
              id="summary"
              className={styles.input}
              value={newEntry.summary}
              onChange={(e) => setNewEntry({ ...newEntry, summary: e.target.value })}
              placeholder="例: リーダーシップの発揮"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="content" className={styles.label}>
              内容:
            </label>
            <textarea
              id="content"
              className={styles.textarea}
              value={newEntry.content}
              onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
              placeholder="詳細な内容を入力してください"
              rows={4}
            />
          </div>

          <button className={styles.button} onClick={handleAddEntry}>
            追加する
          </button>
        </div>
      </div>
    </div>
  )
}