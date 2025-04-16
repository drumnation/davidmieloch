/**
 * Node positions for the characteristic cards grid
 * This helps maintain consistent layout across different screen sizes and device types
 */

export const characteristicGridPositions = {
  desktop: [
    { row: 1, column: 1 },
    { row: 1, column: 2 },
    { row: 2, column: 1 },
    { row: 2, column: 2 },
    { row: 3, column: 1 },
    { row: 3, column: 2 },
  ],
  tablet: [
    { row: 1, column: 1 },
    { row: 1, column: 2 },
    { row: 2, column: 1 },
    { row: 2, column: 2 },
    { row: 3, column: 1 },
    { row: 3, column: 2 },
  ],
  mobile: [
    { row: 1, column: 1 },
    { row: 2, column: 1 },
    { row: 3, column: 1 },
    { row: 4, column: 1 },
    { row: 5, column: 1 },
    { row: 6, column: 1 },
  ]
};

/**
 * Persona navigation grid positions
 */
export const personaNavPositions = {
  desktop: [
    { order: 1 },
    { order: 2 },
    { order: 3 },
    { order: 4 },
  ],
  mobile: [
    { order: 1 },
    { order: 2 },
    { order: 3 },
    { order: 4 },
  ]
};

/**
 * CTA section layout positions
 */
export const ctaPositions = {
  frameworks: { order: 1 },
  background: { order: 2 },
  connect: { order: 3 }
}; 