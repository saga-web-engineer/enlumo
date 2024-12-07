import { expect, vi, describe, beforeEach, test } from "vitest"
import prisma from "../lib/db"
import { execSync } from "child_process";
import { updateUser } from "./actions";
import { Prisma } from "@prisma/client";

const USER_ID = 'newUserId';
const USER_NAME = 'user name'
const USER_BIO = 'user bio'

vi.mock('../lib/auth', () => ({
  // ログインしている
  auth: () => ({ user: { id: USER_ID } })
}))
vi.mock('next/cache')

/**
 * ユーザーを作成するPromise
 */
class UserFactory {
  static create(attr: Partial<Prisma.UserCreateInput> = {}) {
    return prisma.user.create({
      data: {
        name: USER_NAME,
        email: `${Math.floor(Math.random() * 100000)}@example.com`, // ランダムなemailアドレスを指定
        ...attr
      }
    })
  }
}

describe('設定', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    // テスト用DBをリセットする
    execSync('npm run migrate:test');
  })
  describe("正常系", () => {
    beforeEach(async () => {
      await UserFactory.create({ id: USER_ID, name: USER_NAME, bio: USER_BIO })
    })
    test('名前とbio両方入力すると登録される', async () => {
      const NEW_NAME = 'new name';
      const NEW_BIO = 'new bio';

      const formData = new FormData()
      formData.append('name', NEW_NAME)
      formData.append('bio', NEW_BIO)

      await updateUser(null, formData)

      const user = await prisma.user.findUnique({
        where: { id: USER_ID },
        select: { name: true, bio: true },
      })

      expect(user).toEqual({ name: NEW_NAME, bio: NEW_BIO })
    })
    test('名前のみ入力すると登録される', async () => {
      const NEW_NAME = 'new name';
      const NEW_BIO = '';

      const formData = new FormData()
      formData.append('name', NEW_NAME)
      formData.append('bio', NEW_BIO)

      await updateUser(null, formData)

      const user = await prisma.user.findUnique({
        where: { id: USER_ID },
        select: { name: true, bio: true },
      })

      expect(user).toEqual({ name: NEW_NAME, bio: USER_BIO })
    })
  })
  describe("異常系", () => {
    beforeEach(async () => {
      await UserFactory.create({ id: USER_ID, name: USER_NAME, bio: USER_BIO })
    })
    test('名前が長いときは更新されない', async () => {
      const NEW_NAME = 'a'.repeat(31); //31文字

      const formData = new FormData()
      formData.append('name', NEW_NAME)

      await updateUser(null, formData)

      const user = await prisma.user.findUnique({
        where: { id: USER_ID },
        select: { name: true, bio: true },
      })

      expect(user?.name).toBe(USER_NAME)
      expect(user?.bio).toBe(USER_BIO)
    })
    test('bioが長いときは更新されない', async () => {
      const NEW_NAME = 'new name';
      const NEW_BIO = 'a'.repeat(201); //201文字

      const formData = new FormData()
      formData.append('name', NEW_NAME)
      formData.append('bio', NEW_BIO)

      await updateUser(null, formData)

      const user = await prisma.user.findUnique({
        where: { id: USER_ID },
        select: { name: true, bio: true },
      })

      expect(user?.name).toBe(USER_NAME)
      expect(user?.bio).toBe(USER_BIO)
    })
  })
})