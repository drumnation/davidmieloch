import styled from 'styled-components';

export const MediaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2%;
  margin-top: 16px;
  margin-bottom: 16px;
  
  .quarter-width-image {
    flex: 0 0 23.5% !important;
    max-width: 23.5% !important;
    margin-bottom: 16px !important;
  }
  
  .third-width-image {
    flex: 0 0 31.33% !important;
    max-width: 31.33% !important;
    margin-bottom: 16px !important;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    
    .quarter-width-image,
    .third-width-image {
      flex: 0 0 100% !important;
      max-width: 100% !important;
    }
  }
`;

export const MediaContainer = styled.div<{ $isWide?: boolean }>`
  flex: ${({ $isWide }) => $isWide ? '0 0 100%' : '0 0 48.5%'};
  max-width: ${({ $isWide }) => $isWide ? '100%' : '48.5%'};
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    flex: 0 0 100%;
    max-width: 100%;
    margin-top: 25px;
  }
  
  @media (max-width: 576px) {
    margin-top: 25px;
  }
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
  
  iframe {
    width: 100%;
    border: none;
    display: block;
  }
  
  /* Add styles for clickable images */
  &:has(> img) {
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }
  
  &.quarter-width-image {
    &:hover {
      z-index: 1;
    }
  }
  
  &.pdf-container {
    display: flex;
    flex-direction: column;
    background-color: white;
    
    .pdf-thumbnail {
      position: relative;
      padding-top: 56.25%; /* 16:9 Aspect Ratio */
      background-color: #f5f5f5;
      cursor: pointer;
      overflow: hidden;
      border-radius: 8px 8px 0 0;
      
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .pdf-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        font-weight: 500;
        opacity: 0;
        transition: opacity 0.2s ease;
        
        svg {
          margin-right: 8px;
        }
      }
      
      &:hover .pdf-overlay {
        opacity: 1;
      }
    }
    
    .pdf-title {
      padding: 12px 15px;
      font-weight: 500;
      background-color: #f9f9f9;
      border-top: 1px solid #eee;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 1rem;
      color: #333;
      border-radius: 0 0 8px 8px;
    }
    
    .pdf-title-text {
       display: flex;
       align-items: center;
    }

    .pdf-badge {
      background: #E74C3C;
      color: white;
      font-size: 0.7rem;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: bold;
      text-transform: uppercase;
      margin-left: 8px;
    }
  }
  
  &.link-container {
    display: flex;
    flex-direction: row;
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    min-height: 160px;
    max-height: 180px;
    background-color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    > *:first-child {
      width: 280px;
      height: 100%;
      flex-shrink: 0;
      background-color: #f0f0f0;
      cursor: pointer;
      border-radius: 8px 0 0 8px;
      overflow: hidden;
      
      img {
         border-radius: 0;
      }
      
      .link-placeholder {
         position: absolute;
         top: 0;
         left: 0;
         right: 0;
         bottom: 0;
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;
         background-color: #f0f0f0;
         color: #333;
         padding: 20px;
         text-align: center;
         border-radius: 8px 0 0 8px;
        
         svg {
           margin-bottom: 12px;
           width: 48px;
           height: 48px;
         }
        
         .placeholder-text {
           font-weight: 500;
           font-size: 14px;
           color: #555;
         }
      }
    }
    
    > *:last-child {
      padding: 16px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      background-color: #fff;
      border-left: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 0 8px 8px 0;
    }

    @media (max-width: 768px) {
      flex-direction: column;
      max-height: none;
      min-height: auto;
      
      > *:first-child {
        width: 100%;
        height: 180px;
        border-radius: 8px 8px 0 0;
      }
      
      > *:last-child {
        border-left: none;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 0 0 8px 8px;
      }
    }
  }
`;

export const MediaGroup = styled.div<{ $layout?: 'default' | 'stack'; $width?: string, columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 1}, 1fr);
  gap: 8px;
  width: ${props => props.$width || '100%'};
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  
  &.half-width-group {
    width: 48.5%;
    flex: 0 0 48.5%;
  }
  
  &.third-width-group {
    width: 31.33%;
    flex: 0 0 31.33%;
  }
  
  &.quarter-width-group {
    width: 23.5%;
    flex: 0 0 23.5%;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    flex: 0 0 100%;
    grid-template-columns: 1fr;
    
    &.half-width-group,
    &.third-width-group,
    &.quarter-width-group {
      width: 100%;
      flex: 0 0 100%;
    }
  }
`;

export const MediaGroupContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0;
  background-color: white;
  
  > div {
    margin-bottom: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  img {
    border-radius: 0 !important;
    
    &:hover {
      transform: none;
    }
  }
`;
