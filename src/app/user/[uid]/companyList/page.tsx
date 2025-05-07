"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { collection, getDocs, addDoc } from "firebase/firestore"
import Navbar from "@/components/Navbar"
import GlassCard2 from "@/components/GlassCard2"
import styles from "./page.module.css"
import SpaceHeader from "@/components/SpaceHeader"
import Footer from "@/components/Footer"
import { Plus, Building, Briefcase, MapPin, Star, StickyNote } from "lucide-react"

type Todo = {
  id: string
  uid: string
  companyName: string
  desire: string
  location: string
  memo: string
  industry: string
}

export default function TodosPage() {
  const { uid } = useParams()

  const [todos, setTodos] = useState<Todo[]>([])
  const [companyName, setCompanyName] = useState("")
  const [industry, setIndustry] = useState("")
  const [desire, setDesire] = useState("")
  const [location, setLocation] = useState("")
  const [memo, setMemo] = useState("")

  const fetchTodos = async () => {
    if (!uid || typeof uid !== "string") return

    const todosRef = collection(db, "users", uid, "companyList")
    const snapshot = await getDocs(todosRef)
    const fetched = snapshot.docs.map((doc) => ({
      id: doc.id,
      uid: uid as string,
      ...(doc.data() as { companyName: string; desire: string; industry: string; location: string; memo: string }),
    }))
    setTodos(fetched)
  }

  const handleAddTodo = async () => {
    if (!companyName.trim() || !desire.trim()) return

    const todosRef = collection(db, "users", uid as string, "companyList")
    await addDoc(todosRef, {
      companyName,
      desire,
      location,
      industry,
      memo,
    })

    window.alert("企業を追加しました！")
    // 入力欄リセット
    setCompanyName("")
    setDesire("")
    setLocation("")
    setIndustry("")
    setMemo("")
    fetchTodos()
  }

  useEffect(() => {
    fetchTodos()
  }, [uid])

  return (
    <div className={styles.container}>
      <Navbar />
      {/* <SpaceHeader /> */}
      <main className={styles.main}>
        <div className={styles.headerSection}>
          <h1 className={styles.title}>企業リスト</h1>
        </div>

        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>新しい企業を追加</h2>
          </div>
          <div className={styles.formContent}>
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>
                  <Building size={16} className={styles.labelIcon} />
                  企業名
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="例: 株式会社テクノフューチャー"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>
                  <Briefcase size={16} className={styles.labelIcon} />
                  業界
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="例: IT・通信"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>
                  <Star size={16} className={styles.labelIcon} />
                  志望度
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    value={desire}
                    onChange={(e) => setDesire(e.target.value)}
                    placeholder="例: 5（1〜5）"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>
                  <MapPin size={16} className={styles.labelIcon} />
                  勤務地
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="例: 東京都渋谷区"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>
                  <StickyNote size={16} className={styles.labelIcon} />
                  メモ
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="例: 福利厚生が充実"
                    className={styles.input}
                  />
                </div>
              </div>
            </div>

            <button onClick={handleAddTodo} className={styles.addButton}>
              <Plus className={styles.buttonIcon} size={20} />
              <span>企業を追加</span>
            </button>
          </div>
        </div>

        <div className={styles.companyList}>
          {todos.length === 0 ? (
            <div className={styles.emptyState}>
              <p>企業がまだ登録されていません</p>
              <p className={styles.emptyStateSubtext}>上のフォームから新しい企業を追加してください</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div className={styles.companyCard} key={todo.id}>
                <GlassCard2
                  id={todo.id}
                  uid={uid as string}
                  companyName={todo.companyName}
                  location={todo.location}
                  industry={todo.industry}
                  desire={todo.desire}
                  memo={todo.memo}
                  onDelete={fetchTodos}
                />
              </div>
            ))
          )}
        </div>
      </main>
      <Footer
        githubUrl="https://github.com/takapom"
        twitterUrl="https://x.com/takapom_engin"
        instagramUrl="https://www.instagram.com/takapondes/"
        blogUrl="https://blog-site-ehel.vercel.app/"
      />
    </div>
  )
}
