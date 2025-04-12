import Link from "next/link"
import { Github, Twitter, Instagram, BookOpen } from "lucide-react"
import styles from "./footer.module.css"

type FooterProps = {
  githubUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  blogUrl?: string;
};


export default function Footer({
  githubUrl = "https://github.com/takapom",
  twitterUrl = "https://x.com/takapom_engin",
  instagramUrl = "https://www.instagram.com/takapondes/",
  blogUrl = "https://blog-site-ehel.vercel.app/",
}: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.socialLinks}>
          <Link
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="GitHub"
          >
            <Github size={24} />
          </Link>
          <Link
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="X (Twitter)"
          >
            <Twitter size={24} />
          </Link>
          <Link
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </Link>
          <Link
            href={blogUrl}
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
