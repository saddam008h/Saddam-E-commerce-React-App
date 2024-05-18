import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from '../src/components/Footer';

describe('Footer Component', () => {
  test(' Renders the footer container', () => {
    render(<Footer />);
    const footerContainer = screen.getByRole('contentinfo');
    expect(footerContainer).toBeInTheDocument();
  });

  test(' Renders the company logo', () => {
    render(<Footer />);
    const logo = screen.getByAltText('logo');
    expect(logo).toHaveAttribute('src', '/logo copy.png');
  });

  test(' Renders the company name and year', () => {
    render(<Footer />);
    const companyName = screen.getByText(/© 2023 Saddam Ecommerce, Inc/i);
    expect(companyName).toBeInTheDocument();
  });



  test(' Renders the SVG element', () => {
    render(<Footer />);
    const svgElement = screen.getByRole('img', { hidden: true });
    expect(svgElement).toHaveAttribute('width', '40');

  });
});
