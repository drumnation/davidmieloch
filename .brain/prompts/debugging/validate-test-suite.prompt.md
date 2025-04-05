## Test Process for AI Agent 🤖

1. Document Progress
- Create `./.brain/1-agent-smith/.testing/{xx}-testing-session.md`
- Track test strategy & outcomes

2. Test Implementation 

IF new test needed:
```ts
// Follow TDD cycle:
// 1. RED - Write failing test
// 2. GREEN - Minimal implementation
// 3. REFACTOR - Clean up
```

3. Run Single Test

IF .spec.ts file:
```bash
cd apps/testing-e2e
curl -s http://localhost:5178/health

IF unhealthy: pnpm run start:test-env
THEN: pnpm exec playwright test --headed file.spec.ts -g "test name"
```

IF .test.ts file:
```bash
cd apps/testing-unit-tests
pnpm exec jest file.test.ts -t "test name"
```

IF .test.ts file:
```bash
cd apps/testing-integration
pnpm exec jest file.test.ts -t "test name"
```

4. Debugging Flow
- Manual feature check
- Review screenshots/errors
- Verify testIDs
- Check API responses

5. Test Validation
IF test passes -> Run full file
IF file passes -> Run all tests

## Reference Rules

Read @playwright-test-writing.rules.ts for:
- Page Object patterns
- Test organization
- Component isolation
- Error handling

Read @jest.rules.ts for:
- Test Object Model usage
- Test data management  
- Mocking strategies
- Core testing patterns

Read @tdd.rules.ts for:
- Test-First development
- RED-GREEN-REFACTOR
- Test size guidelines
- Refactoring approach

Read @e2e-agent-debug-guide.rules.md for:
- Test instability
- API/Network issues

# 🔄 Context Monitor
When capacity near limit:
1. ✅ Finish task
2. 📋 Summarize
3. ⏸️ Signal handoff
> 💡 Awaiting handoff command