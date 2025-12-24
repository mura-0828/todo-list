# CI/CD設定ガイド

このプロジェクトのCI/CDパイプラインは、GitHub Actionsを使用して自動化されています。

## 🚀 自動化されている処理

### 1. テスト実行 (test.yml)
プルリクエストとpush時に自動実行されます：
- 型チェック (TypeScript)
- ESLintによるコード品質チェック
- Jestによるユニットテストと統合テスト
- テストカバレッジの測定

### 2. Storybookデプロイ (storybook.yml)
- **mainブランチへのpush時**: GitHub Pagesに自動デプロイ
- **プルリクエスト作成時**: ビルド確認とプレビューコメント

### 3. コード品質チェック (lint.yml)
プルリクエスト時に実行されます：
- ESLintによる静的解析
- Prettierによるコードフォーマットチェック

## 🛡️ ブランチ保護設定

テストが通らないとマージできないようにするため、GitHubリポジトリで以下の設定を行ってください：

### 設定手順

1. GitHubリポジトリの **Settings** に移動
2. 左サイドバーから **Branches** を選択
3. **Branch protection rules** セクションで **Add rule** をクリック
4. 以下の設定を行う：

#### Branch name pattern
```
main
```

#### Protect matching branches
- ✅ **Require a pull request before merging**
  - ✅ Require approvals (推奨: 1人以上)
  - ✅ Dismiss stale pull request approvals when new commits are pushed
  
- ✅ **Require status checks to pass before merging**
  - ✅ Require branches to be up to date before merging
  - 以下のステータスチェックを必須に設定：
    - `ユニットテストと統合テスト` (test.yml)
    - `ESLintとPrettier` (lint.yml)
    - `Storybookをビルドしてデプロイ` (storybook.yml)

- ✅ **Require conversation resolution before merging**
  - レビューコメントの解決を必須にする

#### Bypass list（バイパスリスト）
- **空のままにする**: 誰もルールをバイパスできません（管理者も含む）
- 管理者のみバイパスを許可する場合は、ここに管理者を追加します

5. **Create** ボタンをクリックして保存

これで、mainブランチにマージされるたびにStorybookが自動的に公開されます。

公開URL: `https://[your-username].github.io/[repository-name]/`

## 🔧 ローカルでのコマンド

```bash
# テスト実行
pnpm test

# テスト実行（watch モード）
pnpm test:watch

# CI環境と同じテスト実行
pnpm test:ci

# 型チェック
pnpm type-check

# Lintチェック
pnpm lint

# フォーマットチェック
pnpm format:check

# フォーマット自動修正
pnpm format:write

# Storybook起動
pnpm storybook

# Storybookビルド
pnpm build-storybook
```

## 📊 GitHub Pagesの有効化

Storybookを公開するため、GitHub Pagesを有効化してください：

### 設定手順

1. GitHubリポジトリの **Settings** に移動
2. 左サイドバーから **Pages** を選択
3. **Source** を **GitHub Actions** に設定
4. 保存

これで、mainブランチにマージされるたびにStorybookが自動的に公開されます。

公開URL: `https://[your-username].github.io/[repository-name]/`

## 🎯 ワークフローのトリガー

| ワークフロー | トリガー |
|------------|---------|
| test.yml | PR作成時、main/developへのpush |
| storybook.yml | mainへのpush、mainへのPR作成時 |
| lint.yml | main/developへのPR作成時 |
