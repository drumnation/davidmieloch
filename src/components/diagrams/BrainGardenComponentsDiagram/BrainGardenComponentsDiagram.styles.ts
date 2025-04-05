import styled from 'styled-components';

export const StyledMainComponentNode = styled.div`
  padding: 10px 20px;
  border: 2px solid #6772e5;
  background-color: #eef0ff;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 140px;

  .node-icon {
    margin-right: 8px;
    display: inline-block;
    font-size: 1.2em;
  }
`;

export const StyledSubComponentNode = styled.div`
  padding: 8px 16px;
  padding-top: 12px;
  border: 1px solid #ccc;
  background-color: #f0f7ff;
  text-align: center;
  font-size: 12px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  min-width: 120px;
  position: relative;
  
  .react-flow__handle {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
`;

export const StyledSystemNode = styled.div`
  padding: 10px 20px;
  padding-top: 15px;
  border: 1px solid #4a6bff;
  background-color: #f0f8ff;
  text-align: center;
  font-size: 14px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 140px;
  position: relative;

  .node-icon {
    margin-right: 8px;
    display: inline-block;
    font-size: 1em;
  }
  
  .react-flow__handle {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
`; 