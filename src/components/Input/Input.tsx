import cn from 'classnames';
import { useState } from 'react';
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';
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
}

export function Input<T extends FieldValues>(props: InputProps<T>) {
  const { name, label, register, type = 'text', autocomplete = undefined, error } = props;
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
        required={true}
        type={type === 'password' && isPasswordVisible ? 'text' : type}
        {...register(name)}
        {...(autocomplete && { autoComplete: autocomplete })}
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
