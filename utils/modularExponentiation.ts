/**
 * Modular Exponentiation Utilities
 *
 * This module provides functions for calculating a^n (mod m) using the fast
 * exponentiation algorithm (also known as binary exponentiation). It includes
 * input validation and step-by-step calculation tracking for educational purposes.
 *
 * The fast exponentiation algorithm works by:
 * 1. Converting the exponent to binary
 * 2. Processing each bit from left to right
 * 3. For each bit: squaring the result, and multiplying by 'a' if bit is 1
 * 4. Taking modulo after each operation to keep numbers manageable
 *
 * Time Complexity: O(log n) where n is the exponent
 * Space Complexity: O(log n) for storing the binary representation
 */

import type { CalculationResult } from '../types';

/**
 * Validates input parameters for modular exponentiation.
 *
 * Checks that all inputs are valid non-negative integers within acceptable ranges
 * and that the modulus is positive. Provides clear error messages for invalid inputs.
 *
 * @param {string} a - Base value
 * @param {string} n - Exponent value
 * @param {string} m - Modulus value
 * @returns {string} Error message if validation fails, empty string if all inputs are valid
 *
 * @throws {string} Returns error message (not thrown as exception):
 *   - "All inputs must be valid integers" - if any input is not a valid integer
 *   - "All inputs must be non-negative" - if any input is negative
 *   - "All inputs must be less than 4096" - if any input exceeds the limit
 *   - "Modulus (m) must be greater than 0" - if modulus is zero
 *
 * @example
 * const error = validateInputs('2', '23', '100');
 * if (error) console.error(error);
 */
export const validateInputs = (a: string, n: string, m: string): string => {
  const aNum = parseInt(a);
  const nNum = parseInt(n);
  const mNum = parseInt(m);

  const exponentLimit = 2 ** 24; // Arbitrary limit to prevent excessive scrolling.

  if (isNaN(aNum) || isNaN(nNum) || isNaN(mNum)) {
    return 'All inputs must be valid integers';
  }
  if (aNum < 0 || nNum < 0 || mNum < 0) {
    return 'All inputs must be non-negative';
  }
  if (aNum >= exponentLimit || nNum >= exponentLimit || mNum >= exponentLimit) {
    return `All inputs must be less than ${exponentLimit}.`;
  }
  if (mNum === 0) {
    return 'Modulus (m) must be greater than 0';
  }
  return '';
};

/**
 * Calculates a^n (mod m) using the fast exponentiation algorithm.
 *
 * Implements binary exponentiation which reduces time complexity from O(n) to O(log n).
 * Returns detailed step-by-step results showing how the algorithm processes each bit
 * of the binary representation of the exponent.
 *
 * Algorithm:
 * 1. Convert exponent n to binary representation
 * 2. Initialize result with a (mod m)
 * 3. For each subsequent bit in the binary representation:
 *    - Always square the previous result (mod m)
 *    - If the current bit is 1, also multiply by a (mod m)
 * 4. Return the final result and all intermediate steps
 *
 * @param {number} a - Base value (0 <= a)
 * @param {number} n - Exponent value (0 <= n)
 * @param {number} m - Modulus value (m > 0)
 * @returns {CalculationResult} Object containing:
 *   - bits: Array of binary digits (0 or 1)
 *   - steps: Array of CalculationStep objects with value and operation description
 *   - binaryStr: String representation of the binary exponent
 *   - result: Final result of a^n mod m
 *
 * @example
 * const result = calculateFastExponentiation(2, 23, 100);
 * console.log(result.result); // 8
 * console.log(result.binaryStr); // "10111"
 * console.log(result.steps.length); // 5
 */
export const calculateFastExponentiation = (
  a: number,
  n: number,
  m: number,
): CalculationResult => {
  // Convert exponent n to binary representation
  const binaryStr = n.toString(2);
  const bits = binaryStr.split('').map((bit) => parseInt(bit));

  // Initialize calculation steps array
  const steps = [];
  // Start with a (mod m) for the first bit
  let currentValue = a % m;

  // Record the first step (leftmost bit)
  steps.push({
    bit: bits[0],
    value: currentValue,
    operation: `a = ${a}`,
  });

  // Process each remaining bit from left to right
  for (let i = 1; i < bits.length; i++) {
    const prevValue = currentValue;

    if (bits[i] === 0) {
      // Bit is 0: only square the previous result
      currentValue = (prevValue * prevValue) % m;
      steps.push({
        bit: bits[i],
        value: currentValue,
        operation: `(${prevValue})² mod ${m}`,
      });
    } else {
      // Bit is 1: square the previous result and multiply by a
      currentValue = (a * prevValue * prevValue) % m;
      steps.push({
        bit: bits[i],
        value: currentValue,
        operation: `(${prevValue})²⋅${a} mod ${m}`,
      });
    }
  }

  // Return all calculation details
  return {
    bits,
    steps,
    binaryStr,
    result: currentValue,
  };
};
