import CryptoJS from 'crypto-js';

const KEY = CryptoJS.enc.Hex.parse(process.env.NEXT_PUBLIC_ENC_KEY);
const IV = CryptoJS.enc.Hex.parse(process.env.NEXT_PUBLIC_ENC_IV);

/**
 * Encrypts a text using AES-256-CBC and returns it in HEX format.
 * @param {string} text - The text to encrypt.
 * @returns {string} - Encrypted text in HEX format.
 */
function encryptAES(text) {
  const encrypted = CryptoJS.AES.encrypt(text, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  // Convert to HEX and return
  return encrypted.ciphertext.toString(CryptoJS.enc.Hex); // HEX output
}

/**
 * Decrypts an AES-256-CBC encrypted text.
 * @param {string} encryptedText - The encrypted text in Base64 format.
 * @returns {string} - The decrypted text.
 */
function decryptAES(encryptedText) {
  try {
    // Convert HEX string back to a WordArray
    const encryptedHexStr = CryptoJS.enc.Hex.parse(encryptedText);

    // Convert to CipherParams object
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: encryptedHexStr,
    });

    // Decrypt using the same key and IV
    const decrypted = CryptoJS.AES.decrypt(cipherParams, KEY, {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8); // Convert from WordArray to UTF-8 string
  } catch (error) {
    console.error('[decryptAES] Decryption failed:', error);
    return null;
  }
}
export { encryptAES, decryptAES };