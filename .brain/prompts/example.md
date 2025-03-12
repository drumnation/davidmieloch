# Example Prompt

This is a sample prompt to test the sync-prompts command.

## Usage

```typescript
import { examplePrompt } from '@brain-garden/prompts';

// Use the prompt
const result = await examplePrompt.execute();
```

## Variables

- `${name}`: The name of the user
- `${date}`: The current date

## Example

Hello ${name}, today is ${date}! 