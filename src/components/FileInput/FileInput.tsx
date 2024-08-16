import { ChangeEvent, useState } from 'react';
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { Input } from '../Input/Input';
import styles from './FileInput.module.scss';

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  type?: string;
  error?: FieldError;
  autocomplete?: string | undefined;
}

interface FileInputProps<T extends FieldValues> extends InputProps<T> {
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
}

export function FileInput<T extends FieldValues>(props: FileInputProps<T>) {
  const { name, label, register, type = 'text', error } = props;

  const [selectedFileName, setSelectedFileName] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFile = files && files.length > 0 ? files[0] : null;

    if (selectedFile) {
      setSelectedFileName(selectedFile.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setUploadedImage(base64);
      };

      reader.readAsDataURL(selectedFile);
    } else {
      setSelectedFileName('');
    }
  };

  console.log(uploadedImage);

  return (
    <div className={styles.fileContainer}>
      <Input name={name} label={label} register={register} type={type} error={error} onInput={handleFileChange} />
      <p className={styles.fileName}>{selectedFileName}</p>
    </div>
  );
}
