# Storybook ガイド

このプロジェクトではStorybookを使用してコンポーネントを開発・テストしています。

## Storybookの起動

```bash
npm run storybook
```

ブラウザで `http://localhost:6006` を開くと、Storybookが表示されます。

## Storybookのビルド

```bash
npm run build-storybook
```

静的なStorybookサイトが `storybook-static` ディレクトリに生成されます。

## ストーリーの作成方法

ストーリーは `stories/` ディレクトリに配置します。

### 基本的なストーリーの例

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { MyComponent } from '@/components/my-component'

const meta = {
  title: 'Components/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof MyComponent>

export default meta
type Story = StoryObj<typeof meta>

export const デフォルト: Story = {
  args: {
    // propsを設定
  },
}
```

## 既存のストーリー

- `TodoItem.stories.tsx` - 個別のTODOアイテムコンポーネント
- `TodoInput.stories.tsx` - タスク入力コンポーネント
- `TodoSection.stories.tsx` - タスクセクションコンポーネント
- `TodoList.stories.tsx` - TODOリスト全体のコンポーネント

各ストーリーには複数のバリエーション（アクティブ、完了、空など）が含まれています。
