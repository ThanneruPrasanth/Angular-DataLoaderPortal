import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { authToken } from '../app/login';


@Injectable({
    providedIn: 'root'
})

export class AuthService{

    private _authValue = new BehaviorSubject<authToken>({token : ''});
    authValue = this._authValue.asObservable();

    
    constructor(private http:HttpClient) { }

    assignTokenValue(tokenValue: string){
        this._authValue.next({token : tokenValue})
    }

    geToken(){
        let obj = {
            "username":"prasanth@gmail.com",
            "password":"prasanth123"        
        }

        let urlPath = `http://localhost:8089/authenticate`;
        return this.http.post<any>(urlPath, obj);

    }


}