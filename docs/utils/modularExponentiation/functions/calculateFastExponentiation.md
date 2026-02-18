[**fast-exponentiation**](../../../README.md)

***

[fast-exponentiation](../../../modules.md) / [utils/modularExponentiation](../README.md) / calculateFastExponentiation

# Function: calculateFastExponentiation()

> **calculateFastExponentiation**(`a`, `n`, `m`): [`CalculationResult`](../../../types/interfaces/CalculationResult.md)

Defined in: [utils/modularExponentiation.ts:93](https://github.com/zamilbahri/fast-exponentiation/blob/2f701d9f8fc562ad36c98cda95b2538a8f67e6b6/src/utils/modularExponentiation.ts#L93)

Calculates a^n (mod m) using the fast exponentiation algorithm.

Implements binary exponentiation which reduces time complexity from O(n) to O(log n).
Returns detailed step-by-step results showing how the algorithm processes each bit
of the binary representation of the exponent.

Algorithm:
1. Convert exponent n to binary representation
2. Initialize result with a (mod m)
3. For each subsequent bit in the binary representation:
   - Always square the previous result (mod m)
   - If the current bit is 1, also multiply by a (mod m)
4. Return the final result and all intermediate steps

## Parameters

### a

`number`

Base value (0 <= a)

### n

`number`

Exponent value (0 <= n)

### m

`number`

Modulus value (m > 0)

## Returns

[`CalculationResult`](../../../types/interfaces/CalculationResult.md)

Object containing:
  - bits: Array of binary digits (0 or 1)
  - steps: Array of CalculationStep objects with value and operation description
  - binaryStr: String representation of the binary exponent
  - result: Final result of a^n mod m

## Example

```ts
const result = calculateFastExponentiation(2, 23, 100);
console.log(result.result); // 8
console.log(result.binaryStr); // "10111"
console.log(result.steps.length); // 5
```
