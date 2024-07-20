import { AbstractControl, ValidationErrors } from "@angular/forms";



export class EmpIDValidators{
    static isEmpID(controls : AbstractControl) : ValidationErrors | null{
        let valEmpID = controls.value as string;

        if (valEmpID) {
            let regexp = /^[A-Za-z]\d{3}$/;
            let isValid = regexp.test(valEmpID);
            if (isValid) {
                return null;
            } else {
                return{
                    isValidEmpID : 'Employed Id should starts with 1 Alphabet and ends with 3 number'
                }
            }
        } else {
           return null
        }
    }
}