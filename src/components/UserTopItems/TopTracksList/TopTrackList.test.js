import { render, screen } from '@testing-library/react';
import TopTrackList from './TopTrackList';

test('renders learn react link', () => {
  render(<TopTrackList />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
