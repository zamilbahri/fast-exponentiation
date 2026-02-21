/**
 * Final Result Component
 *
 * Displays the final result of the modular exponentiation calculation in a
 * prominent, highlighted way. Shows the mathematical equation a^n ≡ result (mod m).
 */

import React from 'react';
import MathText from './MathText';

/**
 * Props for the FinalResult component
 * @interface FinalResultProps
 * @property {string} a - The base value
 * @property {string} n - The exponent value
 * @property {string} m - The modulus value
 * @property {bigint} result - The calculated result (a^n mod m)
 */
export interface FinalResultProps {
  a: string;
  n: string;
  m: string;
  result: bigint;
}

/**
 * Renders the final result of the modular exponentiation calculation.
 *
 * @param {FinalResultProps} props - The component props
 *
 * @example
 * // Display result for 2^23 mod 100 = 8
 * <FinalResult a="2" n="23" m="100" result={8} />
 */
const FinalResult: React.FC<FinalResultProps> = ({
  a,
  n,
  m,
  result,
}: FinalResultProps) => {
  return (
    <div className="bg-linear-to-r from-purple-600/50 to-purple-800/50 rounded-xl p-8 shadow-2xl border border-purple-600 mask-b-to-85%">
      <div className="text-center">
        <p className="text-gray-300 text-lg mb-2">Final Result:</p>
        <div className="text-3xl font-bold text-purple-200">
          <MathText>{`${a}^{${n}} \\equiv ${result} \\pmod{${m}}`}</MathText>
        </div>
      </div>
    </div>
  );
};

export default FinalResult;
