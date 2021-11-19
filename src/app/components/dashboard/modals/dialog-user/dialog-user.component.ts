import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NameValuePair } from 'src/app/interfaces/nameValuePair';
import { User } from 'src/app/interfaces/user';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.css']
})
export class DialogUserComponent implements OnInit {
  form:FormGroup;
  sex:NameValuePair[] = [];
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService,
  private formBuilder: FormBuilder, private commonService: CommonService,
  private dialogRef: MatDialogRef<any>) { 
    this.form = this.formBuilder.group({
      userName: [ this.data.user.userName, Validators.required ],
      firstName: [ this.data.user.firstName , Validators.required ],
      lastName: [ this.data.user.lastName , Validators.required ],
      gender: [ this.data.user.gender , Validators.required ]
    });
    this.form.controls.userName.disable();
    if(this.data.action !== 'edit'){
      this.form.controls.firstName.disable();
      this.form.controls.lastName.disable();
      this.form.controls.gender.disable();
    }
  }

  ngOnInit(): void {
    console.log(this.data)

    this.commonService.getGenders().subscribe(data => {
      this.sex = data;
    });
  }

  handleSubmitChange(){
    const user:User = {
      userName: this.form.controls.userName.value,
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      gender: this.form.controls.gender.value,
    }
    switch (this.data.action) {
      
      case "edit":
        this.userService.updateUser(user);
        this.closeDialog();
        break;
      case "delete":
        // For example
        break;
    
      default:
        break;
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }
}


