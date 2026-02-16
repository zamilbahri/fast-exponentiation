/**
 * Algorithm Explanation Component
 *
 * Provides a user-friendly explanation of how the fast exponentiation algorithm works.
 * Lists the key steps and highlights the efficiency improvement from O(n) to O(log n).
 */

import React from 'react';
import MathText from './MathText';

/**
 * Renders an explanation of the fast exponentiation algorithm.
 *
 * @example
 * // Display algorithm explanation
 * <AlgorithmExplanation />
 */
const AlgorithmExplanation: React.FC = () => {
  return (
    <div className="mt-8 bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-semibold text-purple-300 mb-3">
        How It Works
      </h3>
      <ul className="text-gray-400 space-y-2 text-md">
        <li>1. Convert the exponent to binary representation</li>
        <li>
          2. Start with the leftmost bit, initialize result as{' '}
          <MathText>{'a'}</MathText>
        </li>
        <li>3. For each subsequent bit:</li>
        <li className="ml-6">
          • If bit is <MathText>{'0'}</MathText>: square the previous result{' '}
          <MathText>{'\\pmod{m}'}</MathText>
        </li>
        <li className="ml-6">
          • If bit is <MathText>{'1'}</MathText>: multiply{' '}
          <MathText>{'a'}</MathText> by the square of previous result{' '}
          <MathText>{'\\pmod{m}'}</MathText>
        </li>
      </ul>
      <p className="text-gray-400 text-md mt-4">
        This reduces <MathText>{'O(n)'}</MathText> operations to{' '}
        <MathText>{'O(\\log n)'}</MathText> operations
      </p>
    </div>
  );
};

export default AlgorithmExplanation;
