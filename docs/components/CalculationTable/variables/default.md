[**fast-exponentiation**](../../../README.md)

***

[fast-exponentiation](../../../modules.md) / [components/CalculationTable](../README.md) / default

# Variable: default

> `const` **default**: `React.FC`\<[`CalculationTableProps`](../interfaces/CalculationTableProps.md)\>

Defined in: [components/CalculationTable.tsx:42](https://github.com/zamilbahri/fast-exponentiation/blob/2f701d9f8fc562ad36c98cda95b2538a8f67e6b6/src/components/CalculationTable.tsx#L42)

Renders a table showing all steps of the fast exponentiation calculation.

## Param

The component props

## Example

```ts
// Display calculation steps for exponent 23 (binary 10111)
<CalculationTable
  bits={[1, 0, 1, 1, 1]}
  steps={[
    { bit: 1, value: 2, operation: 'a = 2' },
    { bit: 0, value: 4, operation: '(2)² mod 100' },
    // ... more steps
  ]}
/>
```
