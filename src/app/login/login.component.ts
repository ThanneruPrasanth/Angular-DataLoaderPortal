import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Login } from '../login';
import { LoginService } from '../login.service';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';
import { LoginUserData } from '../models';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide: boolean = false;
  login: Login=new Login("","");
  message:any;

  constructor(private fb: FormBuilder, private service:LoginService,
    private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }
  
  public Login(){
   console.log(this.loginForm);
   this.service.loginSubmit(this.loginForm.value.username,this.loginForm.value.password)
   .subscribe(res =>{
     if(res){           
       alert(res.message);
       localStorage.setItem('username', res.username);
       localStorage.setItem('token', res.token);
       this.loginForm.reset();
       this.router.navigateByUrl('/file-upload');
     }
   })
  }


  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })


  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    console.log(this.loginForm.value);
  }

}
