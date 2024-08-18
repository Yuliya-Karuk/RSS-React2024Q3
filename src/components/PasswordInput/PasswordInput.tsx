import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { InputProps } from '../../models/types';
import { calculateStrength } from '../../utils/utils';
import { Input } from '../Input/Input';
import styles from './PasswordInput.module.scss';

type PasswordInputProps<T extends FieldValues> = InputProps<T>;

export function PasswordInput<T extends FieldValues>(props: PasswordInputProps<T>) {
  const { name, label, type = 'text', register, error } = props;

  const [strength, setStrength] = useState<number>(0);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStrength = calculateStrength(e.target.value);
    setStrength(newStrength);
  };

  return (
    <>
      <Input name={name} label={label} type={type} error={error} onInput={onInput} register={register} />
      <div className={styles.meterContainer}>
        {[0, 1, 2, 3, 4].map(index => (
          <div key={index} className={`${styles.meterBar} ${index < strength ? styles.meterBarActive : ''}`} />
        ))}
      </div>
    </>
  );
}
