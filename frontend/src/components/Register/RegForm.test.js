import * as React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { jest } from '@jest/globals';
import { MemoryRouter } from 'react-router-dom';
import RegForm from './RegForm';
import Register from '../../pages/Register';

jest.useFakeTimers();

describe('RENDERING on REGISTER-PAGE and REGFORM-component', () => {
  it('should >> RENDER << all the fields, a button and a field', () => {
    render(<Register />, { wrapper: MemoryRouter });
    expect(screen.getByTestId('header-testid')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/re-enter your password/i),
    ).toBeInTheDocument();
    expect(screen.getByTestId('register-button')).toBeInTheDocument();
    expect(screen.getByTestId('message-link')).toBeInTheDocument();
  });
});

describe('VALIDATION on frontend-RegForm component', () => {
  it('should NOT allow submit with any EMPTY field, 1 errormessage should appear', async () => {
    const mockSave = jest.fn(() => {
      return { status: 200 };
    });
    render(<RegForm fetchFn={mockSave} />, { wrapper: MemoryRouter });

    userEvent.type(screen.getByPlaceholderText(/username/i), '');
    userEvent.type(screen.getByPlaceholderText(/email/i), 'valami@valami.hu');
    userEvent.type(screen.getByPlaceholderText('Password'), '12345678');
    userEvent.type(
      screen.getByPlaceholderText(/re-enter your password/i),
      '12345678',
    );
    userEvent.click(screen.getByTestId('register-button'));

    await waitFor(() => {
      expect(
        screen.getByText('Név, email és jelszó megadása kötelező!'),
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(mockSave).toHaveBeenCalledTimes(0);
    });
  });

  it('should NOT allow submit with invalid EMAIL field, 1 errormessage should appear', async () => {
    const mockSave = jest.fn(() => {
      return { status: 200 };
    });
    render(<RegForm fetchFn={mockSave} />, { wrapper: MemoryRouter });

    userEvent.type(screen.getByPlaceholderText(/username/i), 'Gergő');
    userEvent.type(screen.getByPlaceholderText(/email/i), 'valamivalami.hu');
    userEvent.type(screen.getByPlaceholderText('Password'), '12345678');
    userEvent.type(
      screen.getByPlaceholderText(/re-enter your password/i),
      '12345678',
    );
    userEvent.click(screen.getByTestId('register-button'));

    await waitFor(() => {
      expect(
        screen.getByText('Kérjük érvényes emailt adjon meg.'),
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(mockSave).toHaveBeenCalledTimes(0);
    });
  });

  it('should NOT allow submit with PASSWORD under 8 character, 1 errormessage should appear', async () => {
    const mockSave = jest.fn(() => {
      return { status: 200 };
    });
    render(<RegForm fetchFn={mockSave} />, { wrapper: MemoryRouter });

    userEvent.type(screen.getByPlaceholderText(/username/i), 'Gergő');
    userEvent.type(screen.getByPlaceholderText(/email/i), 'valami@valami.hu');
    userEvent.type(screen.getByPlaceholderText('Password'), '1234567');
    userEvent.type(
      screen.getByPlaceholderText(/re-enter your password/i),
      '1234567',
    );
    userEvent.click(screen.getByTestId('register-button'));

    await waitFor(() => {
      expect(
        screen.getByText('A jelszónak minimum 8 karakterből kell állnia.'),
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(mockSave).toHaveBeenCalledTimes(0);
    });
  });

  it('should NOT allow submit if PASSWORDS are different, 1 errormessages should appear', async () => {
    const mockSave = jest.fn(() => {
      return { status: 200 };
    });
    render(<RegForm fetchFn={mockSave} />, { wrapper: MemoryRouter });

    userEvent.type(screen.getByPlaceholderText(/username/i), 'Gergő');
    userEvent.type(screen.getByPlaceholderText(/email/i), 'valami@valami.hu');
    userEvent.type(screen.getByPlaceholderText('Password'), '12345678');
    userEvent.type(
      screen.getByPlaceholderText(/re-enter your password/i),
      '12345679',
    );
    userEvent.click(screen.getByTestId('register-button'));

    await waitFor(() => {
      expect(
        screen.getByText('A két jelszó nem egyezik!'),
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(mockSave).toHaveBeenCalledTimes(0);
    });
  });

  it('should submit CORRECT-FORMDATA when all fields are valid, 1 success message should appear', async () => {
    const mockSave = jest.fn(() => {
      return { status: 200 };
    });
    render(<RegForm fetchFn={mockSave} />, { wrapper: MemoryRouter });

    userEvent.type(screen.getByPlaceholderText(/username/i), 'Gergő');
    userEvent.type(screen.getByPlaceholderText(/email/i), 'valami@valami.hu');
    userEvent.type(screen.getByPlaceholderText('Password'), '12345678');
    userEvent.type(
      screen.getByPlaceholderText(/re-enter your password/i),
      '12345678',
    );
    userEvent.click(screen.getByTestId('register-button'));

    await waitFor(() => expect(mockSave).toHaveBeenCalledWith({
      name: 'Gergő',
      email: 'valami@valami.hu',
      password: '12345678',
      password2: '12345678',
    }));
    await waitFor(() => {
      expect(mockSave).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(screen.getByText('Sikeres regisztráció!')).toBeInTheDocument();
    });
  });
});

describe('REDIRECTIONS on frontend-RegForm component', () => {
  it('should CALL-NAVIGATE-FUNCTION to be called after valid and succesfull submit', async () => {
    const mockSave = jest.fn(() => {
      return { status: 200 };
    });
    const mockNavigate = jest.fn();
    render(<RegForm fetchFn={mockSave} navigate={mockNavigate} />);

    userEvent.type(screen.getByPlaceholderText(/username/i), 'Gergő');
    userEvent.type(screen.getByPlaceholderText(/email/i), 'valami@valami.hu');
    userEvent.type(screen.getByPlaceholderText('Password'), '12345678');
    userEvent.type(
      screen.getByPlaceholderText(/re-enter your password/i),
      '12345678',
    );
    userEvent.click(screen.getByTestId('register-button'));

    await waitFor(() => {
      expect(mockSave).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(screen.getByText('Sikeres regisztráció!')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
