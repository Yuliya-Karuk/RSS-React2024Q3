import { MemoizedUncontrolledCountryInput } from '../../components/CountryInput/UncontrolledCountryInput';
import { MemoizedFileInput } from '../../components/FileInput/FileInput';
import { GenderFieldset } from '../../components/GenderFieldset/GenderFieldset';
import { MemoizedInput } from '../../components/Input/Input';
import { MemoizedPasswordInput } from '../../components/PasswordInput/PasswordInput';
import { useUncontrolledForm } from '../../hooks/useUncontrolledForm';
import styles from './uncontrolledForm.module.scss';

export const UncontrolledForm = () => {
  const { handleSubmit, errors } = useUncontrolledForm();

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Uncontrolled Form</h1>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <MemoizedInput name={'name'} label="Name" type="text" error={errors.name} autocomplete="user-name" />

        <MemoizedInput name={'email'} label="Email" type="email" error={errors.email} autocomplete="user-email" />

        <MemoizedPasswordInput
          name={'password'}
          label="Password"
          type="password"
          error={errors.password}
          autocomplete="new-password"
        />

        <MemoizedInput
          name={'confirmPassword'}
          label="Confirm Password"
          type="password"
          error={errors.confirmPassword}
          autocomplete="new-password"
        />

        <MemoizedInput name={'age'} label="Age" type="number" error={errors.age} />

        <GenderFieldset name={'gender'} label="Gender" type="radio" error={errors.gender} />

        <MemoizedUncontrolledCountryInput
          autocomplete="on"
          name={'country'}
          label="Country"
          type="text"
          error={errors.country}
        />

        <MemoizedFileInput name={'picture'} label="Picture" type="file" error={errors.picture} />

        <MemoizedInput
          name={'acceptTerms'}
          label="Accept Terms and Conditions agreement"
          type="checkbox"
          error={errors.acceptTerms}
        />

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};
