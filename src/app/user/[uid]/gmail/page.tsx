
"use client"

import { useEffect, useState } from "react"
import styles from "./gmail.module.css"
import Navbar from "@/components/Navbar"
import { Mail } from "lucide-react"
import Footer from "@/components/Footer"

type Email = {
  id: string
  subject: string
  body: string
  classification?: {
    is_relevant: boolean
    reason: string
  }
}


export default function Gmail() {
  const [emails, setEmails] = useState<Email[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("gmailAccessToken")
    if (!token) {
      setLoading(false)
      return
    }
  
    const fetchEmails = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/gmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken: token }),
        })
        const data = await res.json()
        console.log("Gmail API Response:", data)
  
        // ✅ Difyでメールを分類
        const classifiedEmails = await Promise.all(
          data.map(async (email: { subject: string; body: string }) => {
            const res = await fetch("/api/classify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                subject: email.subject,
                body: email.body,
              }),
            })
  
            const result = await res.json()
            return {
              ...email,
              classification: result,
            }
          })
        )
  
        setEmails(classifiedEmails)
      } catch (error) {
        console.error("Error fetching or classifying emails:", error)
      } finally {
        setLoading(false)
      }
    }
  
    fetchEmails()
  }, [])
  

  return (
    <div className={styles.container}>
      
      <Navbar />
      <div className={styles.header}>
        <h1 className={styles.title}>
          <Mail className={styles.mailIcon} />
          Gmail取得ページ
        </h1>
      </div>

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>メールを読み込み中...</p>
        </div>
      ) : emails.length > 0 ? (
        <div className={styles.tableContainer}>
          <table className={styles.emailTable}>
            <thead>
              <tr>
                <th className={styles.subjectHeader}>件名</th>
                <th className={styles.previewHeader}>本文</th>
              </tr>
            </thead>
            <tbody>
              {emails.map((email) => (
                <tr key={email.id} className={styles.emailRow}>
                  <td className={styles.subject}>{email.subject}</td>
                  <td className={styles.preview}>
                    {email.body.length > 150 ? `${email.body.slice(0, 150)}...` : email.body}
                    {email.classification?.is_relevant ? (
                    <p className={styles.label}>🟢 就活/インターン関連</p>
                  ) : (
                    <p className={styles.label}>⚪️ 関係なし</p>
                  )}
                  <p className={styles.reason}>
                    {email.classification?.reason}
                  </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles.noEmails}>
          <Mail size={48} className={styles.noEmailsIcon} />
          <p>メールが見つかりませんでした</p>
        </div>
      )}
      <Footer 
      githubUrl = "https://github.com/takapom"
      twitterUrl = "https://x.com/takapom_engin"
      instagramUrl = "https://www.instagram.com/takapondes/"
      blogUrl = "https://blog-site-ehel.vercel.app/"
      />
    </div>
  )
}
