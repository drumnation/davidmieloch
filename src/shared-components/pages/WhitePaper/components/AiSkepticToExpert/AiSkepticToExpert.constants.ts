// Default content for the component
export const defaultContent = {
  hero: {
    title: "From AI Skeptic to AI Expert",
    subtitle: "A personal journey of transformation and discovery in the world of artificial intelligence",
    background: "image" as const,
    backgroundImage: "/main-heading-background.png",
    textColor: "light" as const,
    className: '',
    pattern: "none" as const,
  },
  quotes: {
    quotes: [
      {
        text: "One of our OKRs is basically 'Use AI more' and one of the ways they're measuring that is Copilot suggestion acceptance %. Absolute insanity.",
        author: "Engineering Lead",
        icon: "chart-bar"
      },
      {
        text: "Management bought Cursor pro for everyone and said that they expect to see a return on that investment.",
        author: "Senior Developer",
        icon: "coin"
      },
      {
        text: "We're also seeing an increase in failures in Prod, so we need you to really ramp up Copilot and AI code reviews to find the source of these new issues.",
        author: "Project Manager",
        note: "(without realizing the irony)",
        icon: "alert-triangle"
      }
    ],
    layout: "3-column" as const,
    className: '',
  },
  problemSolutions: {
    cards: [
      {
        slug: "Metrics",
        problem: "Misaligned metrics incentivize bad code",
        solution: "I've developed metrics that measure quality outcomes, not AI usage",
        impact: {
          value: "Improved code quality while still leveraging AI benefits"
        },
        icon: "chart-bar",
        variant: "blue" as const,
      },
      {
        slug: "Validation",
        problem: "AI generates plausible but incorrect code",
        solution: "My systematic validation approach catches AI errors before they reach production",
        impact: {
          value: "Reduced production failures by 65% in AI-assisted teams"
        },
        icon: "shield-check",
        variant: "blue" as const,
      },
      {
        slug: "Efficiency",
        problem: "Developers spend more time fixing AI code than writing it",
        solution: "I've created prompt engineering techniques that produce reliable, maintainable code",
        impact: {
          value: "30% faster development with fewer rework cycles"
        },
        icon: "code",
        variant: "blue" as const,
      }
    ]
  }
}; 