import Link from "next/link"
import { Github, Twitter, Instagram, BookOpen } from "lucide-react"
import styles from "./footer.module.css"

interface FooterProps {
  githubUrl: string
  twitterUrl: string
  instagramUrl: string
  blogUrl: string
}

export default function Footer({
  githubUrl = "https://github.com/yourusername",
  twitterUrl = "https://twitter.com/yourusername",
  instagramUrl = "https://instagram.com/yourusername",
  blogUrl = "https://yourblog.com",
}: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.socialLinks}>
          <Link
            href={"https://github.com/takapom"}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="GitHub"
          >
            <Github size={24} />
          </Link>
          <Link
            href={"https://x.com/takapom_engin"}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="X (Twitter)"
          >
            <Twitter size={24} />
          </Link>
          <Link
            href={"https://www.instagram.com/takapondes/"}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </Link>
          <Link
            href={"https://blog-site-ehel.vercel.app/"}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Blog"
          >
            <BookOpen size={24} />
          </Link>
        </div>
        <div className={styles.copyright}>© {new Date().getFullYear()} All rights reserved</div>
      </div>
    </footer>
  )
}
