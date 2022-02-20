import { render, screen } from '@testing-library/react';
import { PostCard } from '.';

const props = {
  title: 'title 1',
  body: 'body 1',
  id: 1,
  cover: 'img/img.png',
};

describe('<PostCard />', () => {
  it('should render PostCard correctly', () => {
    render(<PostCard {...props} />);
    expect(screen.getByRole('img', { name: props.title })).toHaveAttribute('src', props.cover);
    expect(screen.getByRole('heading', { name: /title 1/i })).toBeInTheDocument();
    expect(screen.getByText('body 1')).toBeInTheDocument();
    expect(screen.getAllByAltText(/title 1/i));
  });
  it('should match snapshot', () => {
    const { container } = render(<PostCard {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
