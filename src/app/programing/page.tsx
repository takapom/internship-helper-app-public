"use client"

import styles from "./page.module.css"
import { useState } from "react"
import { WebLanguages } from "@/components/web-languages"
import { MobileLanguages } from "@/components/mobile-languages"
import { DevelopmentTools } from "@/components/development-tools"
import Navbar from "@/components/Navbar"

export default function Home() {
  const [activeTab, setActiveTab] = useState("web")

  return (
    <div>
      <Navbar />
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Developers Guide</h1>
        <p className={styles.subtitle}>プログラミング言語とツールの総合ガイド</p>
      </header>

      <main className={styles.main}>
        <div className={styles.tabs}>
          <div className={styles.tabsList}>
            <button
              className={`${styles.tabButton} ${activeTab === "web" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("web")}
            >
              Web開発
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "mobile" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("mobile")}
            >
              モバイル開発
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "tools" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("tools")}
            >
              開発ツール
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === "web" && (
              <div className={styles.tabPanel}>
                <h2 className={styles.sectionTitle}>Web開発の主要言語</h2>
                <WebLanguages />
              </div>
            )}

            {activeTab === "mobile" && (
              <div className={styles.tabPanel}>
                <h2 className={styles.sectionTitle}>モバイル開発の主要言語</h2>
                <MobileLanguages />
              </div>
            )}

            {activeTab === "tools" && (
              <div className={styles.tabPanel}>
                <h2 className={styles.sectionTitle}>開発ツール</h2>
                <DevelopmentTools />
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Developers Guide - All Rights Reserved</p>
      </footer>
    </div>
    </div>
  )
}

