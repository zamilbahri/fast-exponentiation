/**
 * Input Panel Component
 *
 * Provides an interactive form for users to input the base (a), exponent (n),
 * and modulus (m) values for the modular exponentiation calculation.
 * Includes input validation and error display.
 */

import React from 'react';

/**
 * Props for the InputPanel component
 * @interface InputPanelProps
 * @property {string} a - Current value of the base input
 * @property {string} n - Current value of the exponent input
 * @property {string} m - Current value of the modulus input
 * @property {(value: string) => void} onAChange - Callback when base input changes
 * @property {(value: string) => void} onNChange - Callback when exponent input changes
 * @property {(value: string) => void} onMChange - Callback when modulus input changes
 * @property {string} error - Error message to display (empty if no error)
 */
export interface InputPanelProps {
  a: string;
  n: string;
  m: string;
  onAChange: (value: string) => void;
  onNChange: (value: string) => void;
  onMChange: (value: string) => void;
  error: string;
}

/**
 * Renders input fields for the three parameters of modular exponentiation.
 *
 * @param {InputPanelProps} props - The component props
 *
 * @example
 * // Renders input panel with callbacks
 * <InputPanel
 *   a="2"
 *   n="23"
 *   m="100"
 *   onAChange={setA}
 *   onNChange={setN}
 *   onMChange={setM}
 *   error=""
 * />
 */
const InputPanel: React.FC<InputPanelProps> = ({
  a,
  n,
  m,
  onAChange,
  onNChange,
  onMChange,
  error,
}: InputPanelProps) => {
  /**
   * Creates an input change handler that only accepts numeric values.
   *
   * @param {(value: string) => void} setter - The state setter function to call with the new value
   * @returns {(e: React.ChangeEvent<HTMLInputElement>) => void} The change handler function
   */
  const handleInputChange =
    (
      setter: (value: string) => void,
    ): ((e: React.ChangeEvent<HTMLInputElement>) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === '' || /^\d+$/.test(value)) {
        setter(value);
      }
    };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-purple-300 font-semibold mb-2">
            Base (a)
          </label>
          <input
            type="text"
            value={a}
            onChange={handleInputChange(onAChange)}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter base"
          />
        </div>
        <div>
          <label className="block text-purple-300 font-semibold mb-2">
            Exponent (n)
          </label>
          <input
            type="text"
            value={n}
            onChange={handleInputChange(onNChange)}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter exponent"
          />
        </div>
        <div>
          <label className="block text-purple-300 font-semibold mb-2">
            Modulus (m)
          </label>
          <input
            type="text"
            value={m}
            onChange={handleInputChange(onMChange)}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter modulus"
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default InputPanel;
