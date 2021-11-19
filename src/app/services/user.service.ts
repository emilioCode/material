import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList: User[] = [
    {userName: 'emendez', firstName: 'Manuel', lastName: 'Méndez', gender: 'Man'},
    {userName: 'dperez', firstName: 'Diana', lastName: 'Pérez', gender: 'Woman'},
    {userName: 'eleonardo', firstName: 'Edwin', lastName: 'Leonardo', gender: 'Man'},
    {userName: 'dmendez', firstName: 'Dominga', lastName: 'Méndez', gender: 'Woman'},
    {userName: 'rmendez', firstName: 'Rosa', lastName: 'Méndez', gender: 'Woman'},
    {userName: 'rleonardo', firstName: 'Rosanna', lastName: 'Leonardo', gender: 'Woman'},
    {userName: 'emleonardo', firstName: 'Emili', lastName: 'Leonardo', gender: 'Woman'},
    {userName: 'fmendez', firstName: 'Flor', lastName: 'Méndez', gender: 'Woman'},
    {userName: 'amendez', firstName: 'Ana', lastName: 'Méndez', gender: 'Woman'},
    {userName: 'acolummna', firstName: 'Arnis', lastName: 'Columna', gender: 'Man'},
    {userName: 'fcolummna', firstName: 'Francisco', lastName: 'Columna', gender: 'Man'}
  ];
  
  constructor() { }

  getUsers(){
    return this.userList.slice();
  }
  
  removeUser(index: number){
    this.userList.splice(index, 1);
  }

  addUser(user: User){
    this.userList.unshift(user);
  }

  updateUser(user: User){
    const index = this.userList.findIndex(x => x.userName == user.userName);
    this.userList[index] = user;
  }
}
