'use server';

import { createAdminSession } from '@/lib/auth';
import { db } from '@/src/db';
import { loginAttempts } from '@/src/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';

function getIpHash(ip: string) {
  return bcrypt.hashSync(ip || 'unknown', 10);
}

// In production, we'd use a better way to get IP, but for now x-forwarded-for works.
function getClientIp(headersList: Headers) {
  const forwardedFor = headersList.get('x-forwarded-for');
  return forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';
}

export async function loginAction(formData: FormData) {
  const email = formData.get('email')?.toString().toLowerCase();
  const password = formData.get('password')?.toString();
  
  if (!email || !password) {
    return { success: false, message: 'Vui lòng nhập đầy đủ email và mật khẩu.' };
  }

  // Rate limiting logic
  const headersList = await headers();
  const ip = getClientIp(headersList);
  // We use a simple hash of IP to avoid storing raw IPs
  const ipHashString = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip)).then(b => Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, '0')).join(''));
  
  let attemptRecord = await db.query.loginAttempts.findFirst({
    where: eq(loginAttempts.ipHash, ipHashString)
  });

  if (attemptRecord) {
    if (attemptRecord.lockUntil && attemptRecord.lockUntil > new Date()) {
      return { success: false, message: 'Tài khoản đang bị tạm khóa do nhập sai quá nhiều lần. Vui lòng thử lại sau.' };
    }
  }

  // Validate credentials
  const validEmail = process.env.ADMIN_EMAIL;
  const validPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!validEmail || !validPasswordHash) {
    return { success: false, message: 'Lỗi cấu hình hệ thống.' };
  }

  const isEmailValid = email === validEmail.toLowerCase();
  const isPasswordValid = isEmailValid ? bcrypt.compareSync(password, validPasswordHash) : false;

  if (!isEmailValid || !isPasswordValid) {
    if (attemptRecord) {
      const newAttempts = (attemptRecord.attempts || 0) + 1;
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

    return { success: false, message: 'Tài khoản hoặc mật khẩu không chính xác.' };
  }

  // Reset attempts on success
  if (attemptRecord) {
    await db.update(loginAttempts).set({
      attempts: 0,
      lockUntil: null
    }).where(eq(loginAttempts.ipHash, ipHashString));
  }

  await createAdminSession();
  
  return { success: true, message: 'Đăng nhập thành công!' };
}

export async function logoutAction() {
  const { clearAdminSession } = await import('@/lib/auth');
  await clearAdminSession();
}
