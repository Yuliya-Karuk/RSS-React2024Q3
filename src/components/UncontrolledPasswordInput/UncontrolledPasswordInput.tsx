import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { InputProps } from '../../models/types';
import { calculateStrength } from '../../utils/utils';
import { Input } from '../Input/Input';
import styles from './UncontrolledInput.module.scss';

type PasswordInputProps<T extends FieldValues> = InputProps<T>;

export function UncontrolledPasswordInput<T extends FieldValues>(props: PasswordInputProps<T>) {
  const { name, label, type = 'text', error } = props;

  const [strength, setStrength] = useState<number>(0);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStrength = calculateStrength(e.target.value);
    setStrength(newStrength);
  };

  return (
    <>
      <Input name={name} label={label} type={type} error={error} onInput={onInput} />
      <div className={styles.meterContainer}>
        {[0, 1, 2, 3].map(index => (
          <div key={index} className={`${styles.meterBar} ${index < strength ? styles.meterBarActive : ''}`} />
        ))}
      </div>
    </>
  );
}
