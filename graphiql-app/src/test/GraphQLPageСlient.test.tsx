import { render, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { IntlProvider } from 'next-intl';
import GraphQLPageСlient from '@/components/GraphQlClientPage/GraphQlClientPage';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { toast } from 'react-toastify';

vi.mock('@/apiGraphQl/getDataGraphQl', () => ({
  __esModule: true,
  default: vi.fn().mockRejectedValue(new Error('Fetch error')),
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
  onAuthStateChanged: vi.fn((auth, callback) => {
    callback({ uid: '123', email: 'test@example.com' });
    return () => {};
  }),
}));

vi.mock('next/navigation', async () => {
  const original = await vi.importActual<unknown>('next/navigation');
  return {
    ...(original as Record<string, unknown>),
    useRouter: () => ({
      push: vi.fn(),
    }),
    usePathname: vi.fn(() => '/mocked-pathname'),
  };
});

vi.mock('@uiw/react-codemirror', () => ({
  __esModule: true,
  default: () => <div>CodeMirror Mock</div>,
}));

vi.mock('@/hooks/useControlGraphQlPage', () => ({
  __esModule: true,
  default: () => ({
    value: '',
    status: '500',
    setStatus: vi.fn(),
    data: 'Fetch error',
    setData: vi.fn(),
    sdl: '',
    code: '',
    variables: '',
    headers: [],
    handleChange: vi.fn(),
    handleCodeChange: vi.fn(),
    onClickSdl: vi.fn(),
    handleVariablesChange: vi.fn(),
    handleSubmit: vi
      .fn()
      .mockImplementation((fn) => (e: { preventDefault: () => void }) => {
        e.preventDefault();
        fn();
      }),
    register: vi.fn(),
    router: { push: vi.fn() },
    setCode: vi.fn(),
    setVariables: vi.fn(),
    updateHeaders: vi.fn(),
    transformHeaders: vi.fn().mockReturnValue(''),
    setHeaders: vi.fn(),
  }),
}));

vi.mock('@/components/SchemeDoc/SchemeDoc', () => ({
  __esModule: true,
  default: () => <div>SchemeDoc Mock</div>,
}));

vi.mock('../TabsGraphQl/TabsGraphQl', () => ({
  __esModule: true,
  default: () => <div>GraphQlTabs Mock</div>,
}));

vi.mock('./GraphQlTextInput/GraphQlTextInput', () => ({
  __esModule: true,
  GraphQlTextInputSdl: () => <input aria-label="sdl-url" />,
  GraphQlTextInputUrl: () => <input aria-label="endpoint" />,
}));

describe('GraphQLPageСlient', () => {
  const messages = {
    errorToast: 'Error occurred',
    response: 'Some response message',
    send: 'Send',
    headers: 'Headers',
    query: 'Query',
    variables: 'Variables',
    addHeader: 'Add Header',
    status: 'Some status message',
  };

  it('displays error message when fetch fails', async () => {
    const toastErrorMock = vi.spyOn(toast, 'error');

    render(
      <IntlProvider messages={messages} locale="en">
        <ThemeProvider theme={{}}>
          <GraphQLPageСlient
            params={{ locale: 'en', slug: [] }}
            searchParams={{}}
            url="dGVzdC5jb20="
            bodyBase64="c2NyaXB0fHZhcmlhYmxlcw==|"
          />
        </ThemeProvider>
      </IntlProvider>
    );
    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith(
        'Error occurred: Error: Fetch error'
      );
    });
  });
});
