import styles from "./language-card.module.css"
import { Code } from "lucide-react"

interface LanguageCardProps {
  name: string
  description: string
  features: string[]
  codeExample: string
  useCases: string
  difficulty: "easy" | "medium" | "hard"
}

export function LanguageCard({ name, description, features, codeExample, useCases, difficulty }: LanguageCardProps) {
  const difficultyClass = {
    easy: styles.badgeEasy,
    medium: styles.badgeMedium,
    hard: styles.badgeHard,
  }

  const difficultyText = {
    easy: "初心者向け",
    medium: "中級者向け",
    hard: "上級者向け",
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>{name}</h3>
          <span className={`${styles.badge} ${difficultyClass[difficulty]}`}>{difficultyText[difficulty]}</span>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.content}>
        <div className={styles.features}>
          <h4 className={styles.sectionTitle}>主な特徴</h4>
          <ul className={styles.featureList}>
            {features.map((feature, index) => (
              <li key={index} className={styles.featureItem}>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.codeContainer}>
          <div className={styles.codeHeader}>
            <Code size={16} />
            <span>コード例</span>
          </div>
          <pre className={styles.code}>
            <code>{codeExample}</code>
          </pre>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.useCases}>
          <h4 className={styles.sectionTitle}>主な用途</h4>
          <p>{useCases}</p>
        </div>
      </div>
    </div>
  )
}

