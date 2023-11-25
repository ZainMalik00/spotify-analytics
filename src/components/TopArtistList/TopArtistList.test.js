import { render, screen } from '@testing-library/react';
import TopArtistList from './TopArtistList';

test('renders learn react link', () => {
  render(<TopArtistList />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
