const crypto = require('crypto');

class EncryptionService {
    constructor() {
        this.algorithm = 'aes-256-cbc';
        this.secretKey = Buffer.from('9c82eae8fb9e9cfb2e4a631f415b3278e624d4c0db13e5f84ea79bdfb82b30fa', 'hex'); // 256-bit key
    }

    // Method to encrypt text
    encrypt(text) {
        const iv = crypto.randomBytes(16); // Generate a new IV for each encryption
        const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        // Combine IV and encrypted data into a single string
        return `${iv.toString('hex')}:${encrypted}`;
    }

    // Method to decrypt text
    decrypt(encryptedString) {
        // Split the IV and the encrypted data
        const [ivHex, encryptedData] = encryptedString.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        
        const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, iv);
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}

module.exports = EncryptionService;

// Example usage
const encryptionService = new EncryptionService();

const data = "1";
const encrypted = encryptionService.encrypt(data);
console.log("Encrypted:", encrypted);

const decrypted = encryptionService.decrypt(encrypted);
console.log("Decrypted:", decrypted);
