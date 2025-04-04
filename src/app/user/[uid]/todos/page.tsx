"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import GlassCard from "@/components/GlassCard"
import styles from "./page.module.css"
import SpaceHeader from "@/components/SpaceHeader";

type Todo = {
  id: string;
  uid: string;
  internName: string;
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
  const [companyName, setCompanyName] = useState("");
  const [status, setStatus] = useState("");
  const [memo, setMemo] = useState("");

  const fetchTodos = async () => {
    if (!uid || typeof uid !== "string") return;

    const todosRef = collection(db, "users", uid, "todos");
    const snapshot = await getDocs(todosRef);
    const fetched = snapshot.docs.map((doc) => ({
      id: doc.id,
      uid: uid as string,
      ...(doc.data() as { internName: string; content: string; memo: string; companyName: string; status: string; }),
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
      status,
      memo,
    });

    window.alert("インターンを追加しました！");
    // 入力欄リセット
    setInternName("");
    setContent("");
    setCompanyName("");
    setStatus("");
    setMemo("");
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, [uid]);

  return (
    <div>
        <Navbar />
        <SpaceHeader />
      <div>
        <h1 className={styles.list_text}>インターン一覧</h1>
      <div className={styles.input_container}>
      <div className={styles.custom_input}>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="企業名"
          className={styles.input}
        />
        </div>
        <div className={styles.custom_input}>
        <input
          type="text"
          value={internName}
          onChange={(e) => setInternName(e.target.value)}
          placeholder="インターン名"
          className={styles.input}
        />
        </div>
        <div className={styles.custom_input}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="内容"
          className={styles.input}
        />
        </div>
        <div className={styles.custom_input}>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="選考状況"
          className={styles.input}
        />
        </div>
        <div className={styles.custom_input}>
        <input
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="メモ"
          className={styles.input}
        />
        </div>
        <button 
        onClick={handleAddTodo}
        className={styles.whiteButton}
        >追加</button>
      </div>
      </div>

      {/* 一覧表示 */}
      <ul>
        {todos.map((todo) => (
        <GlassCard
        id={todo.id}
        uid={uid as string}  
        key={todo.id}
        internName={todo.internName}
        companyName={todo.companyName}
        status={todo.status}
        content={todo.content}
        memo={todo.memo}
        onDelete={fetchTodos} 
        />
        ))}
      </ul>
    </div>
  );
}




