import React from 'react';
import { MediaItem } from './Bio.types';

export const renderMediaItem = (item: MediaItem, index: number) => {
  return (
    <div key={`media-item-${index}`}>
      <div className="embed-container">
        {item.type === 'youtube' && (
          <iframe
            src={item.url}
            title={item.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        {item.type === 'soundcloud' && (
          <iframe
            src={item.url}
            title={item.title}
            frameBorder="0"
            allow="autoplay"
          />
        )}
      </div>
      <h4>{item.title}</h4>
      {item.description && <p>{item.description}</p>}
    </div>
  );
};

export const formatTimelineItem = (
  item: { year: string; title: string; description: string },
  index: number
) => {
  return (
    <div key={`timeline-item-${index}`} className="timeline-item" data-index={index}>
      <div className="timeline-dot" />
      <div className="timeline-content">
        <div className="timeline-year">{item.year}</div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </div>
  );
};

export const formatSkillTag = (skill: string, index: number) => {
  return (
    <span key={`skill-${index}`} className="skill-tag">
      {skill}
    </span>
  );
}; 