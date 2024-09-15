import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ResponseSection from '../components/ResponseSectionRest/ResponseSectionRest';

describe('ResponseSection', () => {
  const locale = (key: string) => {
    const translations: { [key: string]: string } = {
      response: 'Response',
      status: 'Status',
      body: 'Body',
    };
    return translations[key] || key;
  };

  const setup = (responseStatus: string, responseBody: string) => {
    render(
      <ResponseSection
        responseStatus={responseStatus}
        responseBody={responseBody}
        locale={locale}
      />
    );
  };

  it('renders the response section with correct locale values', () => {
    setup('200 OK', 'Response body content');

    const responseTitle = screen.getByText('Response');
    expect(responseTitle).toBeInTheDocument();

    const statusText = screen.getByText('Status: 200 OK');
    expect(statusText).toBeInTheDocument();

    const bodyText = screen.getByText('Response body content');
    expect(bodyText).toBeInTheDocument();
  });

  it('renders localized labels correctly', () => {
    setup('500 Internal Server Error', 'Error occurred');

    const statusText = screen.getByText('Status: 500 Internal Server Error');
    expect(statusText).toBeInTheDocument();

    const bodyText = screen.getByText('Error occurred');
    expect(bodyText).toBeInTheDocument();
  });
});
