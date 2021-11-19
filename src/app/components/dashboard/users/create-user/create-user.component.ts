import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NameValuePair } from 'src/app/interfaces/nameValuePair';
import { User } from 'src/app/interfaces/user';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  sex:NameValuePair[] = [];
  form: FormGroup;
  visibility:string = 'disabled';

  constructor(private formBuilder: FormBuilder, private userService: UserService,
     private router: Router, private _snackBar: MatSnackBar, private commonService: CommonService) {
    this.form = this.formBuilder.group({
      userName: [ '', Validators.required ],
      firstName: [ '', Validators.required ],
      lastName: [ '', Validators.required ],
      gender: [ '', Validators.required ]
    })
   }

  ngOnInit(): void {
    this.commonService.getGenders().subscribe(data => {
      this.sex = data;
    });
  }
  
  handleSubmit(){
    console.log(this.form);
    const user: User = this.form.value;
    this.userService.addUser(user); 

    this.router.navigate(['/dashboard/users']);

    this._snackBar.open('The user was inserted successfully.','',{
      duration: 1500,
      horizontalPosition:'center',
      verticalPosition:'bottom'
    });
  }
}
