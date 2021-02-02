import { AbstractControl, FormGroup, Validators } from '@angular/forms';

export const minPasswordLength = 6;
export const maxPasswordLength = 20;


export const minNickname = 4;
export const maxNickname = 50;


export const minUserName = 4;
export const maxUserName = 50;

export const passwordsValidators = [Validators.required, Validators.minLength(minPasswordLength), Validators.maxLength(maxPasswordLength)];

export const nicknameValidator = [Validators.required, Validators.minLength(minNickname), Validators.maxLength(maxNickname)];

export const usernameValidator = [Validators.required, Validators.minLength(minUserName), Validators.maxLength(maxUserName)];

export const passwordsMatchValidator = (form: AbstractControl, firstField: string, secondField: string) => {
    const firstF = form.get(firstField);
    const secondF = form.get(secondField);
    if (firstF && secondF) {
        const result = firstF.value === secondF.value ? null : { mismatch: true };
        if (result)
        {
            secondF.setErrors({ mismatch: true });
        }
        else{
            secondF.setErrors(null);
        }
        return null;
    }
    return null;
};
