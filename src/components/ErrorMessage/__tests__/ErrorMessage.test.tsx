import { render, screen } from '@testing-library/react'
import ErrorMessage from '../ErrorMessage'

jest.mock('@heroicons/react/24/solid', () => ({
  ExclamationCircleIcon: () => <svg data-testid="exclamation-icon"></svg>
}))

describe('ErrorMessage Component', () => {
  it('renders without crashing', () => {
    render(<ErrorMessage>Error occurred</ErrorMessage>)
    expect(screen.getByText('Error occurred')).toBeInTheDocument()
  })

  it('displays the error icon', () => {
    render(<ErrorMessage>Error occurred</ErrorMessage>)
    expect(screen.getByTestId('exclamation-icon')).toBeInTheDocument()
  })

  it('renders children correctly', () => {
    render(<ErrorMessage>Error occurred</ErrorMessage>)
    expect(screen.getByText('Error occurred')).toBeInTheDocument()
  })
})