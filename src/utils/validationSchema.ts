import * as yup from 'yup';
import { passwordMinLength } from './consts';

export interface CustomForm {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  picture: File;
  country: string;
  gender: string;
}

export type CustomFormData = Omit<CustomForm, 'picture'> & {
  picture: string;
};

export const validEmailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

export function createValidationSchema(countries: string[]) {
  return yup.object().shape({
    name: yup
      .string()
      .required('Name is a required field')
      .matches(/^[A-Z][a-z]*$/, 'Name must start with a capital letter and be followed by lowercase letters'),

    age: yup
      .number()
      .transform((value, originalValue) => (originalValue.trim() === '' ? undefined : value))
      .required('Age is a required field')
      .min(0, 'Age cannot be negative'),

    email: yup.string().required('Email is a required field').matches(validEmailRegExp, 'Must be a valid email format'),

    password: yup
      .string()
      .required('Password is a required field')
      .min(passwordMinLength, `Password must be at least ${passwordMinLength} characters long`)
      .matches(
        passwordStrengthRegex,
        'Password must contain 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character'
      ),

    confirmPassword: yup
      .string()
      .required('Confirm Password is a required field')
      .oneOf([yup.ref('password')], 'Passwords must match')
      .matches(
        passwordStrengthRegex,
        'Password must contain 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character'
      ),

    gender: yup.string().required('Gender is a required field'),

    acceptTerms: yup
      .boolean()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('You must accept the terms and conditions'),

    picture: yup
      .mixed<File>()
      .required('A picture is required')
      .transform(value => {
        return value instanceof FileList ? value[0] : value;
      })
      .test(
        'fileFormat',
        'Unsupported format, only PNG and JPEG allowed',
        value => value && value instanceof File && ['image/jpeg', 'image/png'].includes(value.type)
      )
      .test(
        'fileSize',
        'File too large, should be less than 5MB',
        value => value && value instanceof File && value.size <= 5 * 1024 * 1024
      ),

    country: yup.string().required('Country is a required field').oneOf(countries, 'Please select a valid country'),
  });
}
