
/**
 * Mathematical Validation System
 * Provides type-safe, mathematically proven validation functions
 */

import { requires, ensures } from './contracts';

/**
 * Natural number validation: n ∈ ℕ
 */
export function validateNaturalNumber(n: number): asserts n is number {
  requires(Number.isInteger(n), "Value must be an integer");
  requires(n >= 0, "Value must be non-negative");
  ensures(n >= 0 && Number.isInteger(n), "Result is a natural number");
}

/**
 * Positive integer validation: n ∈ ℤ⁺
 */
export function validatePositiveInteger(n: number): asserts n is number {
  requires(Number.isInteger(n), "Value must be an integer");
  requires(n > 0, "Value must be positive");
  ensures(n > 0 && Number.isInteger(n), "Result is a positive integer");
}

/**
 * Bounded range validation: n ∈ [min, max]
 */
export function validateRange(n: number, min: number, max: number): asserts n is number {
  requires(typeof n === 'number' && !isNaN(n), "Value must be a valid number");
  requires(min <= max, "Min must be less than or equal to max");
  requires(n >= min && n <= max, `Value must be between ${min} and ${max}`);
  ensures(n >= min && n <= max, "Result is within specified range");
}

/**
 * Non-empty string validation: s ∈ Σ⁺
 */
export function validateNonEmptyString(s: string): asserts s is string {
  requires(typeof s === 'string', "Value must be a string");
  requires(s.trim().length > 0, "String must not be empty");
  ensures(s.trim().length > 0, "Result is a non-empty string");
}

/**
 * Array validation with mathematical properties
 */
export function validateArray<T>(
  arr: T[], 
  predicate: (item: T) => boolean,
  description: string
): asserts arr is T[] {
  requires(Array.isArray(arr), "Value must be an array");
  requires(arr.every(predicate), `All array elements must satisfy: ${description}`);
  ensures(arr.every(predicate), "All elements satisfy the predicate");
}

/**
 * Date validation with temporal constraints
 */
export function validateFutureDate(date: string): asserts date is string {
  const parsedDate = new Date(date);
  requires(!isNaN(parsedDate.getTime()), "Date must be valid");
  requires(parsedDate > new Date(), "Date must be in the future");
  ensures(new Date(date) > new Date(), "Result is a future date");
}

/**
 * Percentage validation: p ∈ [0, 100]
 */
export function validatePercentage(p: number): asserts p is number {
  validateRange(p, 0, 100);
  ensures(p >= 0 && p <= 100, "Result is a valid percentage");
}
