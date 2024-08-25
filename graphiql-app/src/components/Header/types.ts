import { SyntheticEvent } from 'react';

interface Props {
  toggleTheme: (
    event: SyntheticEvent<Element, Event>,
    checked: boolean
  ) => void;
  window?: () => Window;
  isDarkMode?: boolean;
}

export default Props;
