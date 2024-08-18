import { ChangeEvent, memo, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { InputProps } from '../../models/types';
import { MemoizedInput } from '../Input/Input';
import styles from './FileInput.module.scss';

type FileInputProps<T extends FieldValues> = InputProps<T>;

export function FileInput<T extends FieldValues>(props: FileInputProps<T>) {
  const { name, label, register, type = 'text', error } = props;

  const [selectedFileName, setSelectedFileName] = useState('');

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFile = files && files.length > 0 ? files[0] : null;

    if (selectedFile) {
      setSelectedFileName(selectedFile.name);
    } else {
      setSelectedFileName('');
    }
  };

  return (
    <div className={styles.fileContainer}>
      <MemoizedInput
        name={name}
        label={label}
        register={register}
        type={type}
        error={error}
        onInput={handleFileUpload}
      />
      <p className={styles.fileName}>{selectedFileName}</p>
    </div>
  );
}

export const MemoizedFileInput = memo(FileInput) as <T extends FieldValues>(props: FileInputProps<T>) => JSX.Element;
