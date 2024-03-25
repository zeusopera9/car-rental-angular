import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from "ng-zorro-antd/message";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  isSpinning:boolean=false;
  signUpForm!: FormGroup;

  constructor(private fb:FormBuilder,
    private authService:AuthService,
    private message: NzMessageService,
    private router: Router) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidate]],
    })
  }

  confirmationValidate = (control: FormControl): { [s: string]: boolean} => {
    if(!control.value) {
      return { required: true};
    } else if(control.value !== this.signUpForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return { };
  }

  register() {
    console.log(this.signUpForm.value);
    this.authService.register(this.signUpForm.value).subscribe((res) => {
      console.log(res);
      if(res.id != null) {
        this.message.success("Signup Successful", { nzDuration: 5000});
        this.router.navigateByUrl("/login")
      } else {
        this.message.error("Something Went Wrong", { nzDuration: 5000});
      }
    })
  }

}
