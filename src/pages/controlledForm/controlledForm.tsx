import { MemoizedControlledCountryInput } from '../../components/CountryInput/ControlledCountryInput';
import { MemoizedFileInput } from '../../components/FileInput/FileInput';
import { GenderFieldset } from '../../components/GenderFieldset/GenderFieldset';
import { MemoizedInput } from '../../components/Input/Input';
import { MemoizedPasswordInput } from '../../components/PasswordInput/PasswordInput';

import { useControlledForm } from '../../hooks/useControlledForm';
import styles from './controlledForm.module.scss';

export const ControlledForm = () => {
  const { register, handleSubmit, errors, isValid, watch, setValue, onSubmit } = useControlledForm();

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Controlled Form</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <MemoizedInput
          name={'name'}
          label="Name"
          register={register}
          type="text"
          error={errors.name}
          autocomplete="user-name"
        />

        <MemoizedInput
          name={'email'}
          label="Email"
          register={register}
          type="email"
          error={errors.email}
          autocomplete="user-email"
        />

        <MemoizedPasswordInput
          name={'password'}
          label="Password"
          register={register}
          type="password"
          error={errors.password}
          autocomplete="new-password"
        />

        <MemoizedInput
          name={'confirmPassword'}
          label="Confirm Password"
          register={register}
          type="password"
          error={errors.confirmPassword}
          autocomplete="new-password"
        />

        <MemoizedInput name={'age'} label="Age" register={register} type="number" error={errors.age} />

        <GenderFieldset name={'gender'} label="Gender" register={register} type="radio" error={errors.gender} />

        <MemoizedControlledCountryInput
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

        <MemoizedInput
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
