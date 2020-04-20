import React from 'react';
import { render } from '@testing-library/react';
import { Auth0Provider } from 'react-auth0-spa'
import App from './App';

jest.mock('react-auth0-spa');

test('renders without crashing', () => {
  (Auth0Provider as jest.Mock).mockReturnValue(
    <div></div>
  );

  render(<App />);
});
