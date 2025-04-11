import Analysis from "@/components/Analysis"
import Navbar from "@/components/Navbar"
import styles from "./page.module.css"

export default function ProfileListPage() {
    return(
        <div>
            <Navbar />
            <h1 className={styles.profile_text}>プロフィール一覧</h1>
            <Analysis />
        </div>
    )
}
