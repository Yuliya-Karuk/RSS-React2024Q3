import { FieldValues, UseFormWatch } from 'react-hook-form';
import { InputProps } from '../../models/types';
import { calculateStrength } from '../../utils/utils';
import { Input } from '../Input/Input';
import styles from './PasswordInput.module.scss';

interface PasswordInputProps<T extends FieldValues> extends InputProps<T> {
  watch: UseFormWatch<T>;
}

export function PasswordInput<T extends FieldValues>(props: PasswordInputProps<T>) {
  const { name, label, register, type = 'text', error, watch } = props;

  const inputValue: string = watch ? watch(name) : '';
  const strength = inputValue && calculateStrength(inputValue);

  return (
    <>
      <Input name={name} label={label} register={register} type={type} error={error} />
      {strength && error && (
        <div className={styles.meterContainer}>
          {[0, 1, 2, 3].map(index => (
            <div key={index} className={`${styles.meterBar} ${index < strength ? styles.meterBarActive : ''}`} />
          ))}
        </div>
      )}
    </>
  );
}
