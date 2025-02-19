#!/bin/bash

# プロジェクトのルートディレクトリを作成
mkdir -p 100days-project

# ルートディレクトリに移動
cd 100days-project

# バックエンド構造の作成
mkdir -p backend/{api/{auth,chat,games,social},models,services,utils}

# フロントエンド構造の作成
mkdir -p frontend/{components/{auth,chat,games,social},pages,hooks,utils}

# 日次プロジェクト構造の作成
for phase in {1..4}; do
    mkdir -p daily-projects/phase${phase}
done

# フェーズ1の日次ディレクトリ (Day 1-20)
for day in $(seq -w 1 20); do
    mkdir -p daily-projects/phase1/day-${day}
done

# フェーズ2の日次ディレクトリ (Day 21-50)
for day in $(seq -w 21 50); do
    mkdir -p daily-projects/phase2/day-${day}
done

# フェーズ3の日次ディレクトリ (Day 51-80)
for day in $(seq -w 51 80); do
    mkdir -p daily-projects/phase3/day-${day}
done

# フェーズ4の日次ディレクトリ (Day 81-100)
for day in $(seq -w 81 100); do
    mkdir -p daily-projects/phase4/day-${day}
done

# 共通モジュール構造の作成
mkdir -p shared/{types,constants,utils}

# ドキュメント構造の作成
mkdir -p docs/{api,setup,architecture}

# 権限を実行可能に変更
chmod +x create_project_structure.sh

echo "プロジェクト構造の作成が完了しました！"

# ディレクトリ構造を表示
tree
