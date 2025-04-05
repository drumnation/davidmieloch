import React from 'react';
import { Building } from 'lucide-react';
import Image from 'next/image';
import { PrivateWorkCardProps } from './PrivateWorkCard.types';
import {
  Card,
  Header,
  ImageContainer,
  HeaderContent,
  Title,
  Company,
  Period,
  Description,
  TechnologiesContainer,
  Technology,
  AchievementsList,
  Role,
} from './PrivateWorkCard.styles';

export const PrivateWorkCard: React.FC<PrivateWorkCardProps> = ({
  title,
  description,
  company,
  period,
  technologies,
  achievements,
  role,
  imageUrl,
}) => {
  return (
    <Card>
      <Header>
        <ImageContainer>
          {imageUrl ? (
            <Image 
              src={imageUrl} 
              alt={`${company} logo`} 
              width={64}
              height={64}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <Building size={32} color="#9CA3AF" />
          )}
        </ImageContainer>
        <HeaderContent>
          <Title>{title}</Title>
          <Company>{company}</Company>
          <Period>{period}</Period>
        </HeaderContent>
      </Header>

      {role && <Role>{role}</Role>}

      <Description>{description}</Description>

      <TechnologiesContainer>
        {technologies.map((tech, index) => (
          <Technology key={`${tech.name}-${index}`}>
            {tech.icon && <span>{tech.icon}</span>}
            {tech.name}
          </Technology>
        ))}
      </TechnologiesContainer>

      {achievements && achievements.length > 0 && (
        <AchievementsList>
          {achievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </AchievementsList>
      )}
    </Card>
  );
}; 