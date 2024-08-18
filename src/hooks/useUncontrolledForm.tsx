import { useState } from 'react';
import * as yup from 'yup';
import { CustomForm } from '../components/SavedForm/SavedForm';
import { ValidationErrors } from '../models/types';
import { transformImgToBase64 } from '../utils/utils';
import { useSaveForm } from './useSaveForm';

export const useUncontrolledForm = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const { validationSchema, saveForm } = useSaveForm();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    const preparedData = {
      ...data,
      acceptTerms: data.acceptTerms === 'on' ? true : undefined,
    } as CustomForm;

    try {
      const res = validationSchema.validateSync(preparedData, { abortEarly: false });
      const transformedPicture = await transformImgToBase64(preparedData.picture as File);

      saveForm(res, transformedPicture);
    } catch (error: unknown) {
      if (error instanceof yup.ValidationError) {
        const errorsList: Record<string, { message: string }> = {};

        error.inner.forEach(({ path, message }) => {
          if (path) {
            errorsList[path] = { message };
          }
        });

        setErrors(errorsList);
      }
    }
  };
  return { handleSubmit, errors };
};
