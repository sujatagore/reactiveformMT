import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomRegex } from './shared/const/validationPattern';
import { EmpIDValidators } from './shared/validators/customValidators';
import { COUNTRIES_META_DATA } from './shared/const/data';
import { ICountry } from './shared/module/data.interface';
import { AsyncEmailVAlidators } from './shared/validators/asycnEmailValidators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'reactiveformMT';

  public signUpform !: FormGroup;

  genderArr : Array<string> = ['male', 'female', 'others'];

  countrisArr : Array<ICountry> = COUNTRIES_META_DATA;

  showPassword : boolean = false;

  showConfirmPassword : boolean = false;

  ngOnInit(): void {
    this.createSignUp();

    this.isAddressSame();

    this.patchAddress();

    this.patchConfirmPassword();

    this.signUpform.get('confirmPassword')
      ?.valueChanges
      .subscribe(res => {
        if (this.sc['password'].value !== res) {
          this.signUpform.get('confirmPassword')?.setErrors({invalid: true})
        } else {
          this.signUpform.get('confirmPassword')?.setErrors(null)
        }
      })
  }

  createSignUp(){
    this.signUpform = new FormGroup({

      userName : new FormControl(null, [Validators.required, Validators.minLength(3), 
            Validators.maxLength(6), Validators.pattern(CustomRegex.username)]),

      mobile : new FormControl(null, [Validators.required, Validators.minLength(10),
          Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),

      email : new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.email)], 
          [AsyncEmailVAlidators.isEmailAvailable]),

      empId : new FormControl(null, [Validators.required, EmpIDValidators.isEmpID]),

      gender : new FormControl(null, [Validators.required]),

      skills : new FormArray([new FormControl(null, [Validators.required])]),

      currentaddress : new FormGroup({
          country : new FormControl(null, [Validators.required]),
          city : new FormControl(null, [Validators.required]),
          state : new FormControl(null, [Validators.required]),
          zipCode : new FormControl(null, [Validators.required,Validators.minLength(6), 
            Validators.maxLength(6), Validators.pattern('^[0-9]*$')])
      }),

      permanentaddress : new FormGroup({
         country : new FormControl(null, [Validators.required]),
         city : new FormControl(null, [Validators.required]),
         state : new FormControl(null, [Validators.required]),
         zipCode : new FormControl(null, [Validators.required,])
      }),

      isAddress : new FormControl({value: false, disabled : true}),

      password : new FormControl(null, [Validators.required, Validators.minLength(8), 
        Validators.maxLength(12), 
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}$')]),

      confirmPassword : new FormControl({value: null, disabled: true})
    })
  }

  onSignUp(){
    if (this.signUpform.valid) {
      console.log(this.signUpform.getRawValue());
      console.log(this.signUpform.value);
    }
  }

  get sc(){
    return this.signUpform.controls
  }

  get sfg(){
    let formGrp = this.signUpform.get('currentaddress') as FormGroup;

    return formGrp.controls
  }

  get getEmail(){
    return this.signUpform.get('email') as FormControl
  }

  get getEmpID(){
    return this.signUpform.get('empId') as FormControl
  }

  get skillArr(){
    return this.signUpform.get('skills') as FormArray
  }

  addSkill(){
    let getSkillControl = new FormControl(null, [Validators.required]);
    this.skillArr.push(getSkillControl)
  }

  onRemove(i : number){
    this.skillArr.removeAt(i)
  }

  isAddressSame(){
    this.signUpform.get('currentaddress') 
      ?.valueChanges
      .subscribe(res => {
        if (this.signUpform.get('currentaddress')?.valid) {
          this.sc['isAddress'].enable()
        } else {
          this.sc['isAddress'].disable();
          this.sc['isAddress'].patchValue(false)
        }
      })
  }

  patchAddress(){
    this.sc['isAddress']
      .valueChanges
      .subscribe(res =>{
          if (res) {
            this.sc['permanentaddress'].patchValue(this.sc['currentaddress'].value);
            this.sc['permanentaddress'].disable()
          } else {
            this.sc['permanentaddress'].reset()
            this.sc['permanentaddress'].enable()
          }
      })
  }

  patchConfirmPassword(){
      this.signUpform.get('password')
        ?.valueChanges
        .subscribe(res =>{
          if (this.signUpform.get('password')?.valid) {
            this.signUpform.get('confirmPassword')?.enable()
          } else {
            this.signUpform.get('confirmPassword')?.disable()
          }
        })
  }

}