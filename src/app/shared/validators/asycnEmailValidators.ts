import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";


export class AsyncEmailVAlidators{
    static isEmailAvailable(controls : AbstractControl) : Promise<ValidationErrors | null> | Observable<ValidationErrors | null>{
        let val = controls.value as string;

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (val === 'jhon12@gmail.com') {
                    resolve({
                        emailExist : `Email Id is alredy Exists...`
                    })
                } else {
                    resolve(null)
                }
            }, 2000);
        })
    }
}