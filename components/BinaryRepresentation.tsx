/**
 * Binary Representation Component
 *
 * Displays the binary representation of the exponent value, showing how many bits
 * are needed to represent the number in base 2. This visualization is key to
 * understanding the fast exponentiation algorithm.
 */

import React from 'react';

/**
 * Props for the BinaryRepresentation component
 * @interface BinaryRepresentationProps
 * @property {string} n - The decimal exponent value to display
 * @property {string} binaryStr - The binary representation of the exponent
 * @property {number} bitCount - The number of bits in the binary representation
 */
export interface BinaryRepresentationProps {
  n: string;
  binaryStr: string;
  bitCount: number;
}

/**
 * Renders the binary representation of the exponent.
 *
 * @param {BinaryRepresentationProps} props - The component props
 *
 * @example
 * // Display binary representation of 23
 * <BinaryRepresentation n="23" binaryStr="10111" bitCount={5} />
 */
const BinaryRepresentation: React.FC<BinaryRepresentationProps> = ({
  n,
  binaryStr,
  bitCount,
}: BinaryRepresentationProps) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700 mb-8">
      <h2 className="text-xl font-semibold text-purple-300 mb-4">
        Binary Representation of {n}
      </h2>
      <div className="flex items-center gap-2">
        <span className="text-gray-400">{n} =</span>
        <span className="text-2xl font-mono text-purple-400">
          ({binaryStr})₂
        </span>
        <span className="text-gray-400 ml-2">({bitCount} bits)</span>
      </div>
    </div>
  );
};

export default BinaryRepresentation;
