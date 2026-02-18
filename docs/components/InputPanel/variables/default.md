[**fast-exponentiation**](../../../README.md)

***

[fast-exponentiation](../../../modules.md) / [components/InputPanel](../README.md) / default

# Variable: default

> `const` **default**: `React.FC`\<[`InputPanelProps`](../interfaces/InputPanelProps.md)\>

Defined in: [components/InputPanel.tsx:50](https://github.com/zamilbahri/fast-exponentiation/blob/2f701d9f8fc562ad36c98cda95b2538a8f67e6b6/src/components/InputPanel.tsx#L50)

Renders input fields for the three parameters of modular exponentiation.

## Param

The component props

## Example

```ts
// Renders input panel with callbacks
<InputPanel
  a="2"
  n="23"
  m="100"
  onAChange={setA}
  onNChange={setN}
  onMChange={setM}
  error=""
/>
```
