# Design Guide: AI Brain Garden Sales Pitch

## Overall Design Philosophy
- Modern, clean, and professional
- High contrast for readability
- Generous whitespace
- Smooth transitions and animations
- Consistent visual hierarchy
- Interactive elements that enhance understanding

## Color Palette
```css
:root {
  /* Primary Colors */
  --primary-blue: #0066FF;      /* Main brand color */
  --primary-purple: #6B46C1;    /* Secondary brand color */
  
  /* Accent Colors */
  --accent-green: #38A169;      /* Success, growth, positive metrics */
  --accent-orange: #DD6B20;     /* Warnings, important notes */
  --accent-red: #E53E3E;        /* Critical points, problems to solve */
  
  /* Background Colors */
  --bg-light: #F7FAFC;         /* Main background */
  --bg-dark: #1A202C;          /* Dark sections */
  --bg-gradient: linear-gradient(135deg, var(--primary-blue), var(--primary-purple));
  
  /* Text Colors */
  --text-primary: #2D3748;     /* Main text */
  --text-secondary: #4A5568;   /* Secondary text */
  --text-light: #EDF2F7;      /* Text on dark backgrounds */
}
```

## Typography
- **Primary Font**: 'Inter' for clean, modern text
- **Secondary Font**: 'JetBrains Mono' for code blocks
- **Hierarchy**:
  - H1: 3rem (48px), bold, with gradient background
  - H2: 2.25rem (36px), semibold
  - H3: 1.875rem (30px), medium
  - Body: 1.125rem (18px), regular
  - Code: 1rem (16px), monospace

## Component-Specific Design

### Navigation
- Sticky sidebar with smooth scroll
- Visual indicators for current section
- Collapsible subsections
- Progress indicator
- Hover effects with subtle scaling

### Mermaid Diagrams
- Custom theme matching color palette
- Animated entry (fade + slide)
- Interactive hover states
- Responsive sizing
- Optional dark/light modes

### Code Blocks
- Syntax highlighting with custom theme
- Copy button with animation
- Line numbers
- Highlighted lines for emphasis
- Collapsible for long snippets

### Quotes and Testimonials
- Card-based design
- Subtle shadow
- Avatar/icon for source
- Social media icons where applicable
- Hover lift effect

## Animations and Transitions

### Page Load
```typescript
// Example animation sequence
const pageLoadSequence = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  }
};
```

### Section Transitions
- Fade in on scroll
- Parallax effects for backgrounds
- Staggered animation for list items
- Smooth color transitions
- Progressive loading of complex diagrams

### Interactive Elements
- Hover: Scale 1.02 + subtle shadow
- Click: Quick scale down + ripple
- Focus: Glowing outline
- Loading: Subtle pulse animation

## Layout Guidelines

### Section Headers
- Full-width gradient backgrounds
- Large, bold typography
- Icon or illustration
- Subtle pattern overlays
- Parallax scrolling effect

### Content Blocks
- Max-width: 800px for readability
- Generous padding: 2rem (32px)
- Card-based layout for examples
- Two-column layout for comparison sections
- Responsive grid for feature lists

### Diagrams and Illustrations
- SVG-based for scalability
- Consistent style across all graphics
- Animated entry and hover states
- Interactive elements where applicable
- Responsive sizing with aspect ratio lock

## Interactive Features

### Scroll-Based Animations
- Progressive reveal of complex diagrams
- Parallax backgrounds
- Sticky section headers
- Progress indicators
- Animated statistics

### Hover States
- Info tooltips
- Expanded explanations
- Related content preview
- Quick navigation options
- Visual feedback

### Click Interactions
- Expandable code examples
- Modal deep-dives
- Interactive diagrams
- Copy-to-clipboard
- Share options

## Accessibility Considerations
- High contrast options
- Keyboard navigation
- Screen reader optimizations
- Motion reduction settings
- Focus indicators

## Responsive Design
- Fluid typography
- Collapsible navigation on mobile
- Stackable layouts
- Optimized images
- Touch-friendly interactions

## Loading and Performance
- Progressive loading
- Lazy-loaded images
- Preloaded critical content
- Optimized animations
- Cached resources

## Icons and Graphics
- Custom icon set for:
  - Navigation items
  - Feature highlights
  - Process steps
  - Status indicators
  - Action buttons
- Consistent stroke width
- Matching color palette
- Scalable SVG format
- Optional animations

## Special Components

### Process Flows
- Connected steps with animations
- Progress indicators
- Interactive checkpoints
- Visual feedback
- Status updates

### Comparison Sections
- Side-by-side layouts
- Before/After sliders
- Highlight differences
- Interactive toggles
- Visual differentiators

### Feature Highlights
- Card-based design
- Icon + title + description
- Hover animations
- Quick action buttons
- Status indicators

## Implementation Notes
- Use Framer Motion for animations
- Implement CSS Grid for layouts
- Utilize CSS Custom Properties for theming
- Progressive enhancement approach
- Mobile-first responsive design
- Modular component structure
- Reusable animation variants
- Consistent spacing system
- Performance monitoring
- Accessibility testing 