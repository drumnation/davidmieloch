import styled from 'styled-components';

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px 16px 8px 40px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  background: white;
  font-size: 14px;
  color: #1F2937;
  transition: all 0.2s ease;

  &::placeholder {
    color: #9CA3AF;
  }

  &:hover {
    border-color: #D1D5DB;
  }

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }

  &:disabled {
    background: #F3F4F6;
    cursor: not-allowed;
    border-color: #E5E7EB;
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  pointer-events: none;
`; 