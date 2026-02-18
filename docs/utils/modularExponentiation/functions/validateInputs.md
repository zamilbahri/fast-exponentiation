[**fast-exponentiation**](../../../README.md)

***

[fast-exponentiation](../../../modules.md) / [utils/modularExponentiation](../README.md) / validateInputs

# Function: validateInputs()

> **validateInputs**(`a`, `n`, `m`): `string`

Defined in: [utils/modularExponentiation.ts:41](https://github.com/zamilbahri/fast-exponentiation/blob/2f701d9f8fc562ad36c98cda95b2538a8f67e6b6/src/utils/modularExponentiation.ts#L41)

Validates input parameters for modular exponentiation.

Checks that all inputs are valid non-negative integers within acceptable ranges
and that the modulus is positive. Provides clear error messages for invalid inputs.

## Parameters

### a

`string`

Base value

### n

`string`

Exponent value

### m

`string`

Modulus value

## Returns

`string`

Error message if validation fails, empty string if all inputs are valid

## Throws

Returns error message (not thrown as exception):
  - "All inputs must be valid integers" - if any input is not a valid integer
  - "All inputs must be non-negative" - if any input is negative
  - "All inputs must be less than 4096" - if any input exceeds the limit
  - "Modulus (m) must be greater than 0" - if modulus is zero

## Example

```ts
const error = validateInputs('2', '23', '100');
if (error) console.error(error);
```
