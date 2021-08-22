import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import Blog from './Blog';
import React from 'react';

const blog = {
  author: 'Cris',
  title: 'Testing blog',
  url: 'wwwww.wwww',
  likes: 0,
};

test('renders title and author', () => {
  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent('Testing blog');
  expect(component.container).toHaveTextContent('Cris');
  expect(component.container).not.toHaveTextContent('wwww.wwww');

  const div = component.container.querySelector('.blog');
  expect(div).toHaveTextContent('Testing blog');
});

test('there is a button in the blog', () => {
  const component = render(<Blog blog={blog} />);

  const button = component.getByText('view');
  expect(button).toBeDefined();
});

test('renders url and likes when the button is pressed', () => {
  const component = render(<Blog blog={blog} />);

  const button = component.getByText('view');
  expect(button).toBeDefined();
  fireEvent.click(button);
  expect(component.container).toHaveTextContent('Testing blog');
  expect(component.container).toHaveTextContent('Cris');
  expect(component.container).toHaveTextContent('wwww.wwww');
  expect(component.container).toHaveTextContent('0');
});
