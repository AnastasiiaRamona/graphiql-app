import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import RestfullForm from '../app/[locale]/[method]/[[...params]]/page';
import useRestfullForm from '../hooks/useRestfullForm';
import useCheckingOfAuthorization from '@/hooks/useCheckingOfAuthorization';

vi.mock('@/firebase/firebase', () => ({
  initializeApp: vi.fn(),
  getAuth: vi.fn(() => ({
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
  })),
}));

vi.mock('../hooks/useRestfullForm');
vi.mock('@/hooks/useCheckingOfAuthorization');
vi.mock('next-intl', () => ({
  useTranslations: vi.fn(() => (key: string) => key),
}));

describe('RestfullForm component', () => {
  const mockUseRestfullForm = {
    method: 'GET',
    endpoint: '',
    headers: [],
    body: '',
    responseStatus: 200,
    responseBody: 'Response body',
    handleMethodChange: vi.fn(),
    handleEndpointChange: vi.fn(),
    handleBodyChange: vi.fn(),
    handleHeaderChange: vi.fn(),
    handleAddHeader: vi.fn(),
    handleSubmit: vi.fn(),
    updateUrl: vi.fn(),
    handleRemoveHeader: vi.fn(),
    variables: [],
    showVariables: false,
    handleVariableChange: vi.fn(),
    handleAddVariable: vi.fn(),
    toggleVariablesSection: vi.fn(),
    handleRemoveVariable: vi.fn(),
    handlePrettierWithVariables: vi.fn(),
  };

  const mockUseCheckingOfAuthorization = {
    loading: false,
    isAuthenticated: true,
  };

  beforeEach(() => {
    (useRestfullForm as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockUseRestfullForm
    );
    (
      useCheckingOfAuthorization as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue(mockUseCheckingOfAuthorization);
  });

  it('should render form components when authenticated', () => {
    render(<RestfullForm />);

    expect(screen.getByText('restfullClientHeader')).toBeInTheDocument();
    expect(screen.getByLabelText('Endpoint URL')).toBeInTheDocument();
    expect(screen.getByText('sendRequest')).toBeInTheDocument();
  });

  it('should update URL and call handleEndpointChange when input changes', () => {
    render(<RestfullForm />);

    const endpointInput = screen.getByLabelText('Endpoint URL');
    fireEvent.change(endpointInput, {
      target: { value: 'https://example.com' },
    });

    expect(mockUseRestfullForm.handleEndpointChange).toHaveBeenCalled();
    expect(mockUseRestfullForm.updateUrl).toHaveBeenCalledWith(
      'GET',
      'https://example.com'
    );
  });
});
