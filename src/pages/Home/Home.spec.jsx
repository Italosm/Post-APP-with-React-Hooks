import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title1',
          body: 'body1',
          url: 'img1.jpg',
        },
        {
          userId: 2,
          id: 2,
          title: 'title2',
          body: 'body2',
          url: 'img1.jpg',
        },
        {
          userId: 3,
          id: 3,
          title: 'title3',
          body: 'body3',
          url: 'img3.jpg',
        },
        {
          userId: 4,
          id: 4,
          title: 'title4',
          body: 'body4',
          url: 'img4.jpg',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  it('should render search, posts and load more', async () => {
    render(<Home />);
    const loadingPosts = screen.getByText('Loading Posts');

    await waitForElementToBeRemoved(loadingPosts);

    expect.assertions(3);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img', { name: /title/i });
    expect(images).toHaveLength(3);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
  });
  it('should  search for posts', async () => {
    render(<Home />);
    const loadingPosts = screen.getByText('Loading Posts');

    await waitForElementToBeRemoved(loadingPosts);

    expect.assertions(14);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: '1 - title1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '2 - title2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '3 - title3' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '4 - title4' })).not.toBeInTheDocument();

    userEvent.type(search, 'title1');
    expect(screen.getByRole('heading', { name: 'Found: title1 in 1 results' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '1 - title1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '2 - title2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '3 - title3' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '4 - title4' })).not.toBeInTheDocument();

    userEvent.clear(search);
    expect(screen.getByRole('heading', { name: '1 - title1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '2 - title2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '3 - title3' })).toBeInTheDocument();

    userEvent.type(search, 'post does not exist');
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });
  it('should load more posts', async () => {
    render(<Home />);
    const loadingPosts = screen.getByText('Loading Posts');

    await waitForElementToBeRemoved(loadingPosts);

    const button = screen.getByRole('button', { name: /load more posts/i });
    userEvent.click(button);
    expect(button).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '4 - title4' })).toBeInTheDocument();
    expect(button).toBeDisabled;
  });
});
