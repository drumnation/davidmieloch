import styled from 'styled-components';

// Main component node style (Software Engineering)
export const StyledMainComponentNode = styled.div`
  padding: 12px 20px;
  border: 2px solid #4c51bf;
  background-color: #ebf4ff;
  color: #2d3748;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-width: 180px;
  
  .node-icon {
    margin-right: 8px;
    font-size: 18px;
  }
`;

// Category node style (UI Layer, Business Logic, etc.)
export const StyledCategoryNode = styled.div`
  padding: 10px 16px;
  border: 1px solid #4299e1;
  background-color: #e6f7ff;
  color: #2c5282;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  min-width: 150px;
  
  .node-icon {
    margin-right: 6px;
    font-size: 16px;
  }
`;

// Item node style (Components, Services, etc.)
export const StyledItemNode = styled.div`
  padding: 8px 12px;
  border: 1px solid #ccc;
  background-color: #f8fafc;
  color: #4a5568;
  text-align: center;
  font-size: 13px;
  font-weight: 400;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  min-width: 120px;
`;

// Container for the entire diagram
export const DiagramContainer = styled.div<{ width?: string | number; height?: string | number }>`
  width: ${props => typeof props.width === 'number' ? `${props.width}px` : props.width || '100%'};
  height: ${props => typeof props.height === 'number' ? `${props.height}px` : props.height || '500px'};
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
`; 