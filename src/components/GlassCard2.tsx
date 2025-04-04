// components/GlassCard.tsx
"use client"
import styles from './GlassCard.module.css';
import { db } from "../../src/lib/firebase"
import {doc, deleteDoc, updateDoc } from 'firebase/firestore';
import Router, { useRouter } from 'next/navigation';


type Props = {
    uid: string;
    id: string;
    companyName: string;
    industry: string;
    desire: string;
    location: string;
    memo: string;
    onDelete: () => void; // ✅ 追加！
};

export default function GlassCard({ uid, id, companyName, industry, desire, location, memo, onDelete }: Props) {
    const router = useRouter();
  
    const handleDelete = async () => {
      try {
        await deleteDoc(doc(db, "users", uid, "companyList", id));
        alert("削除しました！");
        onDelete(); // ✅ 親から渡されたfetchTodos()を呼ぶ
        router.refresh(); // ページを再読み込みして一覧を更新
      } catch (err) {
        console.error("削除エラー:", err);
        alert("削除に失敗しました");
      }
    };
  
    return (
      <div className={styles.container}>
        <div className={styles.card}>
            <p>企業名：{companyName}</p>   
            <p>業界：{industry}</p>
            <p>志望度：{desire}</p>
            <p>勤務地：{location}</p>
          <p className={styles.title_text}>メモ：{memo}</p>
          <button onClick={handleDelete} className={styles.card_button}>削除</button>
          <button className={styles.edit_button}>編集する</button>
        </div>
      </div>
    );
  }
  