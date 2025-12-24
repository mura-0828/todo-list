# Storybook設定

このプロジェクトではStorybookを使用してコンポーネントの開発とドキュメント化を行っています。

## 起動方法

```bash
npm run storybook
```

ブラウザで http://localhost:6006 が自動的に開きます。

## ビルド

```bash
npm run build-storybook
```

## Next.js 16との互換性

このプロジェクトはNext.js 16を使用しているため、Storybook設定に以下の対応を行っています：

- `next/config`モジュールのfallback設定
- Next.jsルーターのモック化
- App Routerのサポート

## トラブルシューティング

### エラーが発生する場合

1. node_modulesを削除して再インストール：
```bash
rm -rf node_modules package-lock.json
npm install
```

2. Storybookのキャッシュをクリア：
```bash
npm run storybook -- --no-manager-cache
