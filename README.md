# Fast Modular Exponentiation

An interactive calculator that demonstrates the fast exponentiation algorithm for computing a^n (mod m).

## Algorithm Steps

- Convert the exponent to binary representation
- Start with the leftmost bit, initialize result as a
- For each subsequent bit:
  - If bit is 0: square the previous result (mod m)
  - If bit is 1: multiply a by the square of previous result (mod m)
- Take modulo after each operation to keep values manageable
- Final result is a^n (mod m)
- This reduces O(n) operations to O(log n) operations
