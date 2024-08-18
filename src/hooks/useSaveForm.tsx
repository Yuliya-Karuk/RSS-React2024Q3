import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectCountries } from '../store/selectors';
import { addForm } from '../store/slices/formsSlice';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import { createValidationSchema, CustomForm, CustomFormData } from '../utils/validationSchema';

export const useSaveForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const countries = useAppSelector(selectCountries);
  const validationSchema = useMemo(() => createValidationSchema(countries), [countries]);

  const saveForm = (data: CustomForm, img: string) => {
    const filledForm: CustomFormData = {
      ...data,
      picture: img,
    };

    dispatch(addForm(filledForm));
    navigate('/');
  };

  return { validationSchema, saveForm };
};
