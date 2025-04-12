
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
        setEmails(data)
      } catch (error) {
        console.error("Error fetching emails:", error)
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
          Gmail取得ページです！
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
      <Footer />
    </div>
  )
}
