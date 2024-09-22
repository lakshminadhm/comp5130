const crypto = require('crypto');

function encrypt(text, key) {
    const iv = crypto.randomBytes(16); // Generate a random initialization vector
    key = Buffer.from(key, 'hex')
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted; // Return IV and encrypted text
}


function decrypt(text, key) {
    key = Buffer.from(key, 'hex')
    const [iv, encryptedText] = text.split(':');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = { encrypt, decrypt }; // Export the functions
