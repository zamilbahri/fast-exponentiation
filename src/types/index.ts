/**
 * Type Definitions
 *
 * This module contains TypeScript interfaces for type safety throughout the
 * fast exponentiation calculator application.
 */

/**
 * Represents a single step in the fast exponentiation calculation.
 *
 * Each step corresponds to processing one bit of the exponent's binary representation.
 *
 * @interface CalculationStep
 * @property {number} bit - The binary digit being processed (0 or 1)
 * @property {number} value - The result value after this step's operation
 * @property {string} operation - Human-readable description of the operation performed
 *
 * @example
 * {
 *   bit: 1,
 *   value: 8,
 *   operation: "2 × (4)² mod 100"
 * }
 */
export interface CalculationStep {
  bit: number;
  value: number;
  operation: string;
}

/**
 * Complete result of the fast exponentiation calculation.
 *
 * Contains all the information needed to understand and visualize how the
 * fast exponentiation algorithm computed a^n (mod m).
 *
 * @interface CalculationResult
 * @property {number[]} bits - Array of binary digits (0 or 1) representing the exponent
 * @property {CalculationStep[]} steps - Array of calculation steps, one per bit plus initial step
 * @property {string} binaryStr - String representation of the exponent in binary (e.g., "10111")
 * @property {number} result - The final result: a^n mod m
 *
 * @example
 * {
 *   bits: [1, 0, 1, 1, 1],
 *   steps: [
 *     { bit: 1, value: 2, operation: "a = 2" },
 *     { bit: 0, value: 4, operation: "(2)² mod 100" },
 *     // ... more steps
 *   ],
 *   binaryStr: "10111",
 *   result: 8
 * }
 */
export interface CalculationResult {
  bits: number[];
  steps: CalculationStep[];
  binaryStr: string;
  result: number;
}

/**
 * Input values for modular exponentiation.
 *
 * Represents the three parameters needed for the calculation: base (a),
 * exponent (n), and modulus (m).
 *
 * @interface ModularExpInput
 * @property {string} a - The base value as a string (will be parsed to integer)
 * @property {string} n - The exponent value as a string (will be parsed to integer)
 * @property {string} m - The modulus value as a string (will be parsed to integer)
 *
 * @example
 * {
 *   a: "2",
 *   n: "23",
 *   m: "100"
 * }
 */
export interface ModularExpInput {
  a: string;
  n: string;
  m: string;
}
