/**
 * @file Cart.test.js
 * @description Unit tests for the Cart component.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import Cart from '../src/pages/Cart';
import { addCart, delCart } from '../src/redux/action';

// Configure mock Redux store
const mockStore = configureMockStore();
let store;

// Initial state of the Redux store
const initialState = {
  handleCart: [],
};

// State with filled cart items
const filledState = {
  handleCart: [
    { id: 1, title: 'Test Product 1', price: 100, qty: 2, image: 'image1.jpg' },
    { id: 2, title: 'Test Product 2', price: 200, qty: 1, image: 'image2.jpg' },
  ],
};

// Function to render component with Redux Provider
const renderWithRedux = (component, state = initialState) => {
  store = mockStore(state);
  return render(
    <Provider store={store}>
      <Router>{component}</Router>
    </Provider>
  );
};

// Test suite for Cart component
describe('Cart Component', () => {
  // Test: Renders empty cart message when cart is empty
  test('renders empty cart message when cart is empty', () => {
    renderWithRedux(<Cart />);
    expect(screen.getByText(/Your Cart is Empty/i)).toBeInTheDocument();
    expect(screen.getByText(/Continue Shopping/i)).toBeInTheDocument();
  });

  // Test: Renders cart items when cart is not empty
  test('renders cart items when cart is not empty', () => {
    renderWithRedux(<Cart />, filledState);
    expect(screen.getByText(/Test Product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Product 2/i)).toBeInTheDocument();
  });

  // Test: Increments item quantity when "+" button is clicked
  test('increments item quantity when "+" button is clicked', () => {
    renderWithRedux(<Cart />, filledState);
    fireEvent.click(screen.getByTestId('button-plus-1'));
    const actions = store.getActions();
    expect(actions).toEqual([addCart(filledState.handleCart[0])]);
  });

  // Test: Decrements item quantity when "-" button is clicked
  test('decrements item quantity when "-" button is clicked', () => {
    renderWithRedux(<Cart />, filledState);
    fireEvent.click(screen.getByTestId('button-minus-1'));
    const actions = store.getActions();
    expect(actions).toEqual([delCart(filledState.handleCart[0])]);
  });

  // Test: Removes item from cart when quantity reaches 0
  test('removes item from cart when quantity reaches 0', () => {
    const stateWithOneItem = {
      handleCart: [{ id: 1, title: 'Test Product 1', price: 100, qty: 1, image: 'image1.jpg' }],
    };
    renderWithRedux(<Cart />, stateWithOneItem);
    fireEvent.click(screen.getByTestId('button-minus-1'));
    const actions = store.getActions();
    expect(actions).toEqual([delCart(stateWithOneItem.handleCart[0])]);
  });

  // Test: Displays correct subtotal and total amount
  test('displays correct subtotal and total amount', () => {
    renderWithRedux(<Cart />, filledState);
    expect(screen.getByText(/Products \(3\)/i)).toBeInTheDocument();
    expect(screen.getByText('$400')).toBeInTheDocument(); // subtotal
    expect(screen.getByText('$430')).toBeInTheDocument(); // total amount with shipping
  });

  // Test: Navigates to checkout page when "Go to checkout" button is clicked
  test('navigates to checkout page when "Go to checkout" button is clicked', () => {
    renderWithRedux(<Cart />, filledState);
    expect(screen.getByText(/Go to checkout/i).closest('a')).toHaveAttribute('href', '/checkout');
  });

  // Test: Renders product images correctly
  test('renders product images correctly', () => {
    renderWithRedux(<Cart />, filledState);
    expect(screen.getByAltText(/Test Product 1/i)).toHaveAttribute('src', 'image1.jpg');
    expect(screen.getByAltText(/Test Product 2/i)).toHaveAttribute('src', 'image2.jpg');
  });

  // Test: Renders continue shopping button
  test('renders continue shopping button', () => {
    renderWithRedux(<Cart />, initialState);
    expect(screen.getByText(/Continue Shopping/i).closest('a')).toHaveAttribute('href', '/');
  });
});
