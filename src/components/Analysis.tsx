"use client"

import { useState } from "react"
import styles from "./analysis.module.css"

export default function Analysis() {
  const [activeTab, setActiveTab] = useState("values")
  const [values, setValues] = useState("")
  const [strengths, setStrengths] = useState("")
  const [weaknesses, setWeaknesses] = useState("")
  const [successes, setSuccesses] = useState("")
  const [failures, setFailures] = useState("")
  const [interests, setInterests] = useState("")
  const [aspirations, setAspirations] = useState("")

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>自己分析</h1>

      <div className={styles.tabsContainer}>
        <div className={styles.tabsList}>
          <button
            className={`${styles.tabButton} ${activeTab === "values" ? styles.activeTab : ""}`}
            onClick={() => handleTabClick("values")}
          >
            価値観
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "strengths" ? styles.activeTab : ""}`}
            onClick={() => handleTabClick("strengths")}
          >
            強み
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "weaknesses" ? styles.activeTab : ""}`}
            onClick={() => handleTabClick("weaknesses")}
          >
            弱み
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "successes" ? styles.activeTab : ""}`}
            onClick={() => handleTabClick("successes")}
          >
            成功体験
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "failures" ? styles.activeTab : ""}`}
            onClick={() => handleTabClick("failures")}
          >
            失敗体験
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "interests" ? styles.activeTab : ""}`}
            onClick={() => handleTabClick("interests")}
          >
            興味関心
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "aspirations" ? styles.activeTab : ""}`}
            onClick={() => handleTabClick("aspirations")}
          >
            将来像
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === "values" && (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>価値観</h2>
                <p className={styles.cardDescription}>あなたが大切にしている価値観や信念について書いてください。</p>
              </div>
              <div className={styles.cardContent}>
                <textarea
                  placeholder="あなたの価値観を入力してください..."
                  className={styles.textarea}
                  value={values}
                  onChange={(e) => setValues(e.target.value)}
                />
              </div>
            </div>
          )}

          {activeTab === "strengths" && (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>強み</h2>
                <p className={styles.cardDescription}>あなたの強みや得意なことについて書いてください。</p>
              </div>
              <div className={styles.cardContent}>
                <textarea
                  placeholder="あなたの強みを入力してください..."
                  className={styles.textarea}
                  value={strengths}
                  onChange={(e) => setStrengths(e.target.value)}
                />
              </div>
            </div>
          )}

          {activeTab === "weaknesses" && (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>弱み</h2>
                <p className={styles.cardDescription}>あなたの弱みや課題について書いてください。</p>
              </div>
              <div className={styles.cardContent}>
                <textarea
                  placeholder="あなたの弱みを入力してください..."
                  className={styles.textarea}
                  value={weaknesses}
                  onChange={(e) => setWeaknesses(e.target.value)}
                />
              </div>
            </div>
          )}

          {activeTab === "successes" && (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>成功体験</h2>
                <p className={styles.cardDescription}>あなたの成功体験について書いてください。</p>
              </div>
              <div className={styles.cardContent}>
                <textarea
                  placeholder="あなたの成功体験を入力してください..."
                  className={styles.textarea}
                  value={successes}
                  onChange={(e) => setSuccesses(e.target.value)}
                />
              </div>
            </div>
          )}

          {activeTab === "failures" && (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>失敗体験</h2>
                <p className={styles.cardDescription}>あなたの失敗体験と、そこから学んだことについて書いてください。</p>
              </div>
              <div className={styles.cardContent}>
                <textarea
                  placeholder="あなたの失敗体験を入力してください..."
                  className={styles.textarea}
                  value={failures}
                  onChange={(e) => setFailures(e.target.value)}
                />
              </div>
            </div>
          )}

          {activeTab === "interests" && (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>興味関心</h2>
                <p className={styles.cardDescription}>あなたの興味や関心のあることについて書いてください。</p>
              </div>
              <div className={styles.cardContent}>
                <textarea
                  placeholder="あなたの興味関心を入力してください..."
                  className={styles.textarea}
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                />
              </div>
            </div>
          )}

          {activeTab === "aspirations" && (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>将来像</h2>
                <p className={styles.cardDescription}>将来どのようなエンジニアになりたいかについて書いてください。</p>
              </div>
              <div className={styles.cardContent}>
                <textarea
                  placeholder="あなたの将来像を入力してください..."
                  className={styles.textarea}
                  value={aspirations}
                  onChange={(e) => setAspirations(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

