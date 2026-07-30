'use server';

import { cookies, headers } from 'next/headers';
import { SignJWT } from 'jose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { db } from '@/src/db';
import { loginAttempts } from '@/src/db/schema';
import { eq } from 'drizzle-orm';

function getIpHash(ip: string): string {
  return crypto.createHash('sha256').update(ip).digest('hex');
}

export async function loginAction(prevState: any, formData: FormData) {
  try {
    const rawEmail = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!rawEmail || !password) {
      return { success: false, message: 'Vui lòng nhập email và mật khẩu.' };
    }

    const email = rawEmail.trim().toLowerCase();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    const adminSessionSecret = process.env.ADMIN_SESSION_SECRET;

    if (!adminEmail || !adminPasswordHash || !adminSessionSecret) {
      return { success: false, message: 'Hệ thống đăng nhập chưa được cấu hình đầy đủ.' };
    }

    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const realIp = headersList.get('x-real-ip');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : realIp || 'unknown';
    const ipHashString = getIpHash(ip);

    let attemptRecord = null;
    try {
      const records = await db.select().from(loginAttempts).where(eq(loginAttempts.ipHash, ipHashString)).limit(1);
      attemptRecord = records[0];
    } catch (e) {
      console.error("Database error while checking login attempts.");
      return { success: false, message: 'Hệ thống đăng nhập đang gặp sự cố. Vui lòng thử lại sau.' };
    }

    if (attemptRecord && attemptRecord.lockUntil && new Date() < attemptRecord.lockUntil) {
      return { success: false, message: 'Tài khoản đã bị khóa tạm thời. Vui lòng thử lại sau 15 phút.' };
    }

    let isMatch = false;
    if (email === adminEmail) {
      try {
        isMatch = await bcrypt.compare(password, adminPasswordHash);
      } catch (compareError) {
        console.error("Bcrypt compare error.");
        return { success: false, message: 'Hệ thống đăng nhập đang gặp sự cố. Vui lòng thử lại sau.' };
      }
    }

    if (!isMatch) {
      try {
        if (attemptRecord) {
          const newAttempts = attemptRecord.attempts + 1;
          let lockUntil = null;
          if (newAttempts >= 5) {
            lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
          }
          await db.update(loginAttempts).set({
            attempts: newAttempts,
            lastAttempt: new Date(),
            lockUntil: lockUntil
          }).where(eq(loginAttempts.ipHash, ipHashString));
        } else {
          await db.insert(loginAttempts).values({
            ipHash: ipHashString,
            attempts: 1,
            lastAttempt: new Date()
          });
        }
      } catch (e) {
        console.error("Database error while updating login attempts.");
      }
      return { success: false, message: 'Tài khoản hoặc mật khẩu không chính xác.' };
    }

    try {
      if (attemptRecord) {
        await db.update(loginAttempts).set({
          attempts: 0,
          lockUntil: null
        }).where(eq(loginAttempts.ipHash, ipHashString));
      }
    } catch (e) {
      console.error("Database error while clearing login attempts.");
    }

    const key = new TextEncoder().encode(adminSessionSecret);
    const token = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('8h')
      .sign(key);

    const cookieStore = await cookies();
    cookieStore.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 8 * 60 * 60,
    });

    return { success: true, message: 'Đăng nhập thành công!' };
  } catch (error) {
    console.error("Unexpected error in loginAction.");
    return { success: false, message: 'Hệ thống đăng nhập đang gặp sự cố. Vui lòng thử lại sau.' };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
}
