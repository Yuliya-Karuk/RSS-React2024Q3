import { memo, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { InputProps } from '../../models/types';
import { selectCountries } from '../../store/selectors';
import { useAppSelector } from '../../store/storeHooks';
import { MemoizedInput } from '../Input/Input';
import { SuggestionList } from '../SuggestionList/SuggestionList';
import styles from './CountryInput.module.scss';

type UncontrolledCountryInputProps<T extends FieldValues> = InputProps<T>;

export function UncontrolledCountryInput<T extends FieldValues>(props: UncontrolledCountryInputProps<T>) {
  const { name, label, type = 'text', autocomplete = undefined, error } = props;
  const countries = useAppSelector(selectCountries);

  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>(countries);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setIsFocused(false);
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    const filtered = countries.filter(country => country.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredSuggestions(filtered);
  };

  return (
    <div className={styles.countryContainer}>
      <MemoizedInput
        autocomplete={autocomplete}
        name={name}
        label={label}
        type={type}
        error={error}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onInput={onInput}
        value={inputValue}
      />
      {isFocused && filteredSuggestions.length > 0 && (
        <SuggestionList suggestions={filteredSuggestions} handleSuggestionClick={handleSuggestionClick} />
      )}
    </div>
  );
}

export const MemoizedUncontrolledCountryInput = memo(UncontrolledCountryInput) as <T extends FieldValues>(
  props: UncontrolledCountryInputProps<T>
) => JSX.Element;
