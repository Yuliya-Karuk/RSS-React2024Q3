import cn from 'classnames';
import { useState } from 'react';
import { FieldError, FieldValues, Path, UseFormRegister, UseFormWatch } from 'react-hook-form';
import eyeOff from '../../assets/eye-off.svg';
import eyeOn from '../../assets/eye-show.svg';
import styles from './Input.module.scss';

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  type?: string;
  error?: FieldError;
  autocomplete?: string | undefined;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  watch?: UseFormWatch<T>;
}

export function Input<T extends FieldValues>(props: InputProps<T>) {
  const { name, label, register, type = 'text', autocomplete = undefined, error, onFocus, onBlur } = props;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className={styles.inputContainer}>
      <label
        htmlFor={name}
        className={cn(styles.label, {
          [styles.checkbox]: type === 'checkbox',
        })}
      >
        {label}
        <span className={styles.orange} role="presentation">
          *
        </span>
      </label>
      <input
        className={cn(styles.input, {
          [styles.withEye]: type === 'password',
          [styles.invalid]: error,
        })}
        id={name}
        type={type === 'password' && isPasswordVisible ? 'text' : type}
        {...register(name)}
        {...(autocomplete && { autoComplete: autocomplete })}
        {...(onFocus && { onFocus: onFocus })}
        {...(onBlur && { onBlur: onBlur })}
      />
      {type === 'password' && (
        <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} className={styles.eye}>
          <img src={isPasswordVisible ? eyeOn : eyeOff} alt="eye" />
        </button>
      )}
      {type === 'checkbox' && <span className={styles.customCheckbox} />}
      <p className={styles.formError}>{error && error.message}</p>
    </div>
  );
}
