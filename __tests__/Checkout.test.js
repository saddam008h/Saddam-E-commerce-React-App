/**
 * @file Checkout.test.js
 * @description Unit tests for the Checkout page component using React Testing Library and Jest.
 * 
 * These tests cover the following scenarios:
 * 1. Rendering the Checkout page heading.
 * 2. Rendering the empty cart message when no items are in the cart.
 * 3. Disabling the submit button when form fields are empty.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; // Import configureStore from redux-mock-store
import Checkout from '../src/pages/Checkout';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore(); // Create a mock store

describe('Checkout', () => {
  test('renders heading', () => {
    render(
      <Router>
        <Provider store={mockStore({})}>
          <Checkout />
        </Provider>
      </Router>
    );
    expect(screen.getByText(/Checkout/i)).toBeInTheDocument();
  });

  test('renders empty cart message when no items are in the cart', () => {
    render(
      <Router>
        <Provider store={mockStore({ handleCart: [] })}> {/* Pass an empty array for an empty cart */}
          <Checkout />
        </Provider>
      </Router>
    );
    expect(screen.getByText(/No item in Cart/i)).toBeInTheDocument();
  });

  

  test('disables submit button when form fields are empty', () => {
    render(
      <Router>
        <Provider store={mockStore({ handleCart: [{ id: 1, name: 'Product 1', price: 10, qty: 1 }] })}> {/* Pass an empty array for an empty cart */}
          <Checkout />
        </Provider>
      </Router>
    );
    const submitButton = screen.getByText(/Continue to checkout/i);
    expect(submitButton).toBeDisabled();
  });

  // Additional tests for form validation, user interaction, etc. can be added here

});
