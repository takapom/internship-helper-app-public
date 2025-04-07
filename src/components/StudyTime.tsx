

"use client"

import { useState } from "react"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const LANGUAGES = ["React", "Next.js", "Go", "Firebase", "TypeScript"]

export default function WeeklyChartPage() {
  const [week, setWeek] = useState("2025-04-W1")
  const [studyTime, setStudyTime] = useState<{ [lang: string]: number }>({
    React: 0,
    "Next.js": 0,
    Go: 0,
    Firebase: 0,
    TypeScript: 0,
  })

  const handleChange = (lang: string, value: number) => {
    setStudyTime((prev) => ({
      ...prev,
      [lang]: value,
    }))
  }

  const chartData = {
    labels: LANGUAGES,
    datasets: [
      {
        label: `${week} の学習時間（時間）`,
        data: LANGUAGES.map((lang) => studyTime[lang]),
        backgroundColor: "rgba(75,192,192,0.5)",
      },
    ],
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>週ごとの学習時間入力</h1>

      <label>
        週（例: 2025-04-W1）：
        <input
          type="text"
          value={week}
          onChange={(e) => setWeek(e.target.value)}
          placeholder="2025-04-W1"
          style={{ margin: "0 1rem" }}
        />
      </label>

      {LANGUAGES.map((lang) => (
        <div key={lang}>
          <label>
            {lang}：
            <input
              type="number"
              min={0}
              value={studyTime[lang]}
              onChange={(e) => handleChange(lang, Number(e.target.value))}
              style={{ margin: "0 1rem" }}
            />
            時間
          </label>
        </div>
      ))}

      <div style={{ marginTop: "2rem", maxWidth: "700px" }}>
        <Bar data={chartData} />
      </div>
    </div>
  )
}
