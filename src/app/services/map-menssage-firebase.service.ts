import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapMenssageFirebaseService {

  constructor() { }

  static mapError(error: any) {
    const mapCodes = {
      'auth/email-already-in-use': 'Você já está cadastrado no Beer Offer!',
      'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
      'auth/wrong-password': 'A senha é inválida ou o usuário não está cadastrado.',
      'auth/user-not-found': 'Usuário não encontrado!'
    };
    if (mapCodes[error]) {
      return mapCodes[error];
    }
    else {
      return error;
    }

  }
}
