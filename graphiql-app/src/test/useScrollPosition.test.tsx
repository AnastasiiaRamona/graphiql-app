import { render, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useScrollPosition from '../hooks/useScrollPosition';

const TestComponent = () => {
  const scrolled = useScrollPosition();
  return (
    <div data-testid="scroll-position">
      {scrolled ? 'Scrolled' : 'Not Scrolled'}
    </div>
  );
};

describe('useScrollPosition', () => {
  it('should return "Scrolled" when window is scrolled past 50px', () => {
    global.scrollY = 0;
    render(<TestComponent />);

    act(() => {
      global.scrollY = 60;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(
      document.querySelector('[data-testid="scroll-position"]')
    ).toHaveTextContent('Scrolled');
  });

  it('should return "Not Scrolled" when window is scrolled less than 50px', () => {
    global.scrollY = 0;
    render(<TestComponent />);

    act(() => {
      global.scrollY = 30;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(
      document.querySelector('[data-testid="scroll-position"]')
    ).toHaveTextContent('Not Scrolled');
  });
});
