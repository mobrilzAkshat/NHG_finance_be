require("dotenv").config()
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const encryptedData = async (password) => {
    try {
        const secretKey = process.env.SECRETKEY;
        const fixedSalt = process.env.FIXEDSALT; 
        const key = crypto.scryptSync(secretKey, fixedSalt, 32); // Derive a key from the secret key and fixed salt
        const cipher = crypto.createCipheriv('aes-256-ctr', key, Buffer.alloc(16, 0)); // Create a cipher
        let encryptedPassword = cipher.update(password, 'utf8', 'hex'); // Encrypt the password
        encryptedPassword += cipher.final('hex');
        return encryptedPassword;
    } catch (e) {
        return e;
    }   
};

const decryptedData = async (encryptedPassword) => {
    try {
        const secretKey = process.env.SECRETKEY;
        const fixedSalt = process.env.FIXEDSALT; // Use the same fixed salt as used for encryption
        const key = crypto.scryptSync(secretKey, fixedSalt, 32); // Derive the key from the secret key and fixed salt
        const decipher = crypto.createDecipheriv('aes-256-ctr', key, Buffer.alloc(16, 0)); // Create a decipher
        let decryptedPassword = decipher.update(encryptedPassword, 'hex', 'utf8'); // Decrypt the password
        decryptedPassword += decipher.final('utf8');
        return decryptedPassword;
    } catch (e) {
        console.error('Error during decryption:', e);
        throw e; // Rethrow the error to be handled by the caller
    }
};
    const generateJwtToken = (payload) => {
        // Set the expiration time for the token
        const expiresIn = "1d"; // Example: Token expires in 1 day
    
        // Sign the JWT token
        const token = jwt.sign(payload, "##$$Nhgfinance$$##", { expiresIn });
    
        return token;
    };


  function generateOtp(){
    const min = 1000; // Minimum 4-digit number
    const max = 9999; // Maximum 4-digit number

    // Generate a random number between min and max (inclusive)
    const otp = Math.floor(Math.random() * (max - min + 1)) + min;

    return otp.toString(); // Convert the number to a string
  }
    function decodeToken(token) {
        // Verify the token and extract payload
        const decoded = jwt.verify(token, "##$$Nhgfinance$$##"); // Replace 'your-secret-key' with your actual secret key

        // Extract user ID from payload
        const userId = decoded.userId; // Assuming 'id' is the key containing the user ID in the payload
        return userId;
    }

module.exports = {
    encryptedData,
    decryptedData,
    generateJwtToken,
    decodeToken,
    generateOtp
}