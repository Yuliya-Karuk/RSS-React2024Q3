import { useEffect, useState } from 'react';
import { FieldValues, Path, PathValue, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { InputProps } from '../../models/types';
import { selectCountries } from '../../store/selectors';
import { useAppSelector } from '../../store/storeHooks';
import { Input } from '../Input/Input';
import { SuggestionList } from '../SuggestionList/SuggestionList';
import styles from './CountryInput.module.scss';

interface ControlledCountryInputProps<T extends FieldValues> extends InputProps<T> {
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
}

export function ControlledCountryInput<T extends FieldValues>(props: ControlledCountryInputProps<T>) {
  const { name, label, register, type = 'text', autocomplete = undefined, error, watch, setValue } = props;
  const countries = useAppSelector(selectCountries);

  const inputValue: string = watch ? watch(name) : '';

  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>(countries);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (inputValue) {
      const filtered = countries.filter(country => country.toLowerCase().includes(inputValue.toLowerCase()));
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions(countries);
    }
  }, [inputValue, countries]);

  const handleSuggestionClick = (suggestion: string) => {
    setValue(name, suggestion as PathValue<T, Path<T>>, { shouldValidate: true });
    setIsFocused(false);
  };

  return (
    <div className={styles.countryContainer}>
      <Input
        autocomplete={autocomplete}
        name={name}
        label={label}
        register={register}
        type={type}
        error={error}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isFocused && filteredSuggestions.length > 0 && (
        <SuggestionList suggestions={filteredSuggestions} handleSuggestionClick={handleSuggestionClick} />
      )}
    </div>
  );
}
