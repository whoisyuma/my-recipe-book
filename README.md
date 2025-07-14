# My Recipe Book
> You can find the English version of this README below.
> この README の英語版は下の方にあります。

## プロジェクト概要

**Next.js (App Router)とSupabase**で構築した、マイレシピ帳アプリです。
ユーザー登録・ログイン機能付きで、自分だけのレシピを作成・編集・削除・一覧表示・詳細表示できます。

## 使用技術

- フレームワーク：Next.js(App Router)
- 認証：Supabase Auth
- データベース：Supabase
- 言語：Typescript
- スタイル：Tailwind CSS

## 主な機能

- ユーザー認証（サインアップ/ログイン）
- 自分専用のレシピ一覧ページ
- レシピの詳細ページ
- レシピの作成・編集・削除機能
- タイトル + UUID で生成される slug による詳細ページ表示
- SupabaseのRLSで、他のユーザーのレシピにはアクセス不可
- モバイル対応（レスポンシブデザイン）
- 材料・作り方は1つずつ追加可能な入力方式

## 学んだこと・工夫したこと

- SupabaseのRLSを使って、ユーザーごとのデータ管理を安全に実装できた。
- slugをタイトル名＋IDにすることで、URLの重複を防ぎつつSEOも意識した。
- Tailwind CSSを使って、レスポンシブデザインで実装した。
- 材料や作り方は配列で扱うことで、1つずつ追加できるようにした。
- レシピ一覧ページやレシピの詳細ページはSSRで実装できた。

## 追加したい機能

- 英語対応にする。
- レシピの保存に画像を含める。
- フォルダわけができるようにする。（例えば、中華レシピや日本食など）
- レシピや材料で検索できるようにする。
- レシピの一般公開と非公開に分類できるようにする。
- ログアウト機能をつける

## セットアップ方法

```bash
# 依存パッケージのインストール
npm install

# .env.localを作成
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# 開発サーバー起動
npm run dev

# Tailwind CSSを開発中に使用
npm run tailwind:watch
```

## 公開サイト
こちらからデプロイ後のサイトをご覧いただけます：
[my-recipe-book-smoky.vercel.app](my-recipe-book-smoky.vercel.app)

## デザイン

### 一覧ページ
![一覧ページ](/public/screenshot01.png)

### レシピ追加ページ
![レシピ追加ページ](/public/screenshot02.png)

### レシピ詳細ページ
![一覧ページ](/public/screenshot03.png)

### レシピ編集ページ
![一覧ページ](/public/screenshot04.png)

## 連絡先
以下から気軽にご連絡ください：
- E-mail: [whoisyuma.0913@gmail.com](whoisyuma.0913@gmail.com)

## 備考
このアプリは学習用として作成しました。

# My Recipe Book

## Project Overview

**My Recipe Book** is a personal recipe manager built with **Next.js (App Router)** and **Supabase**.  
It includes user authentication, allowing each user to create, edit, delete, and view their own recipes in a secure environment.

## Technologies Used

- **Framework:** Next.js (App Router)
- **Authentication:** Supabase Auth
- **Database:** Supabase
- **Language:** TypeScript
- **Styling:** Tailwind CSS

## Main Features

- User authentication (Sign up / Login)
- Personalized recipe list for each user
- Recipe detail pages
- Create, edit, and delete your own recipes
- Slug-based detail pages generated from title + UUID
- Supabase RLS (Row-Level Security) prevents unauthorized access to others' data
- Responsive design for mobile and desktop
- Add ingredients and steps one-by-one using dynamic inputs

## Highlights / Learnings

- Implemented Supabase RLS to ensure secure, per-user data handling.
- Designed slugs using recipe title + UUID to avoid duplication and improve readability.
- Used Tailwind CSS for responsive UI design.
- Stored ingredients and steps as arrays to enable flexible inputs.
- Leveraged server components for faster SSR rendering of recipe lists and details.

## Planned Features

- Add multi-language support (starting with English).
- Allow users to upload images with their recipes.
- Enable categorization (e.g., Japanese, Chinese, Desserts).
- Add recipe and ingredient search functionality.
- Implement public/private visibility for recipes.
- Add logout functionality.

## Setup Instructions

```bash
# Install dependencies
npm install

# Create .env.local file and add the following
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Start the development server
npm run dev

# Use Tailwind CSS during development
npm run tailwind:watch
```

## Live Site

You can view the deployed site here:  
[my-recipe-book-smoky.vercel.app](my-recipe-book-smoky.vercel.app)

## Design Previews

### Recipe List Page

![Recipe List Page](/public/screenshot01.png)

### Recipe Creation Page

![Recipe Creation Page](/public/screenshot02.png)

### Recipe Detail Page

![Recipe Detail Page](/public/screenshot03.png)

### Recipe Edit Page

![Recipe Edit Page](/public/screenshot04.png)

## Contact

Feel free to reach out:  
- E-mail: [whoisyuma.0913@gmail.com](mailto:whoisyuma.0913@gmail.com)

## Notes

This app was created for learning purposes.
