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

test('renders url and likes when the button is pressed, and hides when pressed again', () => {
  const component = render(<Blog blog={blog} />);

  const button = component.getByText('view');
  expect(button).toBeDefined();
  fireEvent.click(button);
  expect(component.container).toHaveTextContent('Testing blog');
  expect(component.container).toHaveTextContent('Cris');
  expect(component.container).toHaveTextContent('wwww.wwww');
  expect(component.container).toHaveTextContent('0');
});

test('if the like button is clicked twice, the event handler is called twice', () => {
  const mockHandler = jest.fn();
  const component = render(
    <Blog blog={blog} likeBlog={mockHandler} />
  );

  const button = component.getByText('view');
  expect(button).toBeDefined();
  fireEvent.click(button);
  const likeButton = component.getByText('like');
  expect(likeButton).toBeDefined();
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);
  expect(mockHandler.mock.calls).toHaveLength(2);
});

test('if the hide button is clicked, you can see the url and likes', () => {
  const component = render(<Blog blog={blog} />);

  const button = component.getByText('view');
  expect(button).toBeDefined();
  fireEvent.click(button);
  expect(component.container).toHaveTextContent('Testing blog');
  expect(component.container).toHaveTextContent('Cris');
  expect(component.container).toHaveTextContent('wwww.wwww');
  expect(component.container).toHaveTextContent('0');
  const hideButton = component.getByText('hide');
  expect(hideButton).toBeDefined();
  fireEvent.click(hideButton);
  expect(component.container).toHaveTextContent('Testing blog');
  expect(component.container).toHaveTextContent('Cris');
  expect(component.container).not.toHaveTextContent('wwww.wwww');
  expect(component.container).not.toHaveTextContent('0');
});
