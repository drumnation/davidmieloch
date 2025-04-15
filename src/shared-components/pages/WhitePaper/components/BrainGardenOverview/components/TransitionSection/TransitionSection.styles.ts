import styled from 'styled-components';

export const TransitionContainer = styled.section`
  padding: 2rem 2rem 4rem;
  background: #ffffff;
  position: relative;
  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  text-align: left;
  position: relative;
  z-index: 2;
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #ffffff;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const TransitionText = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 0;
  color: #000000;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const ActionButton = styled.a`
  display: inline-flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.15);
  color: #fff;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

export const ArrowIcon = styled.div`
  margin-left: 0.75rem;
  font-size: 1.25rem;
  transition: transform 0.3s ease;
  
  ${ActionButton}:hover & {
    transform: translateX(4px);
  }
`; 