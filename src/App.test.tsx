import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import * as React from 'react'
import { App } from './App'

test('mounted text', () => {
  const { getByTestId } = render(<App></App>)
  expect(getByTestId('text')).toHaveTextContent('hello world.')
})
