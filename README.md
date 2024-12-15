# Relumo（リルモ）

Relumo（リルモ）は、招待制の掲示板アプリケーションです。このアプリは、ユーザーが信頼できる友人や知人を招待することで、安心して利用できる環境を提供します。招待制のため構造的にクローズドな場でありながら、その中で自由かつ開放的に楽しんでほしいという思いを込めて、「Relieve（解放）」＋「Lumo（光）」を組み合わせてRelumoと名付けました。

## 開発背景

このアプリケーションの開発は、知人から「不特定多数ではなく、限られたメンバー同士で書き込みや閲覧ができる掲示板が欲しい」という要望を受けたことがきっかけでした。日常での出来事や、何気ない雑談を気軽に共有できる場として、SNSとは異なる楽しみ方ができる可能性を感じ、開発に至りました。

## 開発した機能など
本アプリの主な実装機能は以下になります。

- ログイン機能
- 招待機能
- スレッド作成
- 投稿
- 投稿時のメンション機能
- メンション先の投稿内容表示
- リアクション機能

## 使用技術
本アプリではApp Routerを使用し、Server Functionsを積極的に活用しています。Server ComponentとClient Componentの適切な使い分けを行い、待機時間中のローディング表示、コンポーネントの楽観的更新、Suspenseの設定などに重点を置いて開発を進めました。フレームワークやライブラリは以下です。

- Next.js v15
- TypeScript
- shadcn/ui
- Tailwind CSS
- Prisma
- Auth.js
- Zod
- Conform
- Vitest
- Neon Serverless Postgres
- GitHub Actions

以下はNext.jsのREADME
---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
