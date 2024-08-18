import { CustomFormData } from '../../utils/validationSchema';
import styles from './SavedForm.module.scss';

interface SavedFormProps {
  form: CustomFormData;
  number: number;
}

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

export const SavedForm = ({ form, number }: SavedFormProps) => (
  <div className={styles.formContainer}>
    <h2 className={styles.heading}>Form № {number + 1}</h2>
    <div className={styles.savedForm}>
      <h3 className={styles.title}>Name</h3>
      <p className={styles.field}>{form.name}</p>
      <h3 className={styles.title}>Email</h3>
      <p className={styles.field}>{form.email}</p>
      <h3 className={styles.title}>Password</h3>
      <p className={styles.field}>{form.password}</p>
      <h3 className={styles.title}>Country</h3>
      <p className={styles.field}>{form.country}</p>
      <h3 className={styles.title}>Age</h3>
      <p className={styles.field}>{form.age}</p>
      <h3 className={styles.title}>Gender</h3>
      <p className={styles.field}>{form.gender}</p>
      <div className={styles.inputContainer}>
        <label htmlFor="term" className={styles.term}>
          Terms and Conditions agreement are accepted
        </label>
        <input className={styles.input} type="checkbox" id="term" disabled />
      </div>
    </div>
    <img src={form.picture} alt="form picture" className={styles.formImg} />
  </div>
);
