import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { IntlProvider } from 'next-intl';
import GraphQlResponse from '@/components/GraphQlResponse/GraphQlResponse';
import { vi } from 'vitest';

vi.mock('@uiw/react-codemirror', () => ({
  __esModule: true,
  default: () => <div>CodeMirror Mock</div>,
}));

describe('GraphQlResponse', () => {
  const messages = {
    response: 'Response',
    status: 'Status',
    noData: 'No data available',
  };

  it('renders without crashing', () => {
    render(
      <IntlProvider messages={messages} locale="en">
        <ThemeProvider theme={{}}>
          <GraphQlResponse status="200" data={{}} />
        </ThemeProvider>
      </IntlProvider>
    );

    expect(
      screen.getByRole('heading', { name: /response/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/status/i)).toBeInTheDocument();
  });

  it('displays status message when data is not empty', () => {
    const data = { example: 'Example data' };

    render(
      <IntlProvider messages={messages} locale="en">
        <ThemeProvider theme={{}}>
          <GraphQlResponse status="200" data={data} />
        </ThemeProvider>
      </IntlProvider>
    );
    expect(screen.getByText(/status/i)).toBeInTheDocument();
  });
});
