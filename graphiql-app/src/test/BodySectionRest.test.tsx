import BodySection from '../components/BodySectionRest/BodySectionRest';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

vi.mock('../PrettyButton/PrettyButton', () => ({
  __esModule: true,
  default: () => <div data-testid="pretty-button">Mock PrettyButton</div>,
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('BodySection component', () => {
  const setup = () => {
    const mockHandleBodyChange = vi.fn();
    const mockHandlePrettierWithVariables = vi.fn();
    const mockHandleBlur = vi.fn();
    const mockLocale = vi.fn().mockImplementation((key) => key);

    render(
      <BodySection
        body="initial body content"
        handleBodyChange={mockHandleBodyChange}
        handlePrettierWithVariables={mockHandlePrettierWithVariables}
        handleBlur={mockHandleBlur}
        locale={mockLocale}
      />
    );

    return {
      mockHandleBodyChange,
      mockHandlePrettierWithVariables,
      mockHandleBlur,
      mockLocale,
    };
  };

  it('should call handleBlur on blur', () => {
    const { mockHandleBlur } = setup();

    const textField = screen.getByLabelText('requestBody');
    fireEvent.blur(textField);

    expect(mockHandleBlur).toHaveBeenCalledTimes(1);
  });
});
