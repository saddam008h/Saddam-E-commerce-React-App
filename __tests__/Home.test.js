import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Home from '../src/pages/Home';

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

describe('Home Component', () => {
  test('renders HeroSection and Products components integration', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Easy Shopping/i)).toBeInTheDocument();
    expect(screen.getByText(/Latest Products/i)).toBeInTheDocument();
  });

  test('displays loading skeleton initially', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  test('displays products after loading', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Product 1...')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2...')).toBeInTheDocument();
    });
  });

  test('renders product details correctly', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Product 1...')).toBeInTheDocument();
      expect(screen.getByText('Description 1...')).toBeInTheDocument();
    });
  });

  test('filters products correctly', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
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
});
