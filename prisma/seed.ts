import prisma from "@/app/lib/db";


/** 一人当たりのスレッド数 */
const now = Date.now()
const THREADS_PER_USER = 50

async function main() {
  const ange = await prisma.user.upsert({
    where: { email: 'ange@example.com' },
    update: {},
    create: {
      email: 'ange@example.com',
      name: 'アンジュ・カトリーナ',
      Threads: {
        createMany: {
          data: Array.from({ length: THREADS_PER_USER }, (_, i) => {
            const num = i + 1
            return {
              title: `スレッド${num}`,
              bio: `スレッド${num}の本文`,
              createdAt: new Date(now + num)
            }
          })
        }
      }
    }
  })
  const lize = await prisma.user.upsert({
    where: { email: 'lize@example.com' },
    update: {},
    create: {
      email: 'lize@example.com',
      name: 'リゼ・ヘルエスタ',
      Threads: {
        createMany: {
          data: Array.from({ length: THREADS_PER_USER }, (_, i) => {
            const num = THREADS_PER_USER + i + 1
            return {
              title: `スレッド${num}`,
              bio: `スレッド${num}の本文`,
              createdAt: new Date(now + num)
            }
          })
        }
      }
    }
  })
  const inui = await prisma.user.upsert({
    where: { email: 'inui@example.com' },
    update: {},
    create: {
      email: 'inui@example.com',
      name: '戌亥とこ',
      Threads: {
        createMany: {
          data: Array.from({ length: THREADS_PER_USER }, (_, i) => {
            const num = THREADS_PER_USER * 2 + i + 1
            return {
              title: `スレッド${num}`,
              bio: `スレッド${num}の本文`,
              createdAt: new Date(now + num)
            }
          })
        }
      }
    }
  })


  // 各ユーザーが持つスレッドを取得
  const angeThreads = await prisma.thread.findMany({
    where: { userId: ange.id },
  });

  const lizeThreads = await prisma.thread.findMany({
    where: { userId: lize.id },
  });

  const inuiThreads = await prisma.thread.findMany({
    where: { userId: inui.id },
  });

  const allThreads = [...angeThreads, ...lizeThreads, ...inuiThreads];

  // 3 人が交互に投稿を行う
  const POSTS_PER_THREAD = 100;
  let postIndex = 0;

  for (const thread of allThreads) {
    const posts = Array.from({ length: POSTS_PER_THREAD }, (_, i) => {
      // 投稿者を 3 人交互に切り替える
      const author = [ange, lize, inui][postIndex % 3];
      postIndex++;

      return {
        content: `${author.name}だよ〜`,
        createdAt: new Date(now + postIndex),
        userId: author.id,
      };
    });

    // 投稿をスレッドに紐づけて作成
    await prisma.post.createMany({
      data: posts.map((post) => ({
        ...post,
        threadId: thread.id, // スレッドとのリレーションを指定
      })),
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });