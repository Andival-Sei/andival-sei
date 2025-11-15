import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('рендерится с текстом', () => {
    render(<Button>Нажми меня</Button>);
    expect(screen.getByRole('button', { name: 'Нажми меня' })).toBeInTheDocument();
  });

  it('вызывает onClick при клике', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Кнопка</Button>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('не вызывает onClick когда disabled', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button onClick={handleClick} disabled>
        Кнопка
      </Button>
    );

    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('применяет правильный variant класс', () => {
    const { rerender } = render(<Button variant="primary">Кнопка</Button>);
    expect(screen.getByRole('button')).toHaveClass('button');

    rerender(<Button variant="secondary">Кнопка</Button>);
    expect(screen.getByRole('button')).toHaveClass('button');

    rerender(<Button variant="outline">Кнопка</Button>);
    expect(screen.getByRole('button')).toHaveClass('button');
  });

  it('применяет правильный size класс', () => {
    const { rerender } = render(<Button size="small">Кнопка</Button>);
    expect(screen.getByRole('button')).toHaveClass('small');

    rerender(<Button size="large">Кнопка</Button>);
    expect(screen.getByRole('button')).toHaveClass('large');
  });

  it('передает дополнительные props', () => {
    render(
      <Button data-testid="custom-button" aria-label="Кастомная кнопка">
        Кнопка
      </Button>
    );
    const button = screen.getByTestId('custom-button');
    expect(button).toHaveAttribute('aria-label', 'Кастомная кнопка');
  });
});
