[**fast-exponentiation**](../../README.md)

***

[fast-exponentiation](../../modules.md) / [types](../README.md) / CalculationStep

# Interface: CalculationStep

Defined in: [types/index.ts:25](https://github.com/zamilbahri/fast-exponentiation/blob/2f701d9f8fc562ad36c98cda95b2538a8f67e6b6/src/types/index.ts#L25)

Represents a single step in the fast exponentiation calculation.

Each step corresponds to processing one bit of the exponent's binary representation.

 CalculationStep

## Example

```ts
{
 *   bit: 1,
 *   value: 8,
 *   operation: "2 × (4)² mod 100"
 * }
```

## Properties

### bit

> **bit**: `number`

Defined in: [types/index.ts:26](https://github.com/zamilbahri/fast-exponentiation/blob/2f701d9f8fc562ad36c98cda95b2538a8f67e6b6/src/types/index.ts#L26)

The binary digit being processed (0 or 1)

***

### operation

> **operation**: `string`

Defined in: [types/index.ts:28](https://github.com/zamilbahri/fast-exponentiation/blob/2f701d9f8fc562ad36c98cda95b2538a8f67e6b6/src/types/index.ts#L28)

Human-readable description of the operation performed

***

### value

> **value**: `number`

Defined in: [types/index.ts:27](https://github.com/zamilbahri/fast-exponentiation/blob/2f701d9f8fc562ad36c98cda95b2538a8f67e6b6/src/types/index.ts#L27)

The result value after this step's operation
