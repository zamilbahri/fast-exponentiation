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

import type { CalculationResult, ParsedInputs } from '../types';

const EXPONENT_LIMIT = 2n ** 24n;

/**
 * Checks whether a string consists of one or more ASCII decimal digits (`0`-`9`).
 *
 * @remarks
 * This function does not trim whitespace. Callers that accept user/URL input
 * should typically `trim()` first.
 *
 * @param s - The string to test.
 * @returns `true` if `s` matches `/^\d+$/`, otherwise `false`.
 *
 * @example
 * ```ts
 * isNonNegativeIntegerString("0");    // true
 * isNonNegativeIntegerString("123");  // true
 * isNonNegativeIntegerString("");     // false
 * isNonNegativeIntegerString(" 1 ");  // false (not trimmed)
 * isNonNegativeIntegerString("1.0");  // false
 * ```
 *
 * @public
 */
export function isNonNegativeIntegerString(s: string): boolean {
  return /^\d+$/.test(s);
}

/**
 * Strictly parses a non-negative base-10 integer string into a {@link bigint}.
 *
 * @remarks
 * This is intended for untrusted input (URL parameters, form fields, CSV cells).
 * It trims leading/trailing whitespace, then requires the remaining string to
 * contain only decimal digits. If validation passes, it converts using `BigInt`.
 *
 * @param input - Raw input string to parse.
 * @param fieldName - Name used in the thrown error message (e.g., `"m"`).
 * @returns The parsed {@link bigint}.
 *
 * @throws {@link Error} If `input.trim()` is not a non-negative integer string.
 * The message is `${fieldName} must be a non-negative integer.`
 *
 * @example
 * ```ts
 * parseBigIntStrict(" 0012 ", "a"); // 12n
 * parseBigIntStrict("0", "m");      // 0n
 * parseBigIntStrict("1.5", "n");    // throws Error: n must be a non-negative integer.
 * parseBigIntStrict("12abc", "a");  // throws Error: a must be a non-negative integer.
 * ```
 *
 * @public
 */
export function parseBigIntStrict(input: string, fieldName = 'value'): bigint {
  const s = input.trim();
  if (!isNonNegativeIntegerString(s)) {
    throw new Error(`${fieldName} must be a non-negative integer.`);
  }
  return BigInt(s);
}

/**
 * Validates and parses modular exponentiation inputs from raw strings.
 *
 * @remarks
 * This is a boundary function intended for UI and URL/querystring ingestion.
 * It converts raw strings into {@link bigint}s using {@link parseBigIntStrict},
 * then enforces cross-field rules such as an upper bound and `m > 0`.
 *
 * This function never throws; it converts thrown parse errors into a user-facing
 * error message and returns `parsed: null`.
 *
 * @param aRaw - Raw base value (string) for \(a\).
 * @param nRaw - Raw exponent value (string) for \(n\).
 * @param mRaw - Raw modulus value (string) for \(m\).
 * @returns An object containing:
 * - `error`: empty string when valid, otherwise a message suitable for UI.
 * - `parsed`: the parsed values when valid, otherwise `null`.
 *
 * @example
 * ```ts
 * const { error, parsed } = validateAndParseInputs("2", "23", "100");
 * if (!error && parsed) {
 *   // parsed.a === 2n, parsed.n === 23n, parsed.m === 100n
 * }
 * ```
 *
 * @public
 */
export function validateAndParseInputs(
  aRaw: string,
  nRaw: string,
  mRaw: string,
): { error: string; parsed: ParsedInputs | null } {
  try {
    const a = parseBigIntStrict(aRaw, 'a');
    const n = parseBigIntStrict(nRaw, 'n');
    const m = parseBigIntStrict(mRaw, 'm');

    if (a >= EXPONENT_LIMIT || n >= EXPONENT_LIMIT || m >= EXPONENT_LIMIT) {
      return {
        error: `All inputs must be less than ${EXPONENT_LIMIT.toString()}.`,
        parsed: null,
      };
    }

    if (m === 0n) {
      return { error: 'Modulus (m) must be greater than 0', parsed: null };
    }

    return { error: '', parsed: { a, n, m } };
  } catch (e) {
    // Convert “throw” into an error string for UI. [web:201]
    const msg =
      e instanceof Error ? e.message : 'All inputs must be valid integers';
    return { error: msg, parsed: null };
  }
}

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
 * @param {bigint} a - Base value (0 <= a)
 * @param {bigint} n - Exponent value (0 <= n)
 * @param {bigint} m - Modulus value (m > 0)
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
  a: bigint,
  n: bigint,
  m: bigint,
): CalculationResult => {
  // Case n = 0: a^0 is always 1 (mod m)
  if (n === 0n) {
    return {
      bits: [0],
      steps: [
        {
          bit: 0,
          value: 1n % m,
          operation: 'a^0 = 1',
        },
      ],
      binaryStr: '0',
      result: 1n % m,
    };
  }

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
        operation: `${prevValue}^2`,
      });
    } else {
      // Bit is 1: square the previous result and multiply by a
      currentValue = (a * prevValue * prevValue) % m;
      steps.push({
        bit: bits[i],
        value: currentValue,
        operation: `${prevValue}^2 \\cdot ${a}`,
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
