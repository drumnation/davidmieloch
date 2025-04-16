import styled from 'styled-components';

/**
 * Main container for the characteristic card
 */
export const CardContainer = styled.div`
  background: #14213d;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    
    &::before {
      transform: scaleX(1);
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #4361ee, #3a0ca3);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  @media (max-width: 767px) {
    padding: 1.5rem;
  }
  
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 1.5rem;
  }
  
  @media (prefers-reduced-motion: reduce) {
    transition: none !important;
    
    &:hover {
      transform: none !important;
      
      &::before {
        transform: none !important;
      }
    }
  }
  
  &:focus-visible {
    outline: 3px solid #4361ee;
    outline-offset: 2px;
  }
  
  @media print {
    page-break-inside: avoid;
    box-shadow: none !important;
    border: 1px solid #000;
    margin-bottom: 1rem;
    break-inside: avoid;
  }
  
  @media (forced-colors: active) {
    border: 1px solid CanvasText;
    box-shadow: none;
  }
  
  @media (prefers-color-scheme: dark) {
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    
    &:hover {
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.15);
      background-color: #1a2234;
    }
  }
`;

/**
 * Container for the icon
 */
export const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(67, 97, 238, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  color: #90cdf4;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid rgba(67, 97, 238, 0.3);
    box-sizing: border-box;
  }
  
  @media (max-width: 767px) {
    width: 60px;
    height: 60px;
    margin-bottom: 1rem;
  }
  
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 65px;
    height: 65px;
  }
  
  @media (prefers-reduced-motion: reduce) {
    transition: none !important;
  }
  
  @media print {
    border: 1px solid #000;
    background: none !important;
  }
  
  @media (forced-colors: active) {
    border: 1px solid CanvasText;
    background-color: Canvas;
  }
  
  ${CardContainer}:hover & {
    transform: scale(1.05);
    background: rgba(67, 97, 238, 0.25);
    box-shadow: 0 0 20px 5px rgba(67, 97, 238, 0.25);
  }
`;

/**
 * Title of the characteristic
 */
export const Title = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 0.75rem;
  
  @media (max-width: 767px) {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
  
  @media (forced-colors: active) {
    color: CanvasText;
  }
  
  @media print {
    color: #000 !important;
  }
`;

/**
 * Description of the characteristic
 */
export const Description = styled.div`
  font-size: 0.95rem;
  color: #a0aec0;
  line-height: 1.6;
  
  @media (max-width: 767px) {
    font-size: 0.9rem;
  }
  
  @media (forced-colors: active) {
    color: CanvasText;
  }
`; 