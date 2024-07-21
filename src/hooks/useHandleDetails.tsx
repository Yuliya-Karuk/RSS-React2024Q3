import { useLocation, useNavigate } from 'react-router-dom';

export const useHandleDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const closeDetails = () => {
    const params = new URLSearchParams(location.search);
    params.delete('details');
    navigate(`/?${params.toString()}`);
  };

  const openDetails = (
    e: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
    characterId: string
  ) => {
    e.stopPropagation();
    const params = new URLSearchParams(location.search);

    params.set('details', characterId);
    navigate(`/?${params.toString()}`);
  };

  return { closeDetails, openDetails };
};
