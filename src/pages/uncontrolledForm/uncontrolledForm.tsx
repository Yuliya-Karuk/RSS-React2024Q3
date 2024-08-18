import { MemoizedFileInput } from '../../components/FileInput/FileInput';
import { GenderFieldset } from '../../components/GenderFieldset/GenderFieldset';
import { Input } from '../../components/Input/Input';
import { UncontrolledCountryInput } from '../../components/UncontrolledCountryInput/UncontrolledCountryInput';
import { UncontrolledPasswordInput } from '../../components/UncontrolledPasswordInput/UncontrolledPasswordInput';
import { useUncontrolledForm } from '../../hooks/useUncontrolledForm';
import styles from './uncontrolledForm.module.scss';

export const UncontrolledForm = () => {
  const { handleSubmit, errors } = useUncontrolledForm();

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Uncontrolled Form</h1>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input name={'name'} label="Name" type="text" error={errors.name} />

        <Input name={'email'} label="Email" type="email" error={errors.email} />

        <UncontrolledPasswordInput name={'password'} label="Password" type="password" error={errors.password} />

        <Input name={'confirmPassword'} label="Confirm Password" type="password" error={errors.confirmPassword} />

        <Input name={'age'} label="Age" type="number" error={errors.age} />

        <GenderFieldset name={'gender'} label="Gender" type="radio" error={errors.gender} />

        <UncontrolledCountryInput
          autocomplete="on"
          name={'country'}
          label="Country"
          type="text"
          error={errors.country}
        />

        <MemoizedFileInput name={'picture'} label="Picture" type="file" error={errors.picture} />

        <Input
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
