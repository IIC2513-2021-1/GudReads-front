import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import AuthContextProvider from '../contexts/AuthContext';
import Home from './Home';

function TestWrapper({ children, path }) {
  return (
    <MemoryRouter initialEntries={[path]}>
      <AuthContextProvider>
        {children}
      </AuthContextProvider>
    </MemoryRouter>
  );
}

const user = {
  firstName: 'Jalen',
  lastName: '87',
  email: 'Jalen83@gmail.com',
  access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIyLCJpYXQiOjE2MjU0OTk0ODEsImV4cCI6MTYyNTUwMTI4MX0.jXD-n92FpFo6zABoRykc8FdKcRoisKhUl0jcTPrc31E',
  token_type: 'Bearer',
};

const sessionExpiration = new Date(
  new Date().getTime() + 1000 * 60 * 60 * 24, // One day in the future
);

const localStorageMapping = {
  user,
  sessionExpiration,
};

describe('Home', () => {
  describe('when user is not logged in', () => {
    it('renders the home page with log in link', () => {
      const tree = renderer.create(<TestWrapper path="/"><Home /></TestWrapper>).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when user is logged in', () => {
    beforeEach(() => {
      global.Storage.prototype.getItem = jest.fn(
        (key) => JSON.stringify(localStorageMapping[key]),
      );
    });

    afterEach(() => {
      global.Storage.prototype.getItem.mockReset();
    });

    it('renders the home page with logout button', () => {
      const tree = renderer.create(<TestWrapper path="/"><Home /></TestWrapper>).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
