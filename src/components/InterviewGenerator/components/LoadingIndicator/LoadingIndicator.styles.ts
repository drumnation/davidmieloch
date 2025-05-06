import styled, { keyframes } from 'styled-components';

const boxGlow = keyframes`
  0%, 100% { box-shadow: 0 0 10px rgba(64, 156, 255, 0.4); }
  50% { box-shadow: 0 0 20px rgba(64, 156, 255, 0.7); }
`;

export const LoadingBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  border-radius: 8px;
  background-color: #333;
  color: white;
  margin: 1.5rem 0;
  text-align: center;
  animation: ${boxGlow} 2s ease-in-out infinite;
`;

const textPulse = keyframes`
  0%, 100% { opacity: 1; text-shadow: 0 0 4px #8882ff; }
  50%      { opacity: 0.8; text-shadow: 0 0 12px #8882ff; }
`;

export const LoadingText = styled.div`
  font-size: 1rem;
  line-height: 1.5;
  max-width: 600px;
  font-weight: 500;
  color: #fff;
  animation: ${textPulse} 1.8s ease-in-out infinite;
`;

export const ProgressContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin-top: 1.5rem;
  
  /* Override Mantine progress bar styles to improve appearance */
  .mantine-Progress-root {
    background: rgba(255, 255, 255, 0.2);
  }
  
  .mantine-Progress-bar {
    box-shadow: 0 0 8px rgba(136, 130, 255, 0.5);
  }
`;

export const StageLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &::before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #8882ff;
    margin-right: 8px;
    box-shadow: 0 0 6px #8882ff;
  }
`; 