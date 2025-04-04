import type React from "react"
import styles from "./tool-card.module.css"

interface ToolCardProps {
  name: string
  description: string
  features: string[]
  icon: React.ReactNode
  category: string
}

export function ToolCard({ name, description, features, icon, category }: ToolCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.iconContainer}>{icon}</div>
        <div>
          <h3 className={styles.title}>{name}</h3>
          <div className={styles.category}>{category}</div>
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.description}>{description}</p>

        <div className={styles.features}>
          <h4 className={styles.sectionTitle}>主な機能</h4>
          <ul className={styles.featureList}>
            {features.map((feature, index) => (
              <li key={index} className={styles.featureItem}>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

