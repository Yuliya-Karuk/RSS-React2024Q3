import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { selectCountries } from '../store/selectors';
import { addForm } from '../store/slices/formsSlice';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import { createValidationSchema, CustomForm, CustomFormData } from '../utils/validationSchema';

export const useControlledForm = () => {
  const countries = useAppSelector(selectCountries);
  const validationSchema = useMemo(() => createValidationSchema(countries), [countries]);
  const [uploadedImage, setUploadedImage] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });

  const onSubmit = (data: CustomForm) => {
    const filledForm: CustomFormData = {
      ...data,
      picture: uploadedImage,
    };

    dispatch(addForm(filledForm));
    reset();
    navigate('/');
  };

  return { register, handleSubmit, errors, isValid, watch, setValue, onSubmit, setUploadedImage };
};
