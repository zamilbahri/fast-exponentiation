/**
 * Algorithm Explanation Component
 *
 * Provides a user-friendly explanation of how the fast exponentiation algorithm works.
 * Lists the key steps and highlights the efficiency improvement from O(n) to O(log n).
 */

import React from 'react';

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
      <h3 className="text-lg font-semibold text-purple-300 mb-3">
        How It Works
      </h3>
      <ul className="text-gray-400 space-y-2 text-sm">
        <li>• Convert the exponent to binary representation</li>
        <li>• Start with the leftmost bit, initialize result as a</li>
        <li>• For each subsequent bit:</li>
        <li className="ml-6">
          - If bit is 0: square the previous result (mod m)
        </li>
        <li className="ml-6">
          - If bit is 1: multiply a by the square of previous result (mod m)
        </li>
        <li>• This reduces O(n) operations to O(log n) operations</li>
      </ul>
    </div>
  );
};

export default AlgorithmExplanation;
