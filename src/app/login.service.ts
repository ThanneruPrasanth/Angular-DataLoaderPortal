import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginUserData } from './models';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  // private _loginUserData = new BehaviorSubject<LoginUserData>;
  // loginUserData = this._loginUserData.asObservable();

  public doLogin(login:any){
    return this.http.post("http://localhost:8089/login",login,{responseType:'text' as 'json'});

  }
  public loginSubmit(username:any, password:any){
    let urlpath=`http://localhost:8089/user/login`;
      let loginobj={
        username:username,
        password:password,
        role:"user"
      }
    return this.http.post<LoginUserData>(urlpath,loginobj);
  }
}
