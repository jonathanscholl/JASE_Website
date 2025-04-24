import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

export const commonPasswords = JSON.parse(readFileSync(path.join(process.cwd(), 'public/data/commonpasswords.json'), 'utf-8'));




function isValidWeakPassword(password) {
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  return hasMinLength && hasUppercase && hasNumber && hasSymbol;
}



const weakValidPasswords = commonPasswords.filter(isValidWeakPassword);


const top10000WeakPasswords = weakValidPasswords.slice(0, 10000);


writeFileSync(
  path.join(process.cwd(), 'public/data/filtered_weak_passwords.json'),
  JSON.stringify(top10000WeakPasswords, null, 2), // pretty print with 2 spaces
  'utf-8'
);