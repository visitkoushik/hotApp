import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})



@Injectable()
export class CryptoService {
  encryptAES(data: string, secret: string): string {

    const encrypted = CryptoJS.AES.encrypt(data, secret);
    return encrypted;
  }

  decryptAES(encrypted: string, secret: string): string {

    let decrypted = CryptoJS.AES.decrypt(encrypted, secret);
    decrypted = this.hexConvert(decrypted);
    return decrypted;
  }

  hexConvert(hex: string | number): string {
    const hexStr: string = hex.toString();
    let str = '';
    for (let i = 0; i < hexStr.length; i += 2)
      str += String.fromCharCode(parseInt(hexStr.substr(i, 2), 16));
    return str;
  }
}
