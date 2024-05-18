/**
 * @file ContactPage.test.js
 * @description Unit tests for the ContactPage component.
 * 
 * This file contains tests to ensure that the ContactPage component renders
 * correctly and that its main elements (form fields) are present and functional.
 * 
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactPage from '../src/pages/ContactPage'; // Adjust the path as needed
import '@testing-library/jest-dom/extend-expect';

/**
 * Describe block for ContactPage component tests.
 * @module ContactPageTest
 */

describe('ContactPage', () => {
  /**
   * Test to check if main form fields are rendered.
   * @function rendersMainFormFields
   * @memberof module:ContactPageTest
   * @inner
   * @returns {void}
   */
  test('renders main form fields', () => {
    render(<ContactPage />);

    // Check for heading
    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();

    // Check for form fields by label text
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();

    // Check for submit button by its content
    expect(screen.getByText(/Send/i)).toBeInTheDocument();
  });
});
