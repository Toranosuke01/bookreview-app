import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { LogInForm } from './LogInForm';
import { Provider } from 'react-redux';
import { store } from '../store';
import { MemoryRouter } from 'react-router-dom';

describe('LogInForm', () => {
  it('should render email and password input fields', () => {
    render(
    <Provider store={store}>
      <MemoryRouter>
        <LogInForm />
      </MemoryRouter>
    </Provider>
    );
    
    // メールアドレス入力欄が存在するかチェック
    const emailInput = screen.getByLabelText(/メールアドレス/i);
    expect(emailInput).toBeInTheDocument();

    // パスワード入力欄が存在するかチェック
    const passwordInput = screen.getByLabelText(/パスワード/i);
    expect(passwordInput).toBeInTheDocument();
  });
});
