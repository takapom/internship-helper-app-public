"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import GlassCard2 from "@/components/GlassCard2"
import styles from "./page.module.css"
import SpaceHeader from "@/components/SpaceHeader";
import Footer from "@/components/Footer";

type Todo = {
  id: string;
  uid: string;
  companyName: string;
  desire: string;
  location: string;
  memo: string;
  industry: string;
};

export default function TodosPage() {
  const { uid } = useParams();
  
  const [todos, setTodos] = useState<Todo[]>([]);
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [desire, setDesire] = useState("");
  const [location, setLocation] = useState("");
  const [memo, setMemo] = useState("");

  const fetchTodos = async () => {
    if (!uid || typeof uid !== "string") return;

    const todosRef = collection(db, "users", uid, "companyList");
    const snapshot = await getDocs(todosRef);
    const fetched = snapshot.docs.map((doc) => ({
      id: doc.id,
      uid: uid as string,
      ...(doc.data() as { companyName: string; desire: string; industry: string; location: string; memo: string;}),
    }));
    setTodos(fetched);
  };

  const handleAddTodo = async () => {
    if (!companyName.trim() || !desire.trim()) return;

    const todosRef = collection(db, "users", uid as string, "companyList");
    await addDoc(todosRef, {
      companyName,
      desire,
      location,
      industry,
      memo,
    });

    window.alert("インターンを追加しました！");
    // 入力欄リセット
    setCompanyName("");
    setDesire("");
    setLocation("");
    setIndustry("");
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
        <h1 className={styles.list_text}>企業リスト</h1>
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
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          placeholder="業界"
          className={styles.input}
        />
        </div>
        <div className={styles.custom_input}>
        <input
          type="text"
          value={desire}
          onChange={(e) => setDesire(e.target.value)}
          placeholder="志望度"
          className={styles.input}
        />
        </div>
        <div className={styles.custom_input}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="勤務地"
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
        <GlassCard2
        id={todo.id}
        uid={uid as string}  
        key={todo.id}
        companyName={todo.companyName}
        location={todo.location}
        industry={todo.industry}
        desire={todo.desire}
        memo={todo.memo}
        onDelete={fetchTodos} 
        />
        ))}
      </ul>
      <Footer />
    </div>
  );
}




