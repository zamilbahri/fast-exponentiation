[**fast-exponentiation**](../../README.md)

***

[fast-exponentiation](../../modules.md) / [types](../README.md) / CalculationResult

# Interface: CalculationResult

Defined in: [types/index.ts:55](https://github.com/zamilbahri/fast-exponentiation/blob/2f701d9f8fc562ad36c98cda95b2538a8f67e6b6/src/types/index.ts#L55)

Complete result of the fast exponentiation calculation.

Contains all the information needed to understand and visualize how the
fast exponentiation algorithm computed a^n (mod m).

 CalculationResult

## Example

```ts
{
 *   bits: [1, 0, 1, 1, 1],
 *   steps: [
 *     { bit: 1, value: 2, operation: "a = 2" },
 *     { bit: 0, value: 4, operation: "(2)² mod 100" },
 *     // ... more steps
 *   ],
 *   binaryStr: "10111",
 *   result: 8
 * }
```

## Properties

### binaryStr

> **binaryStr**: `string`

Defined in: [types/index.ts:58](https://github.com/zamilbahri/fast-exponentiation/blob/2f701d9f8fc562ad36c98cda95b2538a8f67e6b6/src/types/index.ts#L58)

String representation of the exponent in binary (e.g., "10111")

***

### bits

> **bits**: `number`[]

Defined in: [types/index.ts:56](https://github.com/zamilbahri/fast-exponentiation/blob/2f701d9f8fc562ad36c98cda95b2538a8f67e6b6/src/types/index.ts#L56)

Array of binary digits (0 or 1) representing the exponent

***

### result

> **result**: `number`

Defined in: [types/index.ts:59](https://github.com/zamilbahri/fast-exponentiation/blob/2f701d9f8fc562ad36c98cda95b2538a8f67e6b6/src/types/index.ts#L59)

The final result: a^n mod m

***

### steps

> **steps**: [`CalculationStep`](CalculationStep.md)[]

Defined in: [types/index.ts:57](https://github.com/zamilbahri/fast-exponentiation/blob/2f701d9f8fc562ad36c98cda95b2538a8f67e6b6/src/types/index.ts#L57)

Array of calculation steps, one per bit plus initial step
