import { LanguageCard } from "./language-card"
import styles from "./languages-grid.module.css"

type Difficulty = "easy" | "medium" | "hard"

type MobileLanguage = {
  name: string
  description: string
  features: string[]
  codeExample: string
  useCases: string
  difficulty: Difficulty
}

export function MobileLanguages() {
  const mobileLanguages: MobileLanguage[] = [
    {
      name: "Swift",
      description:
        "Appleが開発したiOSおよびmacOSアプリケーション向けのプログラミング言語で、安全性、パフォーマンス、表現力を重視しています。",
      features: [
        "型安全性",
        "オプショナル型",
        "自動参照カウント（ARC）",
        "プロトコル指向プログラミング",
        "関数型プログラミングのサポート",
      ],
      codeExample: `import UIKit

class ViewController: UIViewController {
    
    // UIコンポーネント
    private let nameLabel = UILabel()
    private let nameTextField = UITextField()
    private let greetButton = UIButton()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
    }
    
    private func setupUI() {
        view.backgroundColor = .white
        
        // ラベルの設定
        nameLabel.text = "名前を入力してください"
        nameLabel.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(nameLabel)
        
        // テキストフィールドの設定
        nameTextField.borderStyle = .roundedRect
        nameTextField.placeholder = "例: 山田太郎"
        nameTextField.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(nameTextField)
        
        // ボタンの設定
        greetButton.setTitle("挨拶する", for: .normal)
        greetButton.backgroundColor = .systemBlue
        greetButton.setTitleColor(.white, for: .normal)
        greetButton.layer.cornerRadius = 8
        greetButton.addTarget(self, action: #selector(greetTapped), for: .touchUpInside)
        greetButton.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(greetButton)
        
        // オートレイアウト制約
        NSLayoutConstraint.activate([
            nameLabel.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 50),
            nameLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            
            nameTextField.topAnchor.constraint(equalTo: nameLabel.bottomAnchor, constant: 20),
            nameTextField.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            nameTextField.widthAnchor.constraint(equalToConstant: 250),
            
            greetButton.topAnchor.constraint(equalTo: nameTextField.bottomAnchor, constant: 30),
            greetButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            greetButton.widthAnchor.constraint(equalToConstant: 200),
            greetButton.heightAnchor.constraint(equalToConstant: 50)
        ])
    }
    
    @objc private func greetTapped() {
        guard let name = nameTextField.text, !name.isEmpty else {
            showAlert(message: "名前を入力してください")
            return
        }
        
        showAlert(message: "こんにちは、\\(name)さん！")
    }
    
    private func showAlert(message: String) {
        let alert = UIAlertController(title: "挨拶", message: message, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default))
        present(alert, animated: true)
    }
}`,
      useCases: "iOSアプリ開発、macOSアプリ開発、watchOSアプリ開発、tvOSアプリ開発",
      difficulty: "medium" as const,
    },
    {
      name: "Flutter",
      description: "Googleが開発したUIツールキットで、単一のコードベースから美しいネイティブアプリを構築できます。",
      features: [
        "クロスプラットフォーム（iOS、Android、Web、デスクトップ）",
        "ホットリロード",
        "リッチなウィジェットライブラリ",
        "カスタマイズ可能なUIコンポーネント",
        "高パフォーマンス",
      ],
      codeExample: `import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}`,
      useCases: "クロスプラットフォームモバイルアプリ、プログレッシブウェブアプリ、デスクトップアプリ",
      difficulty: "medium" as const,
    },
    {
      name: "Kotlin",
      description: "JetBrainsが開発したJVM上で動作するプログラミング言語で、Androidアプリ開発の公式言語です。",
      features: ["Javaとの100%互換性", "Null安全性", "拡張関数", "コルーチン", "関数型プログラミングのサポート"],
      codeExample: `import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    
    private lateinit var nameEditText: EditText
    private lateinit var greetButton: Button
    private lateinit var resultTextView: TextView
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        // UIコンポーネントの初期化
        nameEditText = findViewById(R.id.nameEditText)
        greetButton = findViewById(R.id.greetButton)
        resultTextView = findViewById(R.id.resultTextView)
        
        // ボタンクリックリスナーの設定
        greetButton.setOnClickListener {
            val name = nameEditText.text.toString()
            if (name.isEmpty()) {
                Toast.makeText(this, "名前を入力してください", Toast.LENGTH_SHORT).show()
            } else {
                // 拡張関数を使用
                resultTextView.text = name.greet()
            }
        }
    }
    
    // 拡張関数の例
    private fun String.greet(): String {
        return "こんにちは、$this さん！"
    }
    
    // コルーチンの例
    private suspend fun fetchUserData() {
        // ネットワークリクエストなどの非同期処理
    }
}`,
      useCases: "Androidアプリ開発、サーバーサイド開発、マルチプラットフォームアプリ開発",
      difficulty: "medium" as const,
    },
  ]

  return (
    <div className={styles.grid}>
      {mobileLanguages.map((lang, index) => (
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

