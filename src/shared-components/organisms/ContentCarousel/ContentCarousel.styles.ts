import styled from 'styled-components';
import { Carousel } from '@mantine/carousel';

export const StyledCarousel = styled(Carousel)`
  /* Root styles */
  padding-bottom: 30px; // Space for indicators
  scroll-margin-top: 58px; // Account for sticky headers when scrolling into view

  /* Slide container */
  .mantine-Carousel-container {
    align-items: flex-start; // Important for AutoHeight plugin
  }

  /* Next/Previous Controls */
  .mantine-Carousel-control {
    background-color: rgba(0, 0, 0, 0.7);
    border: none;
    color: white;
    border-radius: 50%;
    width: 30px;
    height: 30px;

    &[data-inactive] {
      opacity: 0.3;
      cursor: default;
    }

    &:not([data-inactive]):hover {
      background-color: rgba(0, 0, 0, 0.9);
    }
  }

  /* Indicators */
  .mantine-Carousel-indicators {
    bottom: 10px; // Position indicators below the slides
  }

  .mantine-Carousel-indicator {
    width: 8px;
    height: 8px;
    background-color: rgba(0, 0, 0, 0.3);
    transition: width 250ms ease;

    &[data-active] {
      width: 16px;
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
`;

export const CarouselSlideContent = styled.div`
    /* Add specific styling for the content within each slide if needed */
    /* For example, ensuring it takes full height or has padding */
    height: 100%;
    display: flex;
    flex-direction: column;
`; 