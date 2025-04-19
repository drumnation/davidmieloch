import styled from 'styled-components';

// Styles for Bullet Points
export const BulletList = styled.div`
  margin-top: 12px;
  padding-left: 16px;
  padding-right: 16px;

  @media (max-width: 576px) {
    margin-bottom: 10px; // Keep existing bottom margin for mobile only
    padding-bottom: 15px; // Add padding to create ~25px total space (10+15)
  }
`;

export const BulletItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const BulletIconWrapper = styled.div`
  margin-right: 10px;
  margin-top: 2px; /* Adjust vertical alignment */
  flex-shrink: 0;
  color: #4a90e2; /* Default icon color, can be overridden */
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const BulletText = styled.div`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #333;
`; 