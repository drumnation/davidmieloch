```md
# AI-Native Interview Challenge: Site Reliability Engineer

## Overview

In this challenge, you'll design and implement a system to handle concurrent edits and maintain data consistency across clients for a real-time collaboration tool. This scenario is core to the role of a Site Reliability Engineer with a focus on AI and ML systems.

### Challenge Parameters
- **AI Maturity Level:** Intermediate
- **Format:** Pair-programming
- **Time Limit:** 4 hours
- **AI Tools Allowed:** No
- **Team AI Fluency:** Novice

## Challenge Description

Your task is to design a system that can handle concurrent edits from multiple clients in real-time, ensuring that all clients always have a consistent view of the data. The system should handle network errors and latency issues gracefully, providing a smooth user experience. 

## Implementation Requirements

- Design a conflict resolution strategy for concurrent edits
- Implement a mechanism to maintain data consistency across clients
- Design and implement a retry mechanism for handling network errors
- Optimize the system for minimal latency
- Implement logging and monitoring to track system performance and errors
- Include tests for key components of the system

## Evaluation Rubric

### Technical Implementation (40%)
- **Excellent (35-40)**: The system effectively handles concurrent edits and maintains data consistency across clients. The implementation is highly optimized for minimal latency and includes a robust retry mechanism for handling network errors. The system includes comprehensive logging and monitoring to track performance and errors.
- **Good (25-34)**: The system mostly handles concurrent edits and maintains data consistency, but there may be minor issues. The implementation includes a retry mechanism and some optimization for latency, but these could be improved. There is some logging and monitoring, but it may not cover all relevant aspects.
- **Satisfactory (15-24)**: The system handles concurrent edits and maintains data consistency, but there are noticeable issues. The retry mechanism and latency optimization need improvement. Logging and monitoring are limited.
- **Needs Improvement (0-14)**: The system has difficulty handling concurrent edits and maintaining data consistency. The retry mechanism and latency optimization are inadequate or missing. Logging and monitoring are minimal or absent.

### System Design & Architecture (30%)
- **Excellent (25-30)**: The system design is thoughtful and highly effective, taking into account all key aspects of the challenge. Architecture decisions are well-justified and contribute to the robustness and scalability of the solution.
- **Good (18-24)**: The system design is solid and mostly effective, but there may be minor issues or oversights. Architecture decisions are generally well-justified.
- **Satisfactory (10-17)**: The system design is adequate but could be improved in several ways. Some architecture decisions may not be well-justified.
- **Needs Improvement (0-9)**: The system design is flawed or incomplete. Architecture decisions are poorly justified or don't make sense.

### Communication & Documentation (30%)
- **Excellent (25-30)**: Exceptional documentation explaining design decisions, system architecture, and error handling strategies. Includes detailed README, inline comments where appropriate, and clear commit messages.
- **Good (18-24)**: Good documentation with clear README and explanation of major design decisions. Some discussion of error handling and system architecture.
- **Satisfactory (10-17)**: Basic documentation that covers setup and usage but lacks depth on design decisions or system architecture.
- **Needs Improvement (0-9)**: Minimal or missing documentation. Hard to understand code structure or design decisions.

## Interviewer Notes

### Key Questions to Ask

1. "Walk me through your system design. How did you decide on this architecture?"
2. "How did you approach the problem of concurrent edits and data consistency? What alternatives did you consider?"
3. "How did you handle network errors and latency issues? How did you test these aspects?"
4. "Can you explain your logging and monitoring setup? How would you use this information in a real-world scenario?"
5. "If you had more time, what additional features or improvements would you make?"

### Red Flags

- Unable to explain parts of their own code or design decisions
- System struggles with concurrent edits or data consistency
- Inadequate handling of network errors or latency issues
- Lack of thorough logging or monitoring
- Not considering edge cases, error states, or user experience

### Green Flags

- Clear, thoughtful system design and architecture
- Effective handling of concurrent edits and data consistency
- Robust approach to network errors and latency, with a good retry mechanism
- Comprehensive logging and monitoring setup
- Consideration of edge cases, error states, and user experience
- Bonus points for additional features or enhancements that weren't explicitly required
```