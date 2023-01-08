import * as React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { jest } from '@jest/globals';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProfileForm from './ProfileForm';
import Profile from '../../pages/Profile';
import LoggedInUserContextProvider from '../../helper/LoggedInUserContextProvider';

describe('RENDERING on Profile-PAGE and ProfileForm-component', () => {
  it('should >> RENDER << all the fields and a button', async () => {
    const loggedInUser = jest.fn(() => {
      return { name: 'jani', email: 'jani@jani.hu' };
    });
    const setLoggedInUser = jest.fn(() => {
      return { loggedInUser: { name: 'gaborka', email: 'gaborka@gaborka.hu' } };
    });
    const mockLoggedInUserContext = jest.fn(() => {
      return { loggedInUser, setLoggedInUser };
    });
    render(
      <LoggedInUserContextProvider>
        <MemoryRouter initialEntries={['/profile']}>
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route>
              <Route path="/profile" element={<ProfileForm loggedInUserContextFn={mockLoggedInUserContext} />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </LoggedInUserContextProvider>,
    );
    await waitFor(() => { expect(screen.getByTestId('header-testid')).toBeInTheDocument(); });
    await waitFor(() => { expect(screen.getByTestId(/username/i)).toBeInTheDocument(); });
    await waitFor(() => { expect(screen.getByTestId(/email/i)).toBeInTheDocument(); });
    await waitFor(() => { expect(screen.getByTestId('newpassword')).toBeInTheDocument(); });
    await waitFor(() => { expect(screen.getByTestId('update-button')).toBeInTheDocument(); });
    await waitFor(() => { expect(screen.getByTestId('message-link')).toBeInTheDocument(); });
  });
});

describe('FIELD-VALIDATION on frontend-ProfileForm component', () => {
  it('should NOT allow submit >> if none of the fields filled >> UPDATE-BUTTON is DISABLED', async () => {
    const mockSave = jest.fn(() => {
      return { status: 200 };
    });
    const loggedInUser = jest.fn(() => {
      return { name: 'jani', email: 'jani@jani.hu' };
    });
    const setLoggedInUser = jest.fn(() => {
      return { loggedInUser: { name: 'gaborka', email: 'gaborka@gaborka.hu' } };
    });
    const mockLoggedInUserContext = jest.fn(() => {
      return { loggedInUser, setLoggedInUser };
    });

    render(
      <ProfileForm fetchFn={mockSave} loggedInUserContextFn={mockLoggedInUserContext} />, { wrapper: MemoryRouter },
    );
    await waitFor(() => { expect((screen.getByTestId('update-button')).disabled).toBe(true); });
    await waitFor(() => { userEvent.click(screen.getByTestId('update-button')); });
    await waitFor(() => { expect(mockSave).toHaveBeenCalledTimes(0); });
  });

  it('should NOT allow subm if invalid EMAIL, Err-M appear on DISABLED update-btn, subm-btn NOT appear', async () => {
    const mockSave = jest.fn(() => {
      return { status: 200 };
    });
    const loggedInUser = jest.fn(() => {
      return { name: 'jani', email: 'jani@jani.hu' };
    });
    const setLoggedInUser = jest.fn(() => {
      return { loggedInUser: { name: 'gaborka', email: 'gaborka@gaborka.hu' } };
    });
    const mockLoggedInUserContext = jest.fn(() => {
      return { loggedInUser, setLoggedInUser };
    });

    render(
      <ProfileForm fetchFn={mockSave} loggedInUserContextFn={mockLoggedInUserContext} />, { wrapper: MemoryRouter },
    );
    await waitFor(() => { userEvent.type(screen.getByTestId(/username/i), 'Gergő'); });
    await waitFor(() => { userEvent.type(screen.getByTestId(/email/i), 'valamivalami.hu'); });
    await waitFor(() => { userEvent.type(screen.getByTestId('newpassword'), '12345678'); });
    await waitFor(() => { userEvent.type(screen.getByPlaceholderText(/Adja meg újra a jelszót/i), '12345678'); });
    await waitFor(() => { userEvent.click(screen.getByTestId('update-button')); });

    await waitFor(() => { expect((screen.getByTestId('update-button')).disabled).toBe(true); });
    await waitFor(() => { expect(screen.queryByTestId('register-button')).not.toBeInTheDocument(); });
    await waitFor(() => { expect(screen.getByText('Kérjük érvényes email címet adjon meg!')).toBeInTheDocument(); });
    expect(mockSave).toHaveBeenCalledTimes(0);
  });

  it('should NOT submit if PWD under 8char, Err-M appear on DISABLED update-btn, submit-btn NOT appear', async () => {
    const mockSave = jest.fn(() => {
      return { status: 200 };
    });
    const loggedInUser = jest.fn(() => {
      return { name: 'jani', email: 'jani@jani.hu' };
    });
    const setLoggedInUser = jest.fn(() => {
      return { loggedInUser: { name: 'gaborka', email: 'gaborka@gaborka.hu' } };
    });
    const mockLoggedInUserContext = jest.fn(() => {
      return { loggedInUser, setLoggedInUser };
    });

    render(
      <ProfileForm fetchFn={mockSave} loggedInUserContextFn={mockLoggedInUserContext} />, { wrapper: MemoryRouter },
    );
    await waitFor(() => { userEvent.type(screen.getByTestId(/username/i), 'Gergő'); });
    await waitFor(() => { userEvent.type(screen.getByTestId(/email/i), 'valami@valami.hu'); });
    await waitFor(() => { userEvent.type(screen.getByTestId('newpassword'), '1234567'); });
    await waitFor(() => { userEvent.type(screen.getByPlaceholderText(/Adja meg újra a jelszót/i), '1234567'); });
    await waitFor(() => { userEvent.click(screen.getByTestId('update-button')); });

    await waitFor(() => { expect((screen.getByTestId('update-button')).disabled).toBe(true); });
    await waitFor(() => { expect(screen.queryByTestId('register-button')).not.toBeInTheDocument(); });
    await waitFor(() => {
      expect(screen.getByText('A jelszónak legalább 8 karakterből kell állnia!')).toBeInTheDocument();
    });
    await waitFor(() => { expect(mockSave).toHaveBeenCalledTimes(0); });
  });

  it('should NOT submit if PWDs DIFF, Err-M should appear on DISABLED update-btn, subm-btn NOT appear', async () => {
    const mockSave = jest.fn(() => {
      return { status: 200 };
    });
    const loggedInUser = jest.fn(() => {
      return { name: 'jani', email: 'jani@jani.hu' };
    });
    const setLoggedInUser = jest.fn(() => {
      return { loggedInUser: { name: 'gaborka', email: 'gaborka@gaborka.hu' } };
    });
    const mockLoggedInUserContext = jest.fn(() => {
      return { loggedInUser, setLoggedInUser };
    });

    render(
      <ProfileForm fetchFn={mockSave} loggedInUserContextFn={mockLoggedInUserContext} />, { wrapper: MemoryRouter },
    );
    await waitFor(() => { userEvent.type(screen.getByTestId(/username/i), 'Gergő'); });
    await waitFor(() => { userEvent.type(screen.getByTestId(/email/i), 'valami@valami.hu'); });
    await waitFor(() => { userEvent.type(screen.getByTestId('newpassword'), '12345678'); });
    await waitFor(() => { userEvent.type(screen.getByPlaceholderText(/Adja meg újra a jelszót/i), '12345679'); });
    await waitFor(() => { userEvent.click(screen.getByTestId('update-button')); });

    await waitFor(() => { expect((screen.getByTestId('update-button')).disabled).toBe(true); });
    await waitFor(() => { expect(screen.queryByTestId('register-button')).not.toBeInTheDocument(); });
    await waitFor(() => { expect(screen.getByText('A megadott jelszópár nem azonos!')).toBeInTheDocument(); });
    await waitFor(() => { expect(mockSave).toHaveBeenCalledTimes(0); });
  });
});

describe('POPUP-MODAL in frontend-ProfileForm component', () => {
  test('if form VALID & click UPDATE-BTN >>CONFIRM-popup with PWD-FIELD & DISABLED CONFIRM-BTN appear', async () => {
    const mockSave = jest.fn(() => {
      return { status: 200 };
    });
    const loggedInUser = jest.fn(() => {
      return { name: 'jani', email: 'jani@jani.hu' };
    });
    const setLoggedInUser = jest.fn(() => {
      return { loggedInUser: { name: 'gaborka', email: 'gaborka@gaborka.hu' } };
    });
    const mockLoggedInUserContext = jest.fn(() => {
      return { loggedInUser, setLoggedInUser };
    });

    render(
      <ProfileForm fetchFn={mockSave} loggedInUserContextFn={mockLoggedInUserContext} />, { wrapper: MemoryRouter },
    );
    await waitFor(() => { userEvent.type(screen.getByTestId(/username/i), 'Gergő'); });
    await waitFor(() => { userEvent.click(screen.getByTestId('update-button')); });
    await waitFor(() => { expect(screen.getByTestId('confirmation-popup')).toBeInTheDocument(); });
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Aktuális jelszó a megerősítéshez./i)).toBeInTheDocument();
    });
    await waitFor(() => { expect(screen.getByText(/Megerősítés!/i)).toBeInTheDocument(); });
    await waitFor(() => { expect((screen.getByTestId('register-button')).disabled).toBe(true); });
  });

  test('if form VALID & click UPDT-BTN > CONFRM-popup appear > fill PWD-FIELD >> CONFRM-BTN get ENABLED', async () => {
    const mockSave = jest.fn(() => {
      return { status: 200 };
    });
    const loggedInUser = jest.fn(() => {
      return { name: 'jani', email: 'jani@jani.hu' };
    });
    const setLoggedInUser = jest.fn(() => {
      return { loggedInUser: { name: 'gaborka', email: 'gaborka@gaborka.hu' } };
    });
    const mockLoggedInUserContext = jest.fn(() => {
      return { loggedInUser, setLoggedInUser };
    });

    render(
      <ProfileForm fetchFn={mockSave} loggedInUserContextFn={mockLoggedInUserContext} />, { wrapper: MemoryRouter },
    );
    await waitFor(() => { userEvent.type(screen.getByTestId(/username/i), 'Gergő'); });
    await waitFor(() => { userEvent.click(screen.getByTestId('update-button')); });

    await waitFor(() => { expect(screen.getByTestId('confirmation-popup')).toBeInTheDocument(); });
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Aktuális jelszó a megerősítéshez./i)).toBeInTheDocument();
    });
    await waitFor(() => { expect(screen.getByText(/Megerősítés!/i)).toBeInTheDocument(); });

    await waitFor(() => {
      userEvent.type(screen.getByPlaceholderText('Aktuális jelszó a megerősítéshez.'), '12345678');
    });
    await waitFor(() => { expect((screen.getByTestId('register-button')).disabled).toBe(false); });
  });

  it('should ALLOW SUBM > click CONFRM-BTN > after fill the CURRENT-PWD field >> SUCC-MSG should appear', async () => {
    const mockSave = jest.fn((result) => {
      return { status: 200, ...result };
    });
    const mockGetDataFromToken = jest.fn((token) => {
      return {
        name: 'gaborka', email: 'gaborka@gaborka.hu', _id: 'cDSVvjsdjiau3huas', ...token,
      };
    });
    const loggedInUser = jest.fn(() => {
      return { name: 'jani', email: 'jani@jani.hu' };
    });
    const setLoggedInUser = jest.fn(() => {
      return { loggedInUser: { name: 'gaborka', currentPassword: '12345678' } };
    });
    const mockLoggedInUserContext = jest.fn(() => {
      return { loggedInUser, setLoggedInUser };
    });

    render(
      <ProfileForm
        fetchFn={mockSave}
        loggedInUserContextFn={mockLoggedInUserContext}
        getDataFromTokenFn={mockGetDataFromToken}
      />, { wrapper: MemoryRouter },
    );
    await waitFor(() => { userEvent.type(screen.getByTestId(/username/i), 'gaborka'); });
    await waitFor(() => { userEvent.click(screen.getByTestId('update-button')); });
    await waitFor(() => {
      userEvent.type(screen.getByPlaceholderText('Aktuális jelszó a megerősítéshez.'), '12345678');
    });

    await waitFor(() => { expect((screen.getByTestId('register-button')).disabled).toBe(false); });
    await waitFor(() => { userEvent.click(screen.getByTestId('register-button')); });

    await waitFor(() => { expect(mockSave).toHaveBeenCalledTimes(1); });
    await waitFor(() => { expect(screen.getByText('Sikeres profil frissítés! :)')).toBeInTheDocument(); });
  });

  test('if CONFIRMATION-popup is CLOSING after SUCCESSFUL-SUBMIT', async () => {
    const mockSave = jest.fn((result) => {
      return { status: 200, ...result };
    });
    const mockGetDataFromToken = jest.fn((token) => {
      return {
        name: 'gaborka', email: 'gaborka@gaborka.hu', _id: 'cDSVvjsdjiau3huas', ...token,
      };
    });
    const loggedInUser = jest.fn(() => {
      return { name: 'jani', email: 'jani@jani.hu' };
    });
    const setLoggedInUser = jest.fn(() => {
      return { loggedInUser: { name: 'gaborka', currentPassword: '12345678' } };
    });
    const mockLoggedInUserContext = jest.fn(() => {
      return { loggedInUser, setLoggedInUser };
    });

    render(
      <ProfileForm
        fetchFn={mockSave}
        loggedInUserContextFn={mockLoggedInUserContext}
        getDataFromTokenFn={mockGetDataFromToken}
      />, { wrapper: MemoryRouter },
    );
    jest.useFakeTimers();
    await waitFor(() => { userEvent.type(screen.getByTestId(/username/i), 'gaborka'); });
    await waitFor(() => { userEvent.click(screen.getByTestId('update-button')); });
    await waitFor(() => {
      userEvent.type(screen.getByPlaceholderText('Aktuális jelszó a megerősítéshez.'), '12345678');
    });
    await waitFor(() => { userEvent.click(screen.getByTestId('register-button')); });

    await waitFor(() => { expect(screen.getByTestId('confirmation-popup')).toBeInTheDocument(); });
    await waitFor(() => { expect(screen.getByText('Sikeres profil frissítés! :)')).toBeInTheDocument(); });
    await waitFor(() => { expect(screen.queryByTestId('confirmation-popup')).not.toBeInTheDocument(); });
    await waitFor(() => { expect(screen.queryByText('Sikeres profil frissítés! :)')).not.toBeInTheDocument(); });
    await waitFor(() => {
      expect(screen.queryByPlaceholderText(/Aktuális jelszó a megerősítéshez./i)).not.toBeInTheDocument();
    });
    jest.useRealTimers();
  });
});
