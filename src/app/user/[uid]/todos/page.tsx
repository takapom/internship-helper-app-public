"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import GlassCard from "@/components/GlassCard";
import styles from "./page.module.css";
import SpaceHeader from "@/components/SpaceHeader";
import Footer from "@/components/Footer";

type Todo = {
  id: string;
  uid: string;
  internName: string;
  data: string | number;
  content: string;
  companyName: string;
  status: string;
  memo: string;
};

export default function TodosPage() {
  const { uid } = useParams();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [internName, setInternName] = useState("");
  const [content, setContent] = useState("");
  const [data, setData] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [status, setStatus] = useState("");
  const [memo, setMemo] = useState("");

  // useEffectで画面表示の際に一度だけ実行される
  const fetchTodos = async () => {
    if (!uid || typeof uid !== "string") return;

    const todosRef = collection(db, "users", uid, "todos");
    const snapshot = await getDocs(todosRef);
    const fetched = snapshot.docs.map((doc) => ({
      id: doc.id,
      uid: uid as string,
      ...(doc.data() as {
        internName: string;
        content: string;
        memo: string;
        companyName: string;
        status: string;
        data: number | string;
      }),
    }));
    setTodos(fetched);
  };

  const handleAddTodo = async () => {
    if (!internName.trim() || !content.trim()) return;

    const todosRef = collection(db, "users", uid as string, "todos");
    await addDoc(todosRef, {
      internName,
      content,
      companyName,
      data,
      status,
      memo,
    });

    window.alert("インターンを追加しました！");
    // 入力欄リセット
    setInternName("");
    setContent("");
    setCompanyName("");
    setData("");
    setStatus("");
    setMemo("");
    fetchTodos();
  };

  //uidが変わったタイミングで実行するつまり、ログインしているユーザーが変わったタイミングで実行するようにしている。
  useEffect(() => {
    fetchTodos();
  }, [uid]);

  return (
    <div className={styles.container}>
      <Navbar />
      <SpaceHeader />
      <main className={styles.main}>
        <div className={styles.headerSection}>
          <h1 className={styles.title}>インターン一覧</h1>
          <p className={styles.subtitle}>インターンシップの情報を管理・追跡できます</p>
        </div>

        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>新しいインターンを追加</h2>
          </div>
          <div className={styles.formContent}>
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>企業名</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="例: 株式会社テクノフューチャー"
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>インターン名</label>
                <input
                  type="text"
                  value={internName}
                  onChange={(e) => setInternName(e.target.value)}
                  placeholder="例: サマーインターンシップ"
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>内容</label>
                <input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="例: Webアプリ開発"
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>日程</label>
                <input
                  type="text"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  placeholder="例: 2025年8月1日〜8月5日"
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>選考状況</label>
                <input
                  type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  placeholder="例: エントリー済み"
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>メモ</label>
                <input
                  type="text"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="例: 事前課題あり"
                  className={styles.input}
                />
              </div>
            </div>
            <button onClick={handleAddTodo} className={styles.addButton}>
              <span className={styles.buttonIcon}>+</span>
              インターンを追加
            </button>
          </div>
        </div>

        <div className={styles.internList}>
          {todos.length === 0 ? (
            <div className={styles.emptyState}>
              <p>インターンシップがまだ登録されていません</p>
              <p className={styles.emptyStateSubtext}>上のフォームから新しいインターンを追加してください</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div className={styles.internCard} key={todo.id}>
                <GlassCard
                  id={todo.id}
                  uid={uid as string}
                  internName={todo.internName}
                  companyName={todo.companyName}
                  status={todo.status}
                  data={todo.data}
                  content={todo.content}
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
  );
}
