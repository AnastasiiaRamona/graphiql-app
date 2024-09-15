import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import YoutubeRSSchoolResource from '../components/RSSchoolResource/RSSchoolResource';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

const Wrapper = ({ children }: { children: ReactNode }) => (
  <NextIntlClientProvider locale="en" messages={{}}>
    {children}
  </NextIntlClientProvider>
);

describe('YoutubeRSSchoolResource', () => {
  it('should render correctly', () => {
    render(
      <Wrapper>
        <YoutubeRSSchoolResource />
      </Wrapper>
    );

    const iframe = screen.getByTitle('Embedded youtube');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/M170z9Ok3CI?si=SmHS7oll1Be-QRIv'
    );
    expect(iframe).toHaveAttribute(
      'allow',
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
    );
  });
});
