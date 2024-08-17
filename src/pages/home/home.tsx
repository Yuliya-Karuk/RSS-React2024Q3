import { SavedForm } from '../../components/SavedForm/SavedForm';
import { selectForms } from '../../store/selectors';
import { useAppSelector } from '../../store/storeHooks';

export const Home = () => {
  const forms = useAppSelector(selectForms);

  return (
    <div>
      {forms.map((form, i) => (
        <SavedForm key={form.name} form={form} number={i} />
      ))}
    </div>
  );
};
