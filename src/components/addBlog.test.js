import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddBlog from './addBlog';

test('<AddBlog /> form, inputs are defined, and events run', async () => {
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
  expect(author).toBeDefined();
  expect(url).toBeDefined();
  expect(form).toBeDefined();

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

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe(
    'testing of forms could be easier'
  );
  expect(createBlog.mock.calls[0][0].url).toBe('www.changemymidn');
  expect(createBlog.mock.calls[0][0].author).toBe('Dan abramov');
  await waitFor(() =>
    expect(hideCreateForm.mock.calls).toHaveLength(1)
  );
  expect(author).toBeEmptyDOMElement();
  expect(title).toBeEmptyDOMElement();
  expect(url).toBeEmptyDOMElement();
});
