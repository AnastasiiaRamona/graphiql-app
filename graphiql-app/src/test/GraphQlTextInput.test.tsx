import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  GraphQlTextInputUrl,
  GraphQlTextInputSdl,
} from '../components/GraphQlClientPage/GraphQlTextInput/GraphQlTextInput';
import { useForm, FormProvider } from 'react-hook-form';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

const mockRegister = vi.fn();

const MockFormProvider = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<FormData>();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('GraphQlTextInputUrl and GraphQlTextInputSdl Components', () => {
  it('renders GraphQlTextInputUrl component correctly', () => {
    render(
      <MockFormProvider>
        <GraphQlTextInputUrl
          id="url-input"
          label="URL"
          register={mockRegister}
          url="http://example.com"
        />
      </MockFormProvider>
    );

    expect(screen.getByLabelText('URL')).toBeInTheDocument();
    expect(screen.getByDisplayValue('http://example.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('calls onClickSdl when the button is clicked', () => {
    const handleClick = vi.fn();

    render(
      <MockFormProvider>
        <GraphQlTextInputSdl
          id="sdl-input"
          label="SDL"
          register={mockRegister}
          onClickSdl={handleClick}
        />
      </MockFormProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(handleClick).toHaveBeenCalled();
  });
});
