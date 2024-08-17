import cn from 'classnames';
import { FieldValues } from 'react-hook-form';
import { InputProps } from '../../models/types';
import { genders } from '../../utils/consts';
import { Input } from '../Input/Input';
import styles from './GenderFieldset.module.scss';

type GenderFieldsetProps<T extends FieldValues> = InputProps<T>;

export function GenderFieldset<T extends FieldValues>(props: GenderFieldsetProps<T>) {
  const { name, label, register, type = 'text', error } = props;

  return (
    <div className={styles.genderContainer}>
      <fieldset>
        <legend>
          {label}
          <span className={cn(styles.orange, { [styles.orangeHidden]: type === 'radio' })}>*</span>
        </legend>
        <div className={styles.radioContainer}>
          {genders.map(gender => (
            <Input key={gender} name={name} label={gender} register={register} type={type} error={error} />
          ))}
        </div>
      </fieldset>
      <p className={styles.formError}>{error && error.message}</p>
    </div>
  );
}
