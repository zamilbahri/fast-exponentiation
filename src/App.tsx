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
  validateInputs,
  calculateFastExponentiation,
} from './utils/modularExponentiation';
import type { CalculationResult } from './types';

const DEFAULTS = { a: '3', n: '100', m: '23' } as const;

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
  const [a, setA] = useState<string>(() => readFromUrl().a);
  const [n, setN] = useState<string>(() => readFromUrl().n);
  const [m, setM] = useState<string>(() => readFromUrl().m);

  const writeTimer = React.useRef<number | null>(null);

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

  // Validate inputs
  const error = useMemo<string>(() => {
    return validateInputs(a, n, m);
  }, [a, n, m]);

  // Calculate the fast exponentiation steps (only if valid)
  const calculationSteps = useMemo<CalculationResult | null>(() => {
    if (error) {
      return null;
    }

    const aNum = parseInt(a);
    const nNum = parseInt(n);
    const mNum = parseInt(m);

    return calculateFastExponentiation(aNum, nNum, mNum);
  }, [a, n, m, error]);

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
          error={error}
        />

        {calculationSteps && !error && (
          <>
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

            <FinalResult a={a} n={n} m={m} result={calculationSteps.result} />
          </>
        )}

        <AlgorithmExplanation />
        <Footer />
      </div>
    </div>
  );
};

export default App;
