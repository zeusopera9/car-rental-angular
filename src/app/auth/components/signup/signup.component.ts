import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  isSpinning:boolean=false;
  signUpForm!: FormGroup;

  constructor(private fb:FormBuilder) { }

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
  }

}
