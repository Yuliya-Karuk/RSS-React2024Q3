import { ChangeEvent, memo, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { InputProps } from '../../models/types';
import { Input } from '../Input/Input';
import styles from './FileInput.module.scss';

interface FileInputProps<T extends FieldValues> extends InputProps<T> {
  setUploadedImage: React.Dispatch<React.SetStateAction<string>>;
}

export function FileInput<T extends FieldValues>(props: FileInputProps<T>) {
  const { name, label, register, type = 'text', error, setUploadedImage } = props;

  const [selectedFileName, setSelectedFileName] = useState('');

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFile = files && files.length > 0 ? files[0] : null;

    if (selectedFile) {
      setSelectedFileName(selectedFile.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        const imageInBase64 = reader.result as string;
        setUploadedImage(imageInBase64);
      };

      reader.readAsDataURL(selectedFile);
    } else {
      setSelectedFileName('');
    }
  };

  // console.log(uploadedImage);

  return (
    <div className={styles.fileContainer}>
      <Input name={name} label={label} register={register} type={type} error={error} onInput={handleFileUpload} />
      <p className={styles.fileName}>{selectedFileName}</p>
    </div>
  );
}

export const MemoizedFileInput = memo(FileInput) as <T extends FieldValues>(props: FileInputProps<T>) => JSX.Element;
