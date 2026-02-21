/**
 * Fast Modular Exponentiation Calculator
 *
 * This application provides an interactive tool for calculating a^n (mod m) using
 * the fast exponentiation algorithm (also known as binary exponentiation or
 * exponentiation by squaring). The application visualizes each step of the algorithm,
 * showing the binary representation of the exponent and how values are computed.
 *
 * The fast exponentiation algorithm reduces time complexity from O(n) to O(log n)
 * by leveraging the binary representation of the exponent.
 */

import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import BinaryRepresentation from './components/BinaryRepresentation';
import CalculationTable from './components/CalculationTable';
import FinalResult from './components/FinalResult';
import AlgorithmExplanation from './components/AlgorithmExplanation';
import Footer from './components/Footer';
import {
  calculateFastExponentiation,
  validateAndParseInputs,
} from './utils/modularExponentiation';
import type { CalculationResult } from './types';

/**
 * Default input values used when the URL does not provide explicit parameters.
 *
 * These defaults define the calculator’s initial state on a “clean” load
 * (i.e., no `?a=...&n=...&m=...` in the URL), and act as the fallback values
 * returned by {@link readFromUrl}.
 *
 * Notes:
 * - Values are stored as strings because the UI inputs are controlled `<input>`s.
 * - Marked `as const` so each property is a string literal type and the object is
 *   deeply readonly, preventing accidental mutation.
 *
 * @example
 * // If the page is loaded without query params:
 * // /modexp
 * // then the initial inputs become:
 * // a="3", n="100", m="23"
 */
const DEFAULTS = { a: '3', n: '100', m: '23' } as const;

/**
 * Reads modular exponentiation inputs from the current page URL query string.
 *
 * The function looks for `a`, `n`, and `m` in `window.location.search`.
 * For each parameter:
 * - If the parameter is missing or is an empty/whitespace-only string, the
 *   corresponding value from {@link DEFAULTS} is used instead.
 *
 * This is intended to be used in a `useState` lazy initializer so values are read
 * once on initial load, enabling shareable, refresh-persistent inputs.
 *
 * Important:
 * - This function does not validate numeric correctness (e.g., non-integers,
 *   negative exponents, `m <= 0`, etc.). Validation should be performed by the
 *   app’s existing `validateInputs` logic.
 * - If `URLSearchParams` parsing fails for any reason, {@link DEFAULTS} is returned.
 *
 * @returns An object containing `{ a, n, m }` as strings suitable for controlled inputs.
 *
 * @example
 * // URL: /modexp?a=5&n=13&m=23
 * // returns: { a: "5", n: "13", m: "23" }
 *
 * @example
 * // URL: /modexp?a=&n=7
 * // returns: { a: "3", n: "7", m: "23" }  // a and m fall back to defaults
 */
const readFromUrl = (): { a: string; n: string; m: string } => {
  try {
    const sp = new URLSearchParams(window.location.search);

    const a = (sp.get('a') ?? '').trim();
    const n = (sp.get('n') ?? '').trim();
    const m = (sp.get('m') ?? '').trim();

    return {
      a: a !== '' ? a : DEFAULTS.a,
      n: n !== '' ? n : DEFAULTS.n,
      m: m !== '' ? m : DEFAULTS.m,
    };
  } catch {
    return { ...DEFAULTS };
  }
};

/**
 * Writes the given input values to the current page URL as query parameters,
 * without reloading the page.
 *
 * Behavior:
 * - Creates a new `URLSearchParams` instance and conditionally sets `a`, `n`, and `m`.
 * - Parameters are omitted when:
 *   - The value is empty/whitespace-only (treated as “unset”), and/or
 *   - The value equals the corresponding {@link DEFAULTS} value (to keep URLs clean).
 * - Updates the URL using `window.history.replaceState`, so the current history
 *   entry is replaced (typing doesn’t create a long back-button history).
 *
 * This is typically called from a debounced `useEffect` that watches input state.
 *
 * Important:
 * - This function is purely about URL state; it does not validate inputs.
 * - If any error occurs while constructing or writing the URL, the function
 *   fails silently (no throw), leaving the current URL unchanged.
 *
 * @param next - The next input state to persist to the URL.
 *
 * @example
 * writeToUrl({ a: "5", n: "13", m: "23" });
 * // URL becomes: /fast-exponentiation/?a=5&n=13  (m omitted if it matches DEFAULTS.m)
 *
 * @example
 * writeToUrl({ a: "", n: "", m: "" });
 * // URL becomes: /modexp  (no query string)
 */
