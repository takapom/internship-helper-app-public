"use client"

import { LanguageCard } from "./language-card"
import styles from "./languages-grid.module.css"

export function WebLanguages() {
  const webLanguages = [
    {
      name: "React",
      description:
        "Facebookが開発したJavaScriptライブラリで、ユーザーインターフェースを構築するためのコンポーネントベースのアプローチを提供します。",
      features: ["コンポーネントベースのアーキテクチャ", "仮想DOM", "JSX構文", "単方向データフロー", "Reactフック"],
      codeExample: `function Welcome() {
  const [name, setName] = React.useState('');
  
  return (
    <div>
      <h1>Hello, {name || 'World'}!</h1>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
    </div>
  );
}`,
      useCases: "シングルページアプリケーション、モバイルアプリ（React Native）、大規模Webアプリケーション",
      difficulty: "medium" as const,
    },
    {
      name: "Next.js",
      description:
        "Reactベースのフレームワークで、サーバーサイドレンダリング、静的サイト生成、APIルートなどの機能を提供します。",
      features: [
        "サーバーサイドレンダリング (SSR)",
        "静的サイト生成 (SSG)",
        "ファイルベースのルーティング",
        "APIルート",
        "ゼロコンフィグ",
      ],
      codeExample: `// pages/index.js
export default function Home({ data }) {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <p>{data.message}</p>
    </div>
  );
}

export async function getServerSideProps() {
  // サーバーサイドで実行される
  return {
    props: {
      data: { message: 'Hello from SSR!' }
    }
  };
}`,
      useCases: "Webアプリケーション、Eコマースサイト、ブログ、企業サイト、ダッシュボード",
      difficulty: "medium" as const,
    },
    {
      name: "TypeScript",
      description: "JavaScriptのスーパーセットで、静的型付けとオブジェクト指向プログラミング機能を追加した言語です。",
      features: ["静的型付け", "インターフェース", "ジェネリクス", "エニム（列挙型）", "JavaScriptとの互換性"],
      codeExample: `interface User {
  id: number;
  name: string;
  email?: string; // オプショナルプロパティ
}

function greetUser(user: User): string {
  return \`Hello, \${user.name}!\`;
}

const user: User = {
  id: 1,
  name: 'John Doe'
};

console.log(greetUser(user));`,
      useCases: "フロントエンド開発、バックエンド開発（Node.js）、大規模アプリケーション",
      difficulty: "medium" as const,
    },
    {
      name: "JavaScript",
      description:
        "Webブラウザで実行される軽量なインタープリタ型プログラミング言語で、動的型付けとプロトタイプベースのオブジェクト指向をサポートします。",
      features: [
        "動的型付け",
        "関数型プログラミング",
        "非同期処理（Promise, async/await）",
        "クロージャ",
        "プロトタイプベースのオブジェクト指向",
      ],
      codeExample: `// モダンなJavaScript (ES6+)
const fetchData = async () => {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    
    // 配列操作
    const filteredData = data.filter(item => item.active);
    const names = filteredData.map(item => item.name);
    
    console.log(names);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();`,
      useCases: "Webフロントエンド開発、サーバーサイド開発（Node.js）、モバイルアプリ、デスクトップアプリ",
      difficulty: "easy" as const,
    },
    {
      name: "Python",
      description: "読みやすさと簡潔さを重視した汎用プログラミング言語で、幅広い用途に使用されています。",
      features: ["読みやすい構文", "動的型付け", "豊富なライブラリ", "マルチパラダイム", "インタープリタ型"],
      codeExample: `# データ分析の例
import pandas as pd
import matplotlib.pyplot as plt

# データの読み込み
data = pd.read_csv('data.csv')

# データの加工
filtered_data = data[data['value'] > 100]
grouped_data = filtered_data.groupby('category').mean()

# データの可視化
plt.figure(figsize=(10, 6))
grouped_data.plot(kind='bar')
plt.title('Average Values by Category')
plt.ylabel('Average Value')
plt.tight_layout()
plt.show()`,
      useCases: "データ分析、機械学習、Web開発（Django, Flask）、自動化スクリプト、科学計算",
      difficulty: "easy" as const,
    },
    {
      name: "Java",
      description:
        "オブジェクト指向のプログラミング言語で、「Write Once, Run Anywhere」の原則に基づいて設計されています。",
      features: [
        "プラットフォーム非依存",
        "強力な型付け",
        "オブジェクト指向",
        "ガベージコレクション",
        "豊富なライブラリ",
      ],
      codeExample: `import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class StreamExample {
    public static void main(String[] args) {
        // リストの作成
        List<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");
        names.add("Charlie");
        names.add("David");
        
        // Streamを使った処理
        List<String> filteredNames = names.stream()
            .filter(name -> name.length() > 4)
            .map(String::toUpperCase)
            .collect(Collectors.toList());
        
        // 結果の出力
        filteredNames.forEach(System.out::println);
    }
}`,
      useCases: "エンタープライズアプリケーション、Androidアプリ開発、Webアプリケーション、大規模システム",
      difficulty: "easy" as const,
    },
  ]

  return (
    <div className={styles.grid}>
      {webLanguages.map((lang, index) => (
        <LanguageCard
          key={index}
          name={lang.name}
          description={lang.description}
          features={lang.features}
          codeExample={lang.codeExample}
          useCases={lang.useCases}
          difficulty={lang.difficulty}
        />
      ))}
    </div>
  )
}

