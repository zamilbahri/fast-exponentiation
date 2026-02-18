[**fast-exponentiation**](../../../README.md)

***

[fast-exponentiation](../../../modules.md) / [components/MathText](../README.md) / default

# Variable: default

> `const` **default**: `React.FC`\<[`MathProps`](../interfaces/MathProps.md)\>

Defined in: [components/MathText.tsx:45](https://github.com/zamilbahri/fast-exponentiation/blob/2f701d9f8fc562ad36c98cda95b2538a8f67e6b6/src/components/MathText.tsx#L45)

Renders a LaTeX math expression using KaTeX.

Converts LaTeX math strings to rendered HTML using the KaTeX library,
with support for both inline and display (block) rendering modes.
Errors in LaTeX expressions are gracefully handled.

## Param

The component props

## Examples

```ts
// Inline math expression
<MathText>a^n \\bmod m</MathText>
```

```ts
// Display mode (centered block)
<MathText block>a^n \\equiv {result} \\pmod{m}</MathText>
```

```ts
// With custom styling
<MathText className="text-lg text-purple-400">2^{23}</MathText>
```
