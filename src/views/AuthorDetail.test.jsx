import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Routes from '../Routes';

const { act } = renderer;

function TestRouter({ path }) {
  return (
    <MemoryRouter initialEntries={[path]}>
      <Routes />
    </MemoryRouter>
  );
}

const authorResponse = {
  data: {
    type: 'authors',
    id: '1',
    attributes: {
      firstName: 'Joanne',
      lastName: 'Rowling',
      birthDate: '1965-07-31',
      imageUrl: 'https://res.cloudinary.com/dee8jw8ue/image/upload/v1623992961/descarga_puc6lu.jpg',
    },
  },
};

describe('AuthorDetail', () => {
  describe('when user is not logged in', () => {
    beforeEach(() => {
      fetch.resetMocks();
    });

    it('renders the author data along with their books', async () => {
      let testRenderer;

      fetch.mockResponse(JSON.stringify(authorResponse));
      // After first render and useEffect execution
      // Which in turn calls setLoading(true)
      // Therefore it triggers a second render
      act(() => {
        testRenderer = renderer.create(<TestRouter path="/authors/1" />);
      });

      // fetch is async so we need to wait for it to finish
      // No need to write a body for the function inside act
      await act(async () => {});

      const tree = testRenderer.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
