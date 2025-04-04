import { ToolCard } from "./tool-card"
import { Github, Database, GitBranch, DockIcon as Docker } from "lucide-react"
import styles from "./languages-grid.module.css"

export function DevelopmentTools() {
  const tools = [
    {
      name: "GitHub",
      description:
        "GitHubは、ソフトウェア開発のためのコード共有・バージョン管理プラットフォームです。オープンソースプロジェクトやプライベートリポジトリのホスティング、コラボレーション機能を提供します。",
      features: [
        "リポジトリのホスティング",
        "プルリクエスト",
        "イシュートラッキング",
        "GitHub Actions（CI/CD）",
        "プロジェクト管理",
        "コードレビュー",
      ],
      icon: <Github size={24} />,
      category: "バージョン管理",
    },
    {
      name: "Docker",
      description:
        "Dockerは、アプリケーションをコンテナとしてパッケージ化し、どこでも同じように実行できるプラットフォームです。開発環境と本番環境の一貫性を確保し、デプロイメントを簡素化します。",
      features: [
        "コンテナ化",
        "ポータブルな環境",
        "Docker Compose（複数コンテナの管理）",
        "Docker Hub（コンテナイメージのリポジトリ）",
        "リソース分離",
        "スケーラビリティ",
      ],
      icon: <Docker size={24} />,
      category: "コンテナ化",
    },
    {
      name: "SourceTree",
      description:
        "SourceTreeは、Atlassianが開発したGitおよびMercurialのためのグラフィカルユーザーインターフェースを提供するクライアントツールです。コマンドラインを使わずにGit操作を視覚的に行えます。",
      features: [
        "グラフィカルなコミット履歴",
        "ブランチ管理",
        "マージとリベース",
        "スタッシュ管理",
        "GitFlowのサポート",
        "複数リポジトリの管理",
      ],
      icon: <GitBranch size={24} />,
      category: "Gitクライアント",
    },
    {
      name: "MySQL",
      description:
        "MySQLは、世界で最も広く使われているオープンソースのリレーショナルデータベース管理システム（RDBMS）です。高速、信頼性、使いやすさを特徴としています。",
      features: [
        "リレーショナルデータベース",
        "ACID準拠のトランザクション",
        "ストアドプロシージャ",
        "トリガー",
        "レプリケーション",
        "パーティショニング",
      ],
      icon: <Database size={24} />,
      category: "データベース",
    },
  ]

  return (
    <div className={styles.grid}>
      {tools.map((tool, index) => (
        <ToolCard
          key={index}
          name={tool.name}
          description={tool.description}
          features={tool.features}
          icon={tool.icon}
          category={tool.category}
        />
      ))}
    </div>
  )
}

