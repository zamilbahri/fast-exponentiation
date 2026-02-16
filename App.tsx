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
import {
  validateInputs,
  calculateFastExponentiation,
} from './utils/modularExponentiation';
import type { CalculationResult } from './types';

/**
 * Main application component that orchestrates the fast exponentiation calculator.
 *
 * @example
 * // Renders the complete calculator interface
 * <App />
 */
const App: React.FC = () => {
  // Load initial values from localStorage or use defaults
  const [a, setA] = useState<string>(
    () => localStorage.getItem('modexp_a') || '3',
  );
  const [n, setN] = useState<string>(
    () => localStorage.getItem('modexp_n') || '100',
  );
  const [m, setM] = useState<string>(
    () => localStorage.getItem('modexp_m') || '23',
  );

  // Save to localStorage whenever values change
  useEffect(() => {
    localStorage.setItem('modexp_a', a);
  }, [a]);

  useEffect(() => {
    localStorage.setItem('modexp_n', n);
  }, [n]);

  useEffect(() => {
    localStorage.setItem('modexp_m', m);
  }, [m]);

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
      </div>
    </div>
  );
};

export default App;
