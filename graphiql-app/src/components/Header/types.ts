import { SyntheticEvent } from 'react';

interface Props {
  toggleTheme: (
    event: SyntheticEvent<Element, Event>,
    checked: boolean
  ) => void;
  window?: () => Window;
}

export default Props;
