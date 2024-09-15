import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HeadersSection from '../components/HeadersSectionRest/HeadersSectionRest';

describe('HeadersSection', () => {
  const locale = (key: string) => {
    const translations: { [key: string]: string } = {
      header: 'Headers',
      addHeader: 'Add Header',
      headerKey: 'Header Key',
      headerValue: 'Header Value',
    };
    return translations[key] || key;
  };

  const setup = (headers = [{ key: '', value: '' }]) => {
    const handleHeaderChange = vi.fn();
    const handleAddHeader = vi.fn();
    const handleRemoveHeader = vi.fn();

    render(
      <HeadersSection
        headers={headers}
        handleHeaderChange={handleHeaderChange}
        handleAddHeader={handleAddHeader}
        handleRemoveHeader={handleRemoveHeader}
        locale={locale}
      />
    );

    return { handleHeaderChange, handleAddHeader, handleRemoveHeader };
  };

  it('renders headers section with initial headers', () => {
    setup([{ key: 'Content-Type', value: 'application/json' }]);

    expect(screen.getByText('Headers:')).toBeInTheDocument();
    expect(screen.getByLabelText('Header Key')).toBeInTheDocument();
    expect(screen.getByLabelText('Header Value')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Content-Type')).toBeInTheDocument();
    expect(screen.getByDisplayValue('application/json')).toBeInTheDocument();
  });

  it('calls handleHeaderChange on key change', () => {
    const { handleHeaderChange } = setup([
      { key: 'Authorization', value: 'Bearer token' },
    ]);

    const keyInput = screen.getByLabelText('Header Key');
    fireEvent.change(keyInput, { target: { value: 'Content-Type' } });

    expect(handleHeaderChange).toHaveBeenCalledWith(0, 'key', 'Content-Type');
  });

  it('calls handleHeaderChange on value change', () => {
    const { handleHeaderChange } = setup([
      { key: 'Authorization', value: 'Bearer token' },
    ]);

    const valueInput = screen.getByLabelText('Header Value');
    fireEvent.change(valueInput, { target: { value: 'application/json' } });

    expect(handleHeaderChange).toHaveBeenCalledWith(
      0,
      'value',
      'application/json'
    );
  });

  it('calls handleAddHeader when add button is clicked', () => {
    const { handleAddHeader } = setup();

    const addButton = screen.getByText('Add Header');
    fireEvent.click(addButton);

    expect(handleAddHeader).toHaveBeenCalled();
  });

  it('calls handleRemoveHeader when delete icon is clicked', () => {
    const { handleRemoveHeader } = setup([
      { key: 'Authorization', value: 'Bearer token' },
    ]);

    const deleteIcon = screen.getByTestId('DeleteIcon');
    fireEvent.click(deleteIcon);

    expect(handleRemoveHeader).toHaveBeenCalledWith(0);
  });

  it('renders multiple headers', () => {
    setup([
      { key: 'Authorization', value: 'Bearer token' },
      { key: 'Content-Type', value: 'application/json' },
    ]);

    expect(screen.getAllByLabelText('Header Key').length).toBe(2);
    expect(screen.getAllByLabelText('Header Value').length).toBe(2);

    expect(screen.getByDisplayValue('Authorization')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Bearer token')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Content-Type')).toBeInTheDocument();
    expect(screen.getByDisplayValue('application/json')).toBeInTheDocument();
  });
});
