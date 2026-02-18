[**fast-exponentiation**](../../README.md)

***

[fast-exponentiation](../../modules.md) / [types](../README.md) / ModularExpInput

# Interface: ModularExpInput

Defined in: [types/index.ts:80](https://github.com/zamilbahri/fast-exponentiation/blob/2f701d9f8fc562ad36c98cda95b2538a8f67e6b6/src/types/index.ts#L80)

Input values for modular exponentiation.

Represents the three parameters needed for the calculation: base (a),
exponent (n), and modulus (m).

 ModularExpInput

## Example

```ts
{
 *   a: "2",
 *   n: "23",
 *   m: "100"
 * }
```

## Properties

### a

> **a**: `string`

Defined in: [types/index.ts:81](https://github.com/zamilbahri/fast-exponentiation/blob/2f701d9f8fc562ad36c98cda95b2538a8f67e6b6/src/types/index.ts#L81)

The base value as a string (will be parsed to integer)

***

### m

> **m**: `string`

Defined in: [types/index.ts:83](https://github.com/zamilbahri/fast-exponentiation/blob/2f701d9f8fc562ad36c98cda95b2538a8f67e6b6/src/types/index.ts#L83)

The modulus value as a string (will be parsed to integer)

***

### n

> **n**: `string`

Defined in: [types/index.ts:82](https://github.com/zamilbahri/fast-exponentiation/blob/2f701d9f8fc562ad36c98cda95b2538a8f67e6b6/src/types/index.ts#L82)

The exponent value as a string (will be parsed to integer)