const writeToUrl = (next: { a: string; n: string; m: string }): void => {
  try {
    const sp = new URLSearchParams();

    // Treat empty as “unset”; also omit defaults to keep URLs clean.
    if (next.a.trim() !== '' && next.a !== DEFAULTS.a) sp.set('a', next.a);
    if (next.n.trim() !== '' && next.n !== DEFAULTS.n) sp.set('n', next.n);
    if (next.m.trim() !== '' && next.m !== DEFAULTS.m) sp.set('m', next.m);

    const qs = sp.toString(); // toString() returns the query string without '?' [web:28]
    const newUrl = qs
      ? `${window.location.pathname}?${qs}`
      : window.location.pathname;

    // replaceState updates the current URL without a page reload [web:23]
    window.history.replaceState(null, '', newUrl); // replace instead of pushing history [web:23]
  } catch {
    // ignore
  }
};

/**
 * Main application component that orchestrates the fast exponentiation calculator.
 *
 * @example
 * // Renders the complete calculator interface
 * <App />
 */
const App: React.FC = () => {
  // Initialize input state from URL query parameters, falling back to defaults
  const [a, setA] = useState<string>(() => readFromUrl().a);
  const [n, setN] = useState<string>(() => readFromUrl().n);
  const [m, setM] = useState<string>(() => readFromUrl().m);

  const resetDefaults = React.useCallback(() => {
    setA(DEFAULTS.a);
    setN(DEFAULTS.n);
    setM(DEFAULTS.m);
  }, []);

  // Ref to hold the debounce timer ID for URL writing
  const writeTimer = React.useRef<number | null>(null);

  // Debounced effect to write input state to URL on changes
  useEffect(() => {
    if (writeTimer.current) window.clearTimeout(writeTimer.current);

    writeTimer.current = window.setTimeout(() => {
      writeToUrl({ a, n, m });
      writeTimer.current = null;
    }, 200);

    return () => {
      if (writeTimer.current) {
        window.clearTimeout(writeTimer.current);
        writeTimer.current = null;
      }
    };
  }, [a, n, m]);

  // Memoized validation of inputs, returning an error message or parsed values
  const { error, parsed } = useMemo(() => {
    return validateAndParseInputs(a, n, m);
  }, [a, n, m]);

  // Memoized calculation of the fast exponentiation steps, only when parsed inputs are valid
  const calculationSteps = useMemo<CalculationResult | null>(() => {
    if (!parsed) return null;
    return calculateFastExponentiation(parsed.a, parsed.n, parsed.m);
  }, [parsed]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-5xl mx-auto">
        <Header />

        <InputPanel
          a={a}
          n={n}
          m={m}
          onAChange={setA}
          onNChange={setN}
          onMChange={setM}
          onResetDefaults={resetDefaults}
          error={error}
        />

        {calculationSteps && !error && (
          <>
            <FinalResult a={a} n={n} m={m} result={calculationSteps.result} />
            <BinaryRepresentation
              n={n}
              binaryStr={calculationSteps.binaryStr}
              bitCount={calculationSteps.bits.length}
            />

            <CalculationTable
              bits={calculationSteps.bits}
              steps={calculationSteps.steps}
              m={m}
            />
          </>
        )}

        <AlgorithmExplanation />
        <Footer />
      </div>
    </div>
  );
};

export default App;
