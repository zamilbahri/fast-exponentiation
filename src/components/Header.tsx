/**
 * Header Component
 *
 * Displays the application title and brief description of what the calculator does.
 */

import React from 'react';
import MathText from './MathText';

/**
 * Renders the header section with title and description.
 *
 * @example
 * // Renders the header
 * <Header />
 */
const Header: React.FC = () => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-purple-600 mb-3">
        Fast Modular Exponentiation
      </h1>
      <p className="text-gray-400 text-lg">
        Calculate{' '}
        <MathText className="text-gray-300">{'a^n \\pmod{m}'}</MathText> using
        binary exponentiation
      </p>
    </div>
  );
};

export default Header;
