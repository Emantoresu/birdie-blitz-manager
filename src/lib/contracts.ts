
/**
 * Mathematical Contracts System
 * Provides formal verification through preconditions, postconditions, and invariants
 */

export class ContractViolationError extends Error {
  constructor(message: string, contractType: 'precondition' | 'postcondition' | 'invariant') {
    super(`Contract Violation (${contractType}): ${message}`);
    this.name = 'ContractViolationError';
  }
}

/**
 * Precondition: Mathematical assertion that must be true before function execution
 * ∀ args, P(args) → function can execute safely
 */
export function requires(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new ContractViolationError(message, 'precondition');
  }
}

/**
 * Postcondition: Mathematical assertion that must be true after function execution
 * ∀ result, Q(result) → function executed correctly
 */
export function ensures(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new ContractViolationError(message, 'postcondition');
  }
}

/**
 * Invariant: Mathematical property that remains true throughout execution
 * ∀ state, I(state) → system remains in valid state
 */
export function invariant(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new ContractViolationError(message, 'invariant');
  }
}

/**
 * Mathematical proof decorator for functions
 */
export function proof<T extends (...args: any[]) => any>(
  target: T,
  preconditions: Array<(args: Parameters<T>) => boolean>,
  postconditions: Array<(result: ReturnType<T>, args: Parameters<T>) => boolean>
): T {
  return ((...args: Parameters<T>): ReturnType<T> => {
    // Verify all preconditions: ∧ᵢ Pᵢ(args)
    preconditions.forEach((condition, index) => {
      requires(condition(args), `Precondition ${index + 1} failed`);
    });

    const result = target(...args);

    // Verify all postconditions: ∧ᵢ Qᵢ(result, args)
    postconditions.forEach((condition, index) => {
      ensures(condition(result, args), `Postcondition ${index + 1} failed`);
    });

    return result;
  }) as T;
}
