"use client";

import React from 'react';
import Image from 'next/image';
import { FiCheck } from 'react-icons/fi';
import {
  ReactNativeFeatureContainer,
  FeatureIcon,
  FeatureContent,
  FeatureTitle,
  FeatureDescription,
  FeatureList,
  FeatureItem,
  FeatureItemText,
  ItemIcon
} from './ReactNativeFeature.styles';
import { ReactNativeFeatureProps } from './ReactNativeFeature.types';

export const ReactNativeFeature: React.FC<ReactNativeFeatureProps> = ({
  className,
  isVisible = false,
  title = "React Native & Expo",
  description = "Specialized experience in cross-platform mobile development using React Native with Expo for rapid development and deployment.",
  items = [
    { text: "EAS for submitting to app stores" },
    { text: "Native module integration for platform-specific features" },
    { text: "Maestro for Mobile E2E testing" },
    { text: "Over-the-air (OTA) updates" },
    { text: "Automated performance monitoring" },
    { text: "Offline-first architecture" }
  ]
}) => {
  return (
    <ReactNativeFeatureContainer className={`${className || ''} fade-in ${isVisible ? 'visible' : ''}`}>
      <FeatureIcon>
        <Image 
          src="/icons/react-native.svg" 
          alt="React Native" 
          width={24} 
          height={24} 
          priority={true}
        />
      </FeatureIcon>
      <FeatureContent>
        <FeatureTitle>{title}</FeatureTitle>
        <FeatureDescription>{description}</FeatureDescription>
        <FeatureList>
          {items.map((item, index) => (
            <FeatureItem key={`feature-item-${index}`}>
              <ItemIcon><FiCheck /></ItemIcon>
              <FeatureItemText>{item.text}</FeatureItemText>
            </FeatureItem>
          ))}
        </FeatureList>
      </FeatureContent>
    </ReactNativeFeatureContainer>
  );
}; 