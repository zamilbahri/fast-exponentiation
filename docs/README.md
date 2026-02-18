**fast-exponentiation**

***

# Fast Modular Exponentiation

An interactive calculator that demonstrates the fast exponentiation algorithm for computing a^n (mod m).

### [Live Demo](https://zamilbahri.github.io/fast-exponentiation/)

## Algorithm Steps

1. Convert the exponent to binary representation
2. Start with the leftmost bit, initialize result as a
3. For each subsequent bit:
   - If bit is 0: square the previous result (mod m)
   - If bit is 1: multiply a by the square of previous result (mod m)
4. Take modulo after each operation to keep values manageable
5. Final result is a^n (mod m)

This reduces O(n) operations to O(log n) operations

## Related

Check out my [Chinese Remainder Theorem solver](https://github.com/zamilbahri/crt-solver)!
