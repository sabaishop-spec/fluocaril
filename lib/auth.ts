import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

export async function createAdminSession() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return;

  const key = new TextEncoder().encode(secret);
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
    maxAge: 8 * 60 * 60, // 8 hours
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  if (!token) return null;

  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return null;

  try {
    const key = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    });
    return payload as { role: string; exp?: number };
  } catch (error) {
    return null;
  }
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session || session.role !== 'admin') {
    throw new Error('Unauthorized');
  }
}
