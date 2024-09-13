import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MethodSelect from '../components/MethodSelect/MethodSelect';
import { ThemeProvider, createTheme } from '@mui/material/styles';

describe('MethodSelect', () => {
  const locale = (key: string) => {
    const translations: { [key: string]: string } = {
      method: 'Method',
    };
    return translations[key] || key;
  };

  const theme = createTheme();

  const setup = (method = 'GET') => {
    const handleMethodChange = vi.fn();
    const updateUrl = vi.fn();

    render(
      <ThemeProvider theme={theme}>
        <MethodSelect
          method={method}
          handleMethodChange={handleMethodChange}
          updateUrl={updateUrl}
          locale={locale}
        />
      </ThemeProvider>
    );

    return {
      handleMethodChange,
      updateUrl,
    };
  };

  it('calls handleMethodChange and updateUrl on selection change', () => {
    const { handleMethodChange, updateUrl } = setup('POST');

    fireEvent.mouseDown(screen.getByRole('combobox'));

    fireEvent.click(screen.getByText('PUT'));

    expect(handleMethodChange).toHaveBeenCalled();

    expect(updateUrl).toHaveBeenCalledWith('PUT');
  });

  it('renders selected method with correct color', () => {
    setup('DELETE');

    const selectedMethod = screen.getByText('DELETE');
    expect(selectedMethod).toBeInTheDocument();
    expect(selectedMethod).toHaveStyle(`color: ${theme.palette.error.main}`);
  });
});
