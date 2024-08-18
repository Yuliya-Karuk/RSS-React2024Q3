import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { transformImgToBase64 } from '../utils/utils';
import { CustomForm } from '../utils/validationSchema';
import { useSaveForm } from './useSaveForm';

export const useControlledForm = () => {
  const { validationSchema, saveForm } = useSaveForm();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });

  const onSubmit = async (data: CustomForm) => {
    const transformedPicture = await transformImgToBase64(data.picture);

    saveForm(data, transformedPicture);
    reset();
  };

  return { register, handleSubmit, errors, isValid, watch, setValue, onSubmit };
};
