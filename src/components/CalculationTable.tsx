/**
 * Calculation Table Component
 *
 * Displays a detailed step-by-step table showing how the fast exponentiation
 * algorithm processes each bit of the exponent. For each bit, shows the bit value,
 * the resulting value, and the operation performed.
 */

import React from 'react';
import type { CalculationStep } from '../types';
import MathText from './MathText';

/**
 * Props for the CalculationTable component
 * @interface CalculationTableProps
 * @property {number[]} bits - Array of binary digits (0 or 1) of the exponent
 * @property {CalculationStep[]} steps - Array of calculation steps with values and operations
 * @property {string} m - The modulus value used in the operations (mod m)
 */
export interface CalculationTableProps {
  bits: number[];
  steps: CalculationStep[];
  m: string;
}

/**
 * Renders a table showing all steps of the fast exponentiation calculation.
 *
 * @param {CalculationTableProps} props - The component props
 *
 * @example
 * // Display calculation steps for exponent 23 (binary 10111)
 * <CalculationTable
 *   bits={[1, 0, 1, 1, 1]}
 *   steps={[
 *     { bit: 1, value: 2, operation: 'a = 2' },
 *     { bit: 0, value: 4, operation: '(2)² mod 100' },
 *     // ... more steps
 *   ]}
 * />
 */
const CalculationTable: React.FC<CalculationTableProps> = ({
  bits,
  steps,
  m,
}) => {
  const rowCount = Math.min(bits.length, steps.length);

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700 mb-8">
      <h2 className="text-xl font-semibold text-purple-300 mb-4">
        Fast Exponentiation Steps
      </h2>

      <div className="max-h-[50vh] overflow-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th
                scope="col"
                className="sticky top-0 left-0 z-20 bg-gray-800 px-4 py-3 text-left text-gray-400 font-medium border-r border-gray-700"
              >
                Bit
              </th>

              <th
                scope="col"
                className="sticky top-0 z-10 bg-gray-800 px-4 py-3 text-left text-gray-400 font-medium border-r border-gray-700"
              >
                Operation <MathText>{`(\\bmod ${m})`}</MathText>
              </th>

              <th
                scope="col"
                className="sticky top-0 z-10 bg-gray-800 px-4 py-3 text-left text-gray-400 font-medium"
              >
                Result
              </th>
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: rowCount }).map((_, idx) => {
              const bit = bits[idx];
              const step = steps[idx];

              return (
                <tr
                  key={idx}
                  className="border-b border-gray-700 last:border-b-0"
                >
                  <td className="sticky left-0 z-10 bg-gray-800 px-4 py-3 border-r border-gray-700">
                    <span
                      className={`inline-block px-3 py-1 rounded font-mono font-bold ${
                        bit === 1
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-700 text-gray-300'
                      }`}
                    >
                      <MathText>{String(bit)}</MathText>
                    </span>
                  </td>

                  <td className="px-4 py-3 text-gray-300 text-sm  border-r border-gray-700">
                    <MathText>{step.operation}</MathText>
                  </td>

                  <td className="px-4 py-3 text-white font-mono text-lg">
                    <MathText>{String(step.value)}</MathText>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalculationTable;
