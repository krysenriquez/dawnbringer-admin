import CryptoJS from 'crypto-js'
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY

export const setLocalStorage = (key, value) => {
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), SECRET_KEY).toString()
  return localStorage.setItem(key, encrypted)
}

export const getLocalStorage = (key) => {
  const encrypted = localStorage.getItem(key)
  if (encrypted) {
    const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8)
    return JSON.parse(decrypted)
  }
  return
}

export const removeLocalStorage = (key) => {
  return localStorage.removeItem(key)
}

export const clearLocalStorage = () => {
  return localStorage.clear()
}
