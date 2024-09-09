// src/test/GraphQlTabs.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GraphQlTabs from '../components/TabsGraphQl/TabsGraphQl'; // Укажите правильный путь к вашему файлу

vi.mock('@uiw/react-codemirror', () => ({
  __esModule: true,
  default: vi.fn(() => <div>CodeMirror</div>),
}));
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('GraphQlTabs', () => {
  const mockHandleChange = vi.fn();
  const mockHandleCodeChange = vi.fn();
  const mockHandleVariablesChange = vi.fn();
  const mockHandleAddHeader = vi.fn();
  const mockHandleDeleteHeader = vi.fn();
  const mockHandleHeaderChange = vi.fn();
  const mockHandleChangeUrl = vi.fn();

  const props = {
    value: '1',
    headers: [{ key: 'Authorization', value: 'Bearer token' }],
    code: 'query { field }',
    variables: '{"key": "value"}',
    handleChange: mockHandleChange,
    handleCodeChange: mockHandleCodeChange,
    handleVariablesChange: mockHandleVariablesChange,
    handleAddHeader: mockHandleAddHeader,
    handleDeleteHeader: mockHandleDeleteHeader,
    handleHeaderChange: mockHandleHeaderChange,
    handleChangeUrl: mockHandleChangeUrl,
  };

  it('should render tabs correctly', () => {
    render(<GraphQlTabs {...props} />);

    expect(screen.getByText('headers')).toBeInTheDocument();
    expect(screen.getByText('query')).toBeInTheDocument();
    expect(screen.getByText('variables')).toBeInTheDocument();
  });

  it('should call handleAddHeader on button click', async () => {
    render(<GraphQlTabs {...props} />);

    fireEvent.click(screen.getByText('addHeader'));

    expect(mockHandleAddHeader).toHaveBeenCalled();
  });

  it('should render header fields and call handlers', async () => {
    render(<GraphQlTabs {...props} />);

    expect(screen.getByLabelText('headerKey')).toHaveValue('Authorization');
    expect(screen.getByLabelText('headerValue')).toHaveValue('Bearer token');

    fireEvent.change(screen.getByLabelText('headerKey'), {
      target: { value: 'NewKey' },
    });
    expect(mockHandleHeaderChange).toHaveBeenCalledWith(0, 'key', 'NewKey');

    fireEvent.click(screen.getByLabelText('delete'));
    expect(mockHandleDeleteHeader).toHaveBeenCalledWith(0);
  });
});
