"use client"

import { useState, useEffect } from "react"
import styles from "./space-header.module.css"

export default function SpaceHeader() {
  const [starCount, setStarCount] = useState(0)

  // 星をランダムに生成する関数
  useEffect(() => {
    // 画面サイズに応じて星の数を調整
    const calculateStarCount = () => {
      const width = window.innerWidth
      return Math.floor(width / 3)
    }

    setStarCount(calculateStarCount())

    const handleResize = () => {
      setStarCount(calculateStarCount())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.starsContainer}>
        {[...Array(starCount)].map((_, i) => {
          const size = Math.random() * 2 + 1
          const animationDuration = Math.random() * 3 + 2
          const top = Math.random() * 100
          const left = Math.random() * 100

          return (
            <div
              key={i}
              className={styles.star}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${top}%`,
                left: `${left}%`,
                animationDuration: `${animationDuration}s`,
              }}
            />
          )
        })}
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>エンジニア志望の学生へ、就活やインターンの情報管理アプリケーション</h1>
          <p className={styles.subtitle}>Shumailは就活やインターンの情報を即座に得ることができる<br />アプリケーションです。<br />
          例えばGmailからのメールを要約します。<br />
          実際に下記からメールを取得してみましょう。
          </p>
        </div>
      </div>

      <div className={styles.shootingStar} />
    </header>
  )
}

