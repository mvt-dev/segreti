import CryptoJS from 'crypto-js'

export const hashPassword = (password: string) =>
  CryptoJS.SHA3(password).toString()

export const encrypt = (data: string, password: string) =>
  CryptoJS.AES.encrypt(data, password).toString()

export const decrypt = (encrypted: string, password: string) =>
  CryptoJS.AES.decrypt(encrypted, password).toString(CryptoJS.enc.Utf8)
