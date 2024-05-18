import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../src/components/HeroSection';

describe('Hero Section Component', () => {
  test('1. Renders the hero section', () => {
    render(<Home />);
    const heroSection = screen.getByRole('heading', { name: /easy shopping/i });
    expect(heroSection).toBeInTheDocument();
  });

  test('2. Renders the video element with correct attributes', () => {
    render(<Home />);
    const videoElement = screen.getByRole('video');
    expect(videoElement).toHaveAttribute('src', 'assets/man.mp4');
    expect(videoElement).toHaveAttribute('loop');
    expect(videoElement).toHaveAttribute('autoPlay');
 
  });

  test('3. Renders the card with text', () => {
    render(<Home />);
    const cardTitle = screen.getByText(/easy shopping/i);
    const cardText = screen.getByText(/This is a wider card with supporting text below/i);
    expect(cardTitle).toBeInTheDocument();
    expect(cardText).toBeInTheDocument();
  });

  test('4. Checks that video is styled correctly', () => {
    render(<Home />);
    const videoElement = screen.getByRole('video');
    expect(videoElement).toHaveStyle('object-fit: fill');
  });

  test('5. Ensures card has appropriate classes', () => {
    render(<Home />);
    const cardElement = screen.getByText(/easy shopping/i).closest('.card');
    expect(cardElement).toHaveClass('bg-dark', 'text-white', 'border-');
  });
});
