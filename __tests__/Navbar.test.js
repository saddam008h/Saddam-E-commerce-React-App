/**
 * These tests cover the following scenarios:
 * 1. Rendering the Navbar component and ensuring the main elements (logo, brand name, navigation links, and cart button) are present.
 * 2. Checking the cart item count in various states:
 *    - When the cart is empty.
 *    - When the cart contains one item.
 *    - When the cart contains five items (typical usage).
 *    - When the cart contains a large number of items (boundary value).
 * 
 * The tests use a mock Redux store to simulate different states of the cart.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Navbar from '../src/components/Navbar'; // Adjust the path as needed
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore([]);

describe('Navbar', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      handleCart: []
    });
  });

  test('renders Navbar component', () => {
    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );

    // Check for logo
    expect(screen.getByAltText('logo')).toBeInTheDocument();

    // Check for brand name
    expect(screen.getByText(/Saddam Ecommerce/i)).toBeInTheDocument();

    // Check for navigation links
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Products/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();

    // Check for Cart button with count 0
    expect(screen.getByText(/Cart \(0\)/i)).toBeInTheDocument();
  });

  test('shows correct cart item count when cart is empty', () => {
    store = mockStore({
      handleCart: []
    });

    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );

    // Check for cart item count
    expect(screen.getByText(/Cart \(0\)/i)).toBeInTheDocument();
  });

  test('shows correct cart item count when cart has one item', () => {
    store = mockStore({
      handleCart: [{ id: 1 }]
    });

    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );

    // Check for cart item count
    expect(screen.getByText(/Cart \(1\)/i)).toBeInTheDocument();
  });

  test('shows correct cart item count when cart has five items', () => {
    store = mockStore({
      handleCart: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
    });

    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );

    // Check for cart item count
    expect(screen.getByText(/Cart \(5\)/i)).toBeInTheDocument();
  });

  test('shows correct cart item count when cart has a large number of items', () => {
    const largeNumberOfItems = Array.from({ length: 100 }, (_, i) => ({ id: i + 1 }));
    store = mockStore({
      handleCart: largeNumberOfItems
    });

    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );

    // Check for cart item count
    expect(screen.getByText(/Cart \(100\)/i)).toBeInTheDocument();
  });
});
