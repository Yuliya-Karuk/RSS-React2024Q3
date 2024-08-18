import cn from 'classnames';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import eyeOff from '../../assets/eye-off.svg';
import eyeOn from '../../assets/eye-show.svg';
import { InputProps } from '../../models/types';
import styles from './Input.module.scss';

export function Input<T extends FieldValues>(props: InputProps<T>) {
  const {
    name,
    label,
    register,
    type = 'text',
    autocomplete = undefined,
    error,
    onFocus,
    onBlur,
    onInput,
    value,
  } = props;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const registerProps = register ? register(name) : { name: name };

  return (
    <div className={styles.inputContainer}>
      <label
        htmlFor={name}
        className={cn(styles.label, {
          [styles.checkbox]: type === 'checkbox',
          [styles.file]: type === 'file',
        })}
      >
        {label}
        <span className={cn(styles.orange, { [styles.orangeHidden]: type === 'radio' })}>*</span>
      </label>
      <input
        className={cn(styles.input, {
          [styles.withEye]: type === 'password',
          [styles.invalid]: error,
        })}
        id={name}
        {...(value !== undefined && { value: value })}
        type={type === 'password' && isPasswordVisible ? 'text' : type}
        {...registerProps}
        {...(autocomplete && { autoComplete: autocomplete })}
        {...(onFocus && { onFocus: onFocus })}
        {...(onBlur && { onBlur: onBlur })}
        {...(onInput && { onInput: onInput })}
      />
      {type === 'password' && (
        <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} className={styles.eye}>
          <img src={isPasswordVisible ? eyeOn : eyeOff} alt="eye" />
        </button>
      )}
      {type === 'checkbox' && <span className={styles.customCheckbox} />}
      {type === 'radio' && <span className={styles.customRadio} />}
      <p className={styles.formError}>{error && error.message}</p>
    </div>
  );
}
