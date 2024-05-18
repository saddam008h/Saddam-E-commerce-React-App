/**
 * @file PageNotFound.test.js
 * @description Unit tests for the PageNotFound component using React Testing Library and Jest.
 * 
 * These tests cover the following scenarios:
 * 1. Rendering the PageNotFound component and ensuring the heading "404: Page Not Found" is present.
 * 2. Checking if the link to go back to the home page is rendered with the correct text and href attribute.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PageNotFound from '../src/pages/PageNotFound';
import '@testing-library/jest-dom/extend-expect';

describe('PageNotFound', () => {
  test('renders heading', () => {
    render(
      <Router>
        <PageNotFound />
      </Router>
    );
    expect(screen.getByText(/404: Page Not Found/i)).toBeInTheDocument();
  });

  test('renders link to go back to home page', () => {
    render(
      <Router>
        <PageNotFound />
      </Router>
    );
    const linkElement = screen.getByText(/Go Back to Home/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute('href')).toEqual('/');
  });
});
