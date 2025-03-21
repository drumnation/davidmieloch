import styled from 'styled-components';

export const Card = styled.div`
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 24px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #D1D5DB;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
`;

export const Header = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

export const ImageContainer = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const HeaderContent = styled.div`
  flex: 1;
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px 0;
`;

export const Company = styled.div`
  font-size: 14px;
  color: #4B5563;
  margin-bottom: 4px;
`;

export const Period = styled.div`
  font-size: 14px;
  color: #6B7280;
`;

export const Description = styled.p`
  font-size: 14px;
  color: #4B5563;
  line-height: 1.5;
  margin: 16px 0;
`;

export const TechnologiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

export const Technology = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: #F3F4F6;
  border-radius: 4px;
  font-size: 12px;
  color: #374151;
`;

export const AchievementsList = styled.ul`
  margin: 0;
  padding-left: 20px;

  li {
    font-size: 14px;
    color: #4B5563;
    margin-bottom: 8px;
    line-height: 1.5;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const Role = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #3B82F6;
  margin-bottom: 16px;
`; 