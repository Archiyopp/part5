import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddBlog from './addBlog';

test('<AddBlog /> form, inputs are defined, and events run', () => {
  const createBlog = jest.fn();
  const hideCreateForm = jest.fn();
  const component = render(
    <AddBlog
      createBlog={createBlog}
      hideCreateForm={hideCreateForm}
    />
  );

  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');
  const form = component.container.querySelector('form');
  expect(title).toBeDefined();
  expect(form).toBeDefined();
  expect(author).toBeDefined();
  expect(form).toBeDefined();
  expect(url).toBeDefined();

  fireEvent.change(title, {
    target: { value: 'testing of forms could be easier' },
  });
  fireEvent.change(author, {
    target: { value: 'Dan abramov' },
  });
  fireEvent.change(url, {
    target: { value: 'www.changemymidn' },
  });
  fireEvent.submit(form);
  console.log(createBlog.mock.calls[0][0]);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe(
    'testing of forms could be easier'
  );
  expect(createBlog.mock.calls[0][0].url).toBe('www.changemymidn');
  // expect(createBlog.mock.calls[0][0].author).toBe('Dan abramov');
});
