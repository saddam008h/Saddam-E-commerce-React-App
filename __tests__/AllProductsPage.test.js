/**
 * @file Products.test.js
 * @description This file contains test cases for the Products component to ensure it behaves as expected.
 * 
 * Test Descriptions:
 * 1. Displays loading skeleton initially
 * 2. Displays products after loading
 * 3. Displays product details
 * 4. Filters products by category (Men's Clothing)
 * 5. Displays all products when "All" filter is selected
 * 6. Filters products by electronics category
 * 7. Filters products by men category
 * 8. Filters products by women category
 * 9. Filters products by jewelery category
 * 10. Adds product to cart when "Add to Cart" button is clicked
 * 11. Navigates to product detail page when "Buy Now" button is clicked
 * 12. Displays correct product image
 */

import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Products from '../src/components/Products';

// Mock Redux store
const mockStore = configureMockStore();
const store = mockStore({});

// Mock the global fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { id: 1, title: 'Test Product 1', price: 100, description: 'Description 1', category: "men's clothing", image: 'image1.jpg' },
      { id: 2, title: 'Test Product 2', price: 150, description: 'Description 2', category: "women's clothing", image: 'image2.jpg' },
      { id: 3, title: 'Test Product 3', price: 200, description: 'Description 3', category: 'jewelery', image: 'image3.jpg' },
      { id: 4, title: 'Test Product 4', price: 250, description: 'Description 4', category: 'electronics', image: 'image4.jpg' },
    ]),
  })
);

describe('Products Component', () => {
  test('displays loading skeleton initially', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Products />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument();
  });

  test('displays products after loading', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Products />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Product 1...')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2...')).toBeInTheDocument();
    });
  });

  test('displays product details', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Products />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Product 1...')).toBeInTheDocument();
      expect(screen.getByText('Description 1...')).toBeInTheDocument();
    });
  });

  test('filters products by category', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Products />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Men's Clothing"));
    });

    await waitFor(() => {
      expect(screen.getByText('Test Product 1...')).toBeInTheDocument();
      expect(screen.queryByText('Test Product 2...')).not.toBeInTheDocument();
    });
  });

  test('displays all products when "All" filter is selected', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Products />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Men's Clothing"));
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText('All'));
    });

    await waitFor(() => {
      expect(screen.getByText('Test Product 1...')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2...')).toBeInTheDocument();
      expect(screen.getByText('Test Product 3...')).toBeInTheDocument();
      expect(screen.getByText('Test Product 4...')).toBeInTheDocument();
    });
  });

  test('filters products by electronics category', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Products />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText('Electronics'));
    });

    await waitFor(() => {
      expect(screen.getByText('Test Product 4...')).toBeInTheDocument();
      expect(screen.queryByText('Test Product 1...')).not.toBeInTheDocument();
    });
  });

  test('filters products by men category', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Products />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Men's Clothing"));
    });

    await waitFor(() => {
      expect(screen.getByText('Test Product 1...')).toBeInTheDocument();
      expect(screen.queryByText('Test Product 3...')).not.toBeInTheDocument();
    });
  });

  test('filters products by women category', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Products />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Women's Clothing"));
    });

    await waitFor(() => {
      expect(screen.getByText('Test Product 2...')).toBeInTheDocument();
      expect(screen.queryByText('Test Product 1...')).not.toBeInTheDocument();
    });
  });

  test('filters products by jewelery category', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Products />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText('Jewelery'));
    });

    await waitFor(() => {
      expect(screen.getByText('Test Product 3...')).toBeInTheDocument();
      expect(screen.queryByText('Test Product 1...')).not.toBeInTheDocument();
    });
  });

  test('adds product to cart when "Add to Cart" button is clicked', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Products />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const productCard = screen.getByText('Test Product 1...').closest('.product-card');
      fireEvent.click(within(productCard).getByText('Add to Cart'));
    });

    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: 'ADDITEM',
      payload: {"category": "men's clothing", "description": "Description 1", "id": 1, "image": "image1.jpg", "price": 100, "title": "Test Product 1"},
    });
  });

  test('navigates to product detail page when "Buy Now" button is clicked', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Products />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const productCard = screen.getByText('Test Product 1...').closest('.product-card');
      fireEvent.click(within(productCard).getByText('Buy Now'));
    });

    await waitFor(() => {
      expect(screen.getByText('Test Product 1...')).toBeInTheDocument();
    });
  });

  test('displays correct product image', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Products />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const img = screen.getByAltText('Test Product 1');
      expect(img).toHaveAttribute('src', 'image1.jpg');
    });
  });

 

});
