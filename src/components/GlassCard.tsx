// components/GlassCard.tsx
"use client"
import styles from './GlassCard.module.css';
import { db } from "../../src/lib/firebase"
import {doc, deleteDoc} from 'firebase/firestore';
import { useRouter } from 'next/navigation';



type Props = {
    uid: string;
    id: string;
    internName: string;
    content: string;
    data: string | number;
    companyName: string;
    status: string;
    memo: string;
    onDelete: () => void; // ✅ 追加！
};

export default function GlassCard({ uid, id, internName, content, memo, data, companyName, status, onDelete }: Props) {
    const router = useRouter();
  
    const handleDelete = async () => {
      try {
        await deleteDoc(doc(db, "users", uid, "todos", id));
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
        <p><strong className={styles.headtext}>企業名：</strong>{companyName}</p>
          <p><strong className={styles.headtext}>インターン名：</strong>{internName}</p>
          <p><strong className={styles.headtext}>日程：</strong>{data}</p>
          <p><strong className={styles.headtext}>内容：</strong>{content}</p>
          <p><strong className={styles.headtext}>選考状況：</strong>{status}</p>
          <p><strong className={styles.headtext}>メモ：</strong>{memo}</p>
          <button onClick={handleDelete} className={styles.card_button}>削除</button>
          <button className={styles.edit_button}>編集する</button>
        </div>
      </div>
    );
  }
  