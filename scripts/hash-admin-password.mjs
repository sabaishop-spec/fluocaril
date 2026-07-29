import bcrypt from 'bcryptjs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Nhập mật khẩu cần hash: ', (password) => {
  const hash = bcrypt.hashSync(password, 10);
  console.log('\nThêm dòng sau vào biến môi trường trên Vercel:');
  console.log(`ADMIN_PASSWORD_HASH="${hash}"\n`);
  rl.close();
});
