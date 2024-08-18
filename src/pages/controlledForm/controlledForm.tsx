import { CountryInput } from '../../components/CountryInput/CountryInput';
import { MemoizedFileInput } from '../../components/FileInput/FileInput';
import { GenderFieldset } from '../../components/GenderFieldset/GenderFieldset';
import { Input } from '../../components/Input/Input';
import { PasswordInput } from '../../components/PasswordInput/PasswordInput';

import { useControlledForm } from '../../hooks/useControlledForm';
import styles from './controlledForm.module.scss';

export const ControlledForm = () => {
  const { register, handleSubmit, errors, isValid, watch, setValue, onSubmit } = useControlledForm();

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Controlled Form</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input name={'name'} label="Name" register={register} type="text" error={errors.name} />

        <Input name={'email'} label="Email" register={register} type="email" error={errors.email} />

        <PasswordInput
          name={'password'}
          label="Password"
          register={register}
          type="password"
          error={errors.password}
          watch={watch}
        />

        <Input
          name={'confirmPassword'}
          label="Confirm Password"
          register={register}
          type="password"
          error={errors.confirmPassword}
        />

        <Input name={'age'} label="Age" register={register} type="number" error={errors.age} />

        <GenderFieldset name={'gender'} label="Gender" register={register} type="radio" error={errors.gender} />

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

        <MemoizedFileInput name={'picture'} label="Picture" register={register} type="file" error={errors.picture} />

        <Input
          name={'acceptTerms'}
          label="Accept Terms and Conditions agreement"
          register={register}
          type="checkbox"
          error={errors.acceptTerms}
        />

        <button type="submit" className={styles.submitButton} disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};
