import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { MemoizedFileInput } from '../../components/FileInput/FileInput';
import { GenderFieldset } from '../../components/GenderFieldset/GenderFieldset';
import { Input } from '../../components/Input/Input';
import { UncontrolledCountryInput } from '../../components/UncontrolledCountryInput/UncontrolledCountryInput';
import { UncontrolledPasswordInput } from '../../components/UncontrolledPasswordInput/UncontrolledPasswordInput';
import { ValidationErrors } from '../../models/types';
import { selectCountries } from '../../store/selectors';
import { addForm } from '../../store/slices/formsSlice';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { transformImgToBase64 } from '../../utils/utils';
import { createValidationSchema, CustomFormData } from '../../utils/validationSchema';
import styles from './uncontrolledForm.module.scss';

export const UncontrolledForm = () => {
  // const { register, handleSubmit, errors, isValid, watch, setValue, onSubmit, setUploadedImage } = useControlledForm();
  const [errors, setErrors] = useState<ValidationErrors>({});
  const countries = useAppSelector(selectCountries);
  const validationSchema = useMemo(() => createValidationSchema(countries), [countries]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    console.log(data);

    try {
      const res = validationSchema.validateSync(data, { abortEarly: false });
      const transformedPicture = await transformImgToBase64(data.picture as File);
      const filledForm: CustomFormData = {
        ...res,
        picture: transformedPicture,
      };

      dispatch(addForm(filledForm));
      navigate('/');
    } catch (error: unknown) {
      if (error instanceof yup.ValidationError) {
        const errorsList: Record<string, { message: string }> = {};

        error.inner.forEach(({ path, message }) => {
          if (path) {
            errorsList[path] = { message };
          }
        });

        setErrors(errorsList);
        console.log(errorsList);
      }
    }
  };

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
