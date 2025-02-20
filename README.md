# 100日プログラミングチャレンジ 7日目

このプロジェクトは、100日間アプリ開発を行います。
Python（バックエンド）とTypeScript（フロントエンド）を使用して、日々の小さな機能から大きな統合アプリケーションを作り上げていきます。

## プロジェクト構造

```
100days-project/
├── backend/             # 統合用バックエンド
├── frontend/            # 統合用フロントエンド
├── daily-projects/     # 日次の個別プロジェクト
│   ├── phase1/         # Day 1-20: 基礎学習
│   ├── phase2/         # Day 21-50: 中級機能実装
│   ├── phase3/         # Day 51-80: 応用実装
│   └── phase4/         # Day 81-100: 統合フェーズ
└── docs/               # ドキュメント類
```

## 技術スタック

- バックエンド
  - Python 3.x
  - Flask
  - FastAPI（予定）

- フロントエンド
  - TypeScript
  - HTML5
  - CSS3
  - React（予定）

## 開発環境のセットアップ

1. Pythonの依存関係をインストール
```bash
cd backend
pip install -r requirements.txt
```

2. TypeScriptの環境設定
```bash
cd frontend
npm install -g typescript
```

## 実行方法

### Day 1のプロジェクトを実行する場合：

1. バックエンドの起動
```bash
cd daily-projects/phase1/day-01/backend
python app.py
```

2. フロントエンドの準備
```bash
cd daily-projects/phase1/day-01/frontend
tsc script.ts
python -m http.server 8000
```

3. ブラウザでアクセス
- http://localhost:8000 にアクセス

## 進捗状況

### Phase 1: 基礎学習（Day 1-20）
- [x] Day 1: Hello World Webページ
  - Flask APIとTypeScriptクライアントの基本実装
  - CORSの設定
  - シンプルなUI設計
- [x] Day 2: インタラクティブカウンター
  - TypeScriptでカウンター機能の実装
  - Flask APIでカウント値の管理
  - インクリメント/デクリメントのエンドポイント実装
  - CORSの設定とエラーハンドリング
- [x] Day 3: シンプル計算機アプリ
  - TypeScriptで電卓UIを実装
  - 四則演算の実装（加算、減算、乗算、除算）
  - Flask APIで計算ロジックを実装
  - エラーハンドリング（0除算など）の実装
- [x] Day 4: ToDoリスト（ローカル版）
  - TypeScriptでToDoリストUIを実装
  - LocalStorageを使用したデータ永続化
  - タスクの追加、完了、削除機能
  - 完了済みタスクの一括削除機能
  - レスポンシブデザインとアニメーション
- [x] Day 5: チャットUIモックアップ
  - TypeScriptでチャットUIを実装
  - メッセージの送受信シミュレーション
  - 自動応答機能の実装
  - スクロール可能なチャット履歴
  - 新規メッセージ通知とアニメーション
- [x] Day 6: Python APIでのメッセージ送受信
  - FlaskでチャットAPIの実装
  - メッセージの送受信エンドポイント
  - 自動応答システムの実装
  - メッセージ履歴の管理機能
  - エラーハンドリングの実装
- [x] Day 7: API連携チャットアプリ
  - フロントエンドとバックエンドの連携
  - リアルタイムメッセージ更新機能
  - エラーハンドリングとステータス表示
  - メッセージの永続化と履歴表示
  - 全メッセージ削除機能の実装
- [ ] Day 8: 実装予定
...

## ライセンス
MIT
