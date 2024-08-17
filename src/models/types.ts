import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

export interface InputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  type?: string;
  error?: FieldError;
  autocomplete?: string | undefined;
}

export type Gender = 'Male' | 'Female';
