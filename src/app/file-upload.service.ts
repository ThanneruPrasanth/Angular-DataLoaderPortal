import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { AuthService } from '../app/auth-service';
import { Options } from 'selenium-webdriver';
import { $ } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  // API url
  //baseApiUrl = "http://localhost:8089/patient/savefile"

  token: any = '';
  constructor(private http:HttpClient, private authService: AuthService) {
      this.authService.authValue.subscribe(res => {
        this.token = res.token;
        if(this.token === '' || this.token == null || this.token == ''){
            this.token = localStorage.getItem('token');
        }
      });
   }
  
  // Returns an observable
  // upload(file:):Observable<any> {
  
  //     // Create form data
  //     const formData = new FormData(); 
        
  //     // Store form name as "file" with file data
  //     formData.append("file", file, file.name);
        
  //     // Make http post request over api
  //     // with formData as req
  //     return this.http.post(this.baseApiUrl, formData)
  // }

  fileUploadToBackEnd(file: any){

    console.log("token value");
    console.log(this.token);

    let urlPath = `http://localhost:8089/patient/savefile`;
    const formData = new FormData();
    formData.append("file", file);    
    
    return new Observable((observer : Observer<any>) =>{
      
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange =()=> {
        if(xhr.readyState == 4){
          if(xhr.status == 202) observer.next(xhr); else observer.error(xhr);   
        }
      }
      xhr.open("POST", urlPath, true);
      xhr.setRequestHeader('Authorization', 'Bearer ' + this.token);
      xhr.send(formData);
    });

    // let methodHeaders = new HttpHeaders({'Content-Type': 'application/json'});      
    // methodHeaders.append("Authorization", "Bearer " + this.token);
    

    // return this.http.post<any>(urlPath, formData, {
    //   headers: methodHeaders
    // });
  }

  getPatientDetailsBasedOnName(searchText: string){

     let methodHeaders = new HttpHeaders({'Content-Type': 'application/json'});      
    methodHeaders.append("Authorization", "Bearer " + this.token);
      let urlPath = `http://localhost:8089/patient/getDetails/searchText/${searchText}`;
      return this.http.get(urlPath, {headers: methodHeaders});
  }


  updatePatientDetails(updateData: any){
    let methodHeaders = new HttpHeaders({'Content-Type': 'application/json'});      
      methodHeaders.append("Authorization", "Bearer " + this.token);
      let urlPath = `http://localhost:8089/patient/updateDetails`;
      return this.http.post(urlPath, updateData, {headers: methodHeaders});
  }


}
