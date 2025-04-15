I want you to help me fix TypeScript errors in my codebase. Here's what I need you to do:

1. First, run a type check using the following command:
   ```bash
   pnpm tsc --noEmit
   ```

2. Review all TypeScript errors that appear in the output.

3. For each error:
   - Show me the exact error message
   - Identify the file and line number where the error occurs
   - Explain what's causing the error
   - Provide a solution to fix it
   - If multiple solutions are possible, explain the trade-offs of each approach

4. If you see patterns in the errors, suggest any global fixes or configurations that might help prevent similar issues in the future.

5. Pay special attention to:
   - Type definitions
   - Missing type declarations
   - Incorrect type assertions
   - Props typing in React components
   - Function parameter and return types
   - Generic type usage

Remember to maintain strict type checking and avoid using `any` type unless absolutely necessary. Use TypeScript's built-in utility types when appropriate.

After implementing the fixes, we should run the type check again to ensure all errors have been resolved.
