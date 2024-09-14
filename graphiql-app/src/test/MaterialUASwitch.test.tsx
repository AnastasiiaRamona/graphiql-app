import { fireEvent, render, screen } from '@testing-library/react';
import MaterialUISwitch from '../components/SwitchTheme/MaterialUiSwitch';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

describe('MaterialUISwitch', () => {
  const renderWithTheme = (component: ReactNode) => {
    const theme = createTheme();
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  it('renders the switch with default styles', () => {
    renderWithTheme(<MaterialUISwitch />);

    const switchElement = screen.getByRole('checkbox');
    expect(switchElement).toBeInTheDocument();
  });

  it('toggles the switch', () => {
    renderWithTheme(<MaterialUISwitch />);

    const switchElement = screen.getByRole('checkbox');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).not.toBeChecked();

    fireEvent.click(switchElement);
    expect(switchElement).toBeChecked();
  });
});
