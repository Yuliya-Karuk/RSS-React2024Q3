import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { CountryInput } from '../../components/CountryInput/CountryInput';
import { FileInput } from '../../components/FileInput/FileInput';
import { Input } from '../../components/Input/Input';
import { selectCountries } from '../../store/selectors';
import { useAppSelector } from '../../store/storeHooks';
import styles from './controlledForm.module.scss';

type IFormInput = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  picture: FileList;
  country: string;
  gender: NonNullable<'male' | 'female'>;
};

export const validEmailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

function createValidationSchema(countries: string[]) {
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

    gender: yup
      .string()
      .oneOf(['male', 'female'], 'Please select a valid gender')
      .required('Gender is a required field'),

    acceptTerms: yup.boolean().oneOf([true], 'You must accept the terms and conditions').required(),

    picture: yup
      .mixed<FileList>()
      .required('A picture is required')
      .test(
        'fileFormat',
        'Unsupported format, only PNG and JPEG allowed',
        value => value && value[0] && ['image/jpeg', 'image/png'].includes(value[0].type)
      )
      .test(
        'fileSize',
        'File too large, should be less than 5MB',
        value => value && value[0] && value[0].size <= 5 * 1024 * 1024
      ),

    country: yup.string().required('Country is a required field').oneOf(countries, 'Please select a valid country'),
  });
}

export const ControlledForm = () => {
  const countries = useAppSelector(selectCountries);
  const validationSchema = createValidationSchema(countries);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });

  const onSubmit = (data: IFormInput) => {
    console.log(data);
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Controlled Form</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input name={'name'} label="Name" register={register} type="text" error={errors.name} />

        <Input name={'age'} label="Age" register={register} type="number" error={errors.age} />

        <Input name={'email'} label="Email" register={register} type="email" error={errors.email} />

        <Input name={'password'} label="Password" register={register} type="password" error={errors.password} />

        <Input
          name={'confirmPassword'}
          label="Confirm Password"
          register={register}
          type="password"
          error={errors.confirmPassword}
        />

        <CountryInput
          autocomplete="on"
          name={'country'}
          label="Country"
          register={register}
          type="text"
          error={errors.country}
          watch={watch}
          setValue={setValue}
        />

        <FileInput name={'picture'} label="Picture" register={register} type="file" error={errors.picture} />

        <Input
          name={'acceptTerms'}
          label="Accept Terms and Conditions agreement"
          register={register}
          type="checkbox"
          error={errors.acceptTerms}
        />

        {/* <button type="submit" className={styles.submitButton}>
          Submit
        </button> */}
      </form>
    </div>
  );
};
