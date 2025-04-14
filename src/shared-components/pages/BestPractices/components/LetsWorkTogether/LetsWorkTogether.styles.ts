import styled from 'styled-components';

export const LetsWorkTogetherContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  padding-bottom: 120px;
  
  @media (min-width: 768px) {
    padding: 0 24px;
    padding-bottom: 120px;
  }

  @media (min-width: 1024px) {
    padding: 0 32px;
    padding-bottom: 120px;
  }
`;

export const SectionWrapper = styled.section`
  margin-top: 80px;
  padding-top: 60px;
  border-top: 1px solid #e0e0e0;
  position: relative;
`;

export const SectionLabel = styled.div`
  position: absolute;
  top: -9px;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 0.9rem;
  color: #805AD5;
  font-weight: bold;
  letter-spacing: 0.5px;
  z-index: 2;
`;

export const SectionIcon = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  border: 1px solid #e0e0e0;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  position: relative;
  padding-top: 30px;
  
  @media (min-width: 768px) {
    margin-bottom: 36px;
  }
`;

export const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  line-height: 1.2;
  
  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`;

export const StyledContentTitle = styled(ContentTitle)`
  font-size: 2.5rem;
  color: #805AD5;
  text-align: center;
`;

export const ContentText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 24px;
  max-width: 900px;
`;

export const EnhancedContentText = styled(ContentText)`
  font-size: 1.2rem;
  max-width: 900px;
  margin: 0 auto 30px;
  
  span.role {
    font-weight: 600;
    color: #6b46c1;
    white-space: nowrap;
  }
  
  span.expertise {
    font-weight: 600;
    color: #2b6cb0;
    white-space: nowrap;
  }
`;

export const HighlightedCard = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 32px;
  margin-top: 32px;
  margin-bottom: 32px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transform: scale(1.05);
  transform-origin: center center;
`;

export const SpecialtyCard = styled.div`
  background-color: #f0e7ff;
  border: 1px solid #dac9ff;
  border-radius: 8px;
  padding: 20px;
  margin-top: 24px;
  margin-bottom: 28px;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: -12px;
    left: 20px;
    width: 24px;
    height: 24px;
    background-image: url('/icons/ai-chip.svg');
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 50%;
    background-color: white;
    padding: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
`;

export const SpecialtyTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: #6b46c1;
  margin-top: 0;
  margin-bottom: 12px;
`;

export const ReactSpecialtyCard = styled(SpecialtyCard)`
  background-color: #eaf6ff;
  border-color: #bce0fd;
  margin-top: 28px;
  
  &:before {
    background-image: url('/icons/react-icon.svg');
  }
`;

export const ReactSpecialtyTitle = styled(SpecialtyTitle)`
  color: #2b6cb0;
`;

export const SpecialtyText = styled.p`
  margin: 0;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.95rem;
`;

export const CardTitle = styled.h3`
  font-size: 1.8rem;
  margin-top: 0;
  margin-bottom: 24px;
  color: #343a40;
  font-weight: bold;
`;

export const ContentList = styled.div`
  ul {
    padding-left: 0;
    margin: 0 0 36px 0;
    list-style-type: none;
    
    li {
      margin-bottom: 24px;
      line-height: 1.5;
      color: ${({ theme }) => theme.colors.text.secondary};
      display: flex;
      flex-direction: column;
      position: relative;
      padding-left: 32px;
      
      @media (min-width: 768px) {
        flex-direction: row;
        align-items: flex-start;
        padding-left: 36px;
        margin-bottom: 28px;
      }
      
      &:last-child {
        margin-bottom: 0;
      }
      
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 2px;
        width: 24px;
        height: 24px;
        background-image: url('/icons/check-circle.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
      
      strong {
        color: ${({ theme }) => theme.colors.text.primary};
        font-weight: 600;
        margin-right: 8px;
        min-width: 180px;
        display: block;
        margin-bottom: 4px;
        
        @media (min-width: 768px) {
          min-width: 200px;
          flex-shrink: 0;
          margin-bottom: 0;
        }
      }
    }
  }
`;

export const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 32px;
`;

export const PrimaryButton = styled.a`
  display: inline-block;
  background-color: #805AD5;
  color: white;
  font-weight: bold;
  padding: 16px 32px;
  border-radius: 4px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.2s ease-in-out;
  font-size: 1.1rem;
  
  &:hover {
    background-color: #6b46c1;
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(0,0,0,0.15);
  }
`;

export const IntroList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 24px 0 30px;
  gap: 16px;
  
  .skill-tag {
    background-color: #f7f7f7;
    border: 1px solid #e2e2e2;
    border-radius: 30px;
    padding: 8px 16px;
    font-size: 0.95rem;
    font-weight: 500;
    color: #4a5568;
    display: inline-flex;
    align-items: center;
    
    &:before {
      content: '';
      width: 12px;
      height: 12px;
      display: inline-block;
      background-color: #805AD5;
      border-radius: 50%;
      margin-right: 8px;
    }
    
    &.react {
      &:before {
        background-color: #2b6cb0;
      }
    }
    
    &.ai {
      &:before {
        background-color: #6b46c1;
      }
    }
  }
`; 