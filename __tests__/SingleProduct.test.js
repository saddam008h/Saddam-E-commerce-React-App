/**
 * @fileoverview Test suite for the Product component in a React-Redux application.
 * 
 * This test suite covers the following scenarios for the Product component:
 * 1. Renders the "Add to Cart" button.
 * 2. Displays product details including title and price.
 * 3. Displays the product image correctly.
 * 4. Navigates to the cart when the "Go to Cart" button is clicked.
 * 5. Adds the product to the cart when the "Add to Cart" button is clicked.
 * 6. Displays a loading state initially.
 */


import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom'; // Import MemoryRouter instead of BrowserRouter
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Product from '../src/pages/Product';
import Cart from '../src/pages/Cart';

// Mock Redux store
const mockStore = configureMockStore();
const store = mockStore({});

// Mock the global fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ id: 1, title: 'Test Product 1', price: 100, qty: 1, image: 'image1.jpg' }), // Replace with mock product data
  })
);

describe('Product Component', () => {
  test('renders "Add to Cart" button', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/product/1']}>
          <Product />
        </MemoryRouter>
      </Provider>
    );

    // Expect "Add to Cart" button to be present
    await waitFor(() => {
      expect(screen.getByText('Add to Cart')).toBeInTheDocument();
    });
  });

  test('displays product details', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/product/1']}>
          <Product />
        </MemoryRouter>
      </Provider>
    );

    // Expect product title to be present
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });

    // Expect product price to be present
    await waitFor(() => {
      expect(screen.getByText('$100')).toBeInTheDocument();
    });

  });

  test('displays product image', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/product/1']}>
          <Product />
        </MemoryRouter>
      </Provider>
    );

    // Expect product image to be present
    await waitFor(() => {
      const img = screen.getByAltText('Test Product 1');
      expect(img).toHaveAttribute('src', 'image1.jpg');
    });
  });

  test('navigates to cart when "Go to Cart" button is clicked', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/product/1']}>
          <Routes>
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    // Expect "Go to Cart" button to be present and click it
    await waitFor(() => {
      const goToCartButton = screen.getByText('Go to Cart');
      fireEvent.click(goToCartButton);
    });

    // Expect to navigate to Cart page
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });
  });

  test('adds product to cart when "Add to Cart" button is clicked', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/product/1']}>
          <Product />
        </MemoryRouter>
      </Provider>
    );

    // Expect "Add to Cart" button to be present and click it
    await waitFor(() => {
      const addToCartButton = screen.getByText('Add to Cart');
      fireEvent.click(addToCartButton);
    });

    // Simulate adding to cart (adjust according to your cart implementation)
    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: 'ADDITEM',
      payload: { id: 1, title: 'Test Product 1', price: 100, qty: 1, image: 'image1.jpg' },
    });
  });

  test('displays loading state initially', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/product/1']}>
          <Product />
        </MemoryRouter>
      </Provider>
    );

    // Expect loading state to be present initially
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });
});



