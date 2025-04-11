import Analysis from "@/components/Analysis"
import Navbar from "@/components/Navbar"
import SimpleRadarChart from "@/components/SimpleRadarChart"
import styles from "./page.module.css"
import StudyTime from "@/components/StudyTime"

export default function ProfileListPage() {
    return(
        <div>
            <Navbar />
            <h1 className={styles.profile_text}>プロフィール一覧</h1>
            <Analysis />
            {/* <StudyTime /> */}
            {/* <SimpleRadarChart /> */}
        </div>
    )
}
