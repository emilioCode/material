import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private router: Router) { 
    this.form = this.formBuilder.group({
      user: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  signIn(){
    console.warn(this.form)
    const user = this.form.value.user;
    const password = this.form.value.password;

    if(user == "prueba" && password=="123"){
      // redirect to dasboard
      this.fakeLoading();
    }else{
      // show message error
      this.error();
    }

  }

  error(){
    this._snackBar.open('Please check the user and password and try it again','',{
      duration: 5000,
      horizontalPosition:'center',
      verticalPosition:'bottom'
    });
  }

  fakeLoading(){
    this.loading = true;
    setTimeout(()=>{
      //redirect to dashboard
      this.router.navigate(['dashboard']);
    },1500);
    
  }
}
