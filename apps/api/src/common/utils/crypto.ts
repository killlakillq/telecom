import * as crypto from 'node:crypto';

const secretKey = Buffer.from('0123456789abcdef0123456789abcdef', 'utf8');
const iv = Buffer.from('abcdef9876543210', 'utf8');

export class Crypto {
  public static encrypt(text: string) {
    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  public static decrypt(encryptedText: string) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
