"use client"

import { useRouter } from "next/navigation"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { useState } from "react"
import styles from "./page.module.css"
import { setPersistence, browserLocalPersistence } from "firebase/auth";


export default function HomePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    await setPersistence(auth, browserLocalPersistence); // 👈 追加する
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Firestore にユーザー情報保存（初回のみ）
      const userRef = doc(db, "users", user.uid)
      const snapshot = await getDoc(userRef)
      if (!snapshot.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          createdAt: serverTimestamp(),
        })
      }

      // Todoページへ遷移
      router.push(`/user/${user.uid}/todos`)
      // router.push("/firstPage")
    } catch (err) {
      console.error("ログイン失敗:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <span>就活</span>
          </div>
        </div>
        <h1 className={styles.title}>就活管理アプリへようこそ！</h1>
        <button className={styles.loginButton} onClick={handleLogin} disabled={loading}>
          <svg className={styles.googleIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </svg>
          Googleでログイン
        </button>
        {loading && <p className={styles.loadingText}>ログイン中...</p>}

        <div className={styles.usageGuide}>
          <h2 className={styles.usageTitle}>アプリの使い方</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepIcon}>1</div>
              <div className={styles.stepText}>
                <h3>ログイン</h3>
                <p>Googleアカウントでログインします</p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepIcon}>2</div>
              <div className={styles.stepText}>
                <h3>タスク管理</h3>
                <p>企業リストやインターン管理、その他の機能が可能になります</p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepIcon}>3</div>
              <div className={styles.stepText}>
                <h3>ログアウト</h3>
                <p>ログアウトしたい場合は左上のアイコンをタップ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



