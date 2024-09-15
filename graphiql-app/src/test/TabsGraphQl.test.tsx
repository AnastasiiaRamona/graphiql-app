import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GraphQlTabs from '../components/TabsGraphQl/TabsGraphQl';
import { Tabs, Tab } from '@mui/material';

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
    render(
      <Tabs onChange={mockHandleChange}>
        <Tab label="headers" value="1" />
        <Tab label="query" value="2" />
        <Tab label="variables" value="3" />
      </Tabs>
    );

    expect(screen.getByText(/headers/i)).toBeInTheDocument();
    expect(screen.getByText(/query/i)).toBeInTheDocument();
    expect(screen.getByText(/variables/i)).toBeInTheDocument();
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
