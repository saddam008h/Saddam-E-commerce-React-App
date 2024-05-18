/**
 * @file AboutPage.test.js
 * @description Unit tests for the AboutPage component using React Testing Library and Jest.
 * 
 * These tests cover the following scenarios:
 * 1. Rendering the AboutPage component and ensuring the main content is present.
 * 
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutPage from '../src/pages/AboutPage'; // Adjust the path as needed
import '@testing-library/jest-dom/extend-expect';

describe('AboutPage', () => {
  test('renders main content', () => {
    render(<AboutPage />);

    // Check for heading
    expect(screen.getByText(/About Us/i)).toBeInTheDocument();

    // Check for paragraph content
    expect(screen.getByText(/Lorem ipsum/i)).toBeInTheDocument();

    // Check for products section
    expect(screen.getByText(/Our Products/i)).toBeInTheDocument();

    // Check for individual product cards
    expect(screen.getByText(/Men's Clothing/i)).toBeInTheDocument();
    expect(screen.getByText(/Women's Clothing/i)).toBeInTheDocument();
    expect(screen.getByText(/Jewelery/i)).toBeInTheDocument();
    expect(screen.getByText(/Electronics/i)).toBeInTheDocument();
  });
});
