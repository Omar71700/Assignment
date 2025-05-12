import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookingForm from '../components/BookingForm';

describe('BookingForm', () => {
  test('renders all form fields', () => {
    render(<BookingForm />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of people/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^date$/i)).toBeInTheDocument(); // Exact match for Date label
    expect(screen.getByLabelText(/^time$/i)).toBeInTheDocument(); // Exact match for Time label
    expect(screen.getByLabelText(/special requests/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /book table/i })).toBeInTheDocument();
  });

  test('shows validation errors for empty required fields', async () => {
    render(<BookingForm />);
    fireEvent.click(screen.getByRole('button', { name: /book table/i }));

    expect(await screen.findByText(/full name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email address is required/i)).toBeInTheDocument();
    expect(screen.getByText(/phone number is required/i)).toBeInTheDocument();
    expect(screen.getByText(/date is required/i)).toBeInTheDocument();
    expect(screen.getByText(/time is required/i)).toBeInTheDocument();
  });

  test('shows validation error for invalid email format', async () => {
    render(<BookingForm />);
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByRole('button', { name: /book table/i }));

    expect(await screen.findByText(/email address is invalid/i)).toBeInTheDocument();
  });

  test('shows validation error for number of people less than 1', async () => {
    render(<BookingForm />);
    fireEvent.change(screen.getByLabelText(/number of people/i), { target: { value: '0' } });
    fireEvent.click(screen.getByRole('button', { name: /book table/i }));

    expect(await screen.findByText(/number of people must be at least 1/i)).toBeInTheDocument();
  });

  test('submits the form and shows success message when all fields are valid', async () => {
    render(<BookingForm />);

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/number of people/i), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText(/^date$/i), { target: { value: '2025-12-31' } });
    fireEvent.change(screen.getByLabelText(/^time$/i), { target: { value: '18:00' } });
    fireEvent.change(screen.getByLabelText(/special requests/i), { target: { value: 'Window seat please.' } });

    fireEvent.click(screen.getByRole('button', { name: /book table/i }));

    await waitFor(() => {
      expect(screen.getByText(/your table has been booked successfully!/i)).toBeInTheDocument();
    });

    // Check if form fields are cleared
    expect(screen.getByLabelText(/full name/i)).toHaveValue('');
    expect(screen.getByLabelText(/email address/i)).toHaveValue('');
    expect(screen.getByLabelText(/phone number/i)).toHaveValue('');
    // Number input defaults to string value when cleared by setting state to '' then back to number type
    // So we check against its default value or an empty string if that's how it behaves
    const peopleInput = screen.getByLabelText(/number of people/i);
    expect(['1', ''].includes(peopleInput.value)).toBe(true);
    expect(screen.getByLabelText(/^date$/i)).toHaveValue('');
    expect(screen.getByLabelText(/^time$/i)).toHaveValue('');
    expect(screen.getByLabelText(/special requests/i)).toHaveValue('');
  });
});
