# Code Standards

## Component Modification Rules (MANDATORY)

### Before Modifying Components
1. **Impact Analysis**
   - Map all usages of the component across the codebase
   - Document all dependent components and features
   - Note any special cases or edge cases in current usage

2. **Type Safety**
   - Never remove or modify existing prop types without full impact analysis
   - All prop type changes must be backward compatible
   - Document type changes in component history

### During Modification
3. **Preserve Functionality**
   - Maintain all existing props and their functionality
   - Any prop removal/modification requires:
     - Full impact analysis
     - Migration plan
     - Team review
     - Update to all dependent components

4. **Testing Requirements**
   - Add tests for new functionality
   - Maintain existing test coverage
   - Add visual regression tests for UI changes
   - Test all variant combinations

5. **Documentation**
   - Update component documentation
   - Document breaking changes
   - Add migration guides if needed

### After Modification
1. **Verification**
   - Run full test suite
   - Check visual regression tests
   - Verify all dependent components
   - Review type safety

2. **Review Process**
   - Component changes require dedicated review
   - Include before/after snapshots
   - Document all prop changes
   - Provide test coverage report

## General Standards

## TypeScript Requirements
- Strict mode enabled
- No 'any' - use 'unknown'
- Readonly/immutable types preferred 
- Type guards over assertions
- Exhaustive checks with 'never'
- Generics for reusable code

## Naming
- PascalCase: Components, Types, Interfaces
- camelCase: Variables, Functions
- UPPER_CASE: Constants
- kebab-case: Files

## Component Structure
```typescript
./components/{ComponentName}/
  ├── {ComponentName}.tsx         # JSX/TSX
  ├── {ComponentName}.types.ts    # Types/interfaces
  ├── {ComponentName}.styles.ts   # Styled components
  ├── {ComponentName}.hook.ts     # Custom hooks
  ├── {ComponentName}.logic.ts    # Business logic
  ├── components/                 # Subcomponents
  │   └── index.ts               # Barrel exports
  └── index.ts                   # Main export
```

## Error Handling
- Error boundaries for component tree
- Try/catch for async operations
- User-friendly error messages
- Logging for debugging
- Edge case handling

## Performance
- Memoize expensive operations
- Prevent unnecessary rerenders
- Lazy load where appropriate
- Stable keys for lists
- Profile before optimizing

## Documentation 
- JSDoc for public APIs
- Props documentation
- Usage examples
- Changelog updates 
- Storybook stories

## Additional Coding Guidelines

### Functional Programming
- DRY: Avoid code duplication
- KISS: Keep code simple and focused
- YAGNI: Implement only essential features

### SOLID for FP
- Single Responsibility: One task per function
- Open/Closed: Extend through composition
- Liskov Substitution: Handle valid inputs consistently
- Interface Segregation: Minimal input requirements
- Dependency Inversion: Use higher-order functions

### Modular Design
- Pure, testable functions
- Function composition
- Separate side effects
- Immutable data handling

### Clean Code
- Descriptive naming
- Logical organization
- Prefer functional methods
- Minimize dependencies
- Self-documenting code