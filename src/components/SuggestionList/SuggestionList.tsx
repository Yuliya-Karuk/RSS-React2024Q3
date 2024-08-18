import styles from './SuggestionList.module.scss';

interface SuggestionListProps {
  suggestions: string[];
  handleSuggestionClick: (suggestion: string) => void;
}

export const SuggestionList = (props: SuggestionListProps) => {
  const { suggestions, handleSuggestionClick } = props;

  return (
    suggestions.length > 0 && (
      <ul className={styles.suggestionList}>
        {suggestions.map(sugg => (
          <li key={sugg} className={styles.suggestionItem}>
            <button type="button" className={styles.suggestionButton} onMouseDown={() => handleSuggestionClick(sugg)}>
              {sugg}
            </button>
          </li>
        ))}
      </ul>
    )
  );
};
