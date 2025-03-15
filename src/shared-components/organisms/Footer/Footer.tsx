"use client";

import { Box, Text, Group } from '@mantine/core';
import { Music, ChevronUp, ChevronDown, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { IconBrandGithub, IconBrandLinkedin, IconBrandMedium } from '@tabler/icons-react';
import { 
  FooterContainer, 
  GradientBorder, 
  SocialAnchor, 
  SocialLinksContainer,
  CopyrightSection,
  MiniPlayerContainer,
  TrackInfoContainer,
  TrackArtwork,
  TrackDetails,
  MiniWaveformContainer,
  ProgressBar,
  ProgressFill,
  TimeDisplay,
  ControlsContainer,
  ControlButton,
  ExpandedPlayerContainer,
  ActiveTrackContainer,
  ActiveTrackHeader,
  ActiveTrackArtwork,
  WaveformContainer,
  TrackControlsContainer,
  VolumeContainer,
  VolumeSlider,
  TrackList,
  TrackItem,
  TrackItemContent,
  TrackItemControls,
  SoundCloudLink,
  FooterInfo
} from './Footer.styles';
import { FooterProps, SocialLink, SoundCloudTrack } from './Footer.types';
import { useFooter, getDefaultSocialLinks } from './Footer.hook';
import { useFooterPlayer } from './Footer.player.hook';

export const Footer = ({ 
  socialLinks,
  soundCloudTracks
}: FooterProps) => {
  // Get theme and social links
  const footerData = useFooter(socialLinks, soundCloudTracks);
  const { theme, isDark, currentYear, links, tracks } = footerData || { 
    theme: {}, 
    isDark: false, 
    currentYear: new Date().getFullYear(),
    links: [],
    tracks: []
  };
  
  // Create default social links with icons
  const defaultSocialLinks = getDefaultSocialLinks().map(link => {
    let icon;
    switch (link.name) {
      case 'GitHub':
        icon = <IconBrandGithub size={20} />;
        break;
      case 'LinkedIn':
        icon = <IconBrandLinkedin size={20} />;
        break;
      case 'Medium':
        icon = <IconBrandMedium size={20} />;
        break;
      default:
        icon = null;
    }
    return { ...link, icon };
  });
  
  // Use provided links or default ones
  const socialLinksWithIcons = links.length > 0 ? links : defaultSocialLinks;
  
  // Get player functionality
  const playerData = useFooterPlayer(tracks);
  const { 
    isExpanded, 
    isPlaying, 
    activeTrack, 
    volume, 
    isMuted, 
    duration, 
    currentTime, 
    currentTrack, 
    percentComplete, 
    toggleExpand, 
    togglePlay, 
    toggleMute, 
    formatTime, 
    setVolume 
  } = playerData || {
    isExpanded: false,
    isPlaying: false,
    activeTrack: null,
    volume: 80,
    isMuted: false,
    duration: 0,
    currentTime: 0,
    currentTrack: null,
    percentComplete: 0,
    toggleExpand: () => {},
    togglePlay: () => {},
    toggleMute: () => {},
    formatTime: () => '0:00',
    setVolume: () => {}
  };

  // Calculate a subtle gradient that works in both light and dark modes
  const gradientColor = isDark ? 'rgba(0,188,212,0.3)' : 'rgba(0,188,212,0.2)';
  const gradientBg = `linear-gradient(90deg, rgba(0,0,0,0) 0%, ${gradientColor} 50%, rgba(0,0,0,0) 100%)`;

  return (
    <Box 
      w="100%"
      style={{
        backgroundColor: isDark ? theme.colors?.dark[8] : theme.colors?.gray[0],
        borderTop: `1px solid ${isDark ? 'rgba(70, 70, 70, 0.5)' : 'rgba(230, 230, 230, 0.8)'}`,
      }}
    >
      <FooterContainer>
        <GradientBorder style={{ background: gradientBg }} />
        
        {/* Collapsed Mini Player */}
        <MiniPlayerContainer>
          <TrackInfoContainer>
            {currentTrack ? (
              <>
                <TrackArtwork 
                  src={currentTrack.artwork} 
                  alt={`${currentTrack.title} artwork`}
                />
                <TrackDetails>
                  <Text fw={500} size="sm">{currentTrack.title}</Text>
                  <Text size="xs" c="dimmed">{currentTrack.artist}</Text>
                </TrackDetails>
              </>
            ) : (
              <>
                <Music size={20} style={{ marginRight: '0.5rem', color: isDark ? theme.colors?.blue[4] : theme.colors?.blue[6] }} />
                <Text fw={500}>My Music</Text>
              </>
            )}
          </TrackInfoContainer>

          {/* Mini-waveform visualization */}
          {currentTrack && (
            <MiniWaveformContainer>
              {/* Progress bar */}
              <ProgressBar>
                <ProgressFill 
                  width={`${percentComplete}%`}
                  style={{ backgroundColor: isDark ? theme.colors?.blue[4] : theme.colors?.blue[6] }}
                />
              </ProgressBar>
              
              {/* Time display */}
              <TimeDisplay style={{ color: isDark ? theme.colors?.gray[5] : theme.colors?.gray[6] }}>
                <Text size="xs">{formatTime(currentTime)}</Text>
                <Text size="xs">{formatTime(duration)}</Text>
              </TimeDisplay>
            </MiniWaveformContainer>
          )}
          
          <ControlsContainer>
            {currentTrack && (
              <>
                <ControlButton 
                  onClick={() => togglePlay(currentTrack.id)} 
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? 
                    <Pause size={18} color={isDark ? theme.colors?.gray[3] : theme.colors?.dark[6]} /> : 
                    <Play size={18} color={isDark ? theme.colors?.gray[3] : theme.colors?.dark[6]} />
                  }
                </ControlButton>
                <ControlButton
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? 
                    <VolumeX size={18} color={isDark ? theme.colors?.gray[3] : theme.colors?.dark[6]} /> : 
                    <Volume2 size={18} color={isDark ? theme.colors?.gray[3] : theme.colors?.dark[6]} />
                  }
                </ControlButton>
              </>
            )}
            <ControlButton 
              onClick={toggleExpand} 
              aria-label={isExpanded ? "Collapse player" : "Expand player"}
            >
              {isExpanded ? 
                <ChevronDown size={18} color={isDark ? theme.colors?.gray[3] : theme.colors?.dark[6]} /> : 
                <ChevronUp size={18} color={isDark ? theme.colors?.gray[3] : theme.colors?.dark[6]} />
              }
            </ControlButton>
          </ControlsContainer>
        </MiniPlayerContainer>
        
        {/* Expanded Player */}
        {isExpanded && (
          <ExpandedPlayerContainer
            style={{
              borderTop: `1px solid ${isDark ? theme.colors?.dark[5] : theme.colors?.gray[3]}`,
              backgroundColor: isDark ? theme.colors?.dark[7] : theme.colors?.gray[1]
            }}
          >
            <Text size="sm" fw={600} c="dimmed" mb="xs">My Tracks</Text>
            
            {/* Active track waveform */}
            {currentTrack && (
              <ActiveTrackContainer
                style={{
                  backgroundColor: isDark ? theme.colors?.dark[6] : 'white'
                }}
              >
                <ActiveTrackHeader>
                  <ActiveTrackArtwork 
                    src={currentTrack.artwork} 
                    alt={`${currentTrack.title} artwork`}
                  />
                  <div>
                    <Text fw={500}>{currentTrack.title}</Text>
                    <Text size="sm" c="dimmed">{currentTrack.artist}</Text>
                  </div>
                </ActiveTrackHeader>
                
                {/* WaveSurfer container */}
                <WaveformContainer 
                  id="waveform"
                  style={{
                    backgroundColor: isDark ? theme.colors?.dark[8] : theme.colors?.gray[1]
                  }}
                />
                
                <TrackControlsContainer>
                  <Group>
                    <ControlButton 
                      onClick={() => togglePlay(currentTrack.id)} 
                      aria-label={isPlaying ? "Pause" : "Play"}
                      style={{
                        backgroundColor: isDark ? theme.colors?.dark[5] : theme.colors?.gray[2],
                        padding: '0.5rem'
                      }}
                    >
                      {isPlaying ? 
                        <Pause size={18} color={isDark ? theme.colors?.gray[3] : theme.colors?.dark[6]} /> : 
                        <Play size={18} color={isDark ? theme.colors?.gray[3] : theme.colors?.dark[6]} />
                      }
                    </ControlButton>
                    <Text size="sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </Text>
                  </Group>
                  
                  <VolumeContainer>
                    <ControlButton
                      onClick={toggleMute}
                      aria-label={isMuted ? "Unmute" : "Mute"}
                      style={{
                        marginRight: '0.5rem'
                      }}
                    >
                      {isMuted ? 
                        <VolumeX size={18} color={isDark ? theme.colors?.gray[3] : theme.colors?.dark[6]} /> : 
                        <Volume2 size={18} color={isDark ? theme.colors?.gray[3] : theme.colors?.dark[6]} />
                      }
                    </ControlButton>
                    
                    {/* Volume slider */}
                    <VolumeSlider
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(parseInt(e.target.value))}
                      style={{
                        backgroundColor: isDark ? theme.colors?.dark[5] : theme.colors?.gray[3]
                      }}
                    />
                  </VolumeContainer>
                </TrackControlsContainer>
              </ActiveTrackContainer>
            )}
            
            {/* Track list */}
            <TrackList>
              {tracks.map((track: SoundCloudTrack) => (
                <TrackItem 
                  key={track.id} 
                  isActive={activeTrack === track.id}
                  onClick={() => togglePlay(track.id)}
                >
                  <TrackArtwork 
                    src={track.artwork} 
                    alt={`${track.title} artwork`}
                    style={{ width: '3rem', height: '3rem' }}
                  />
                  
                  <TrackItemContent>
                    <div>
                      <Text size="sm" fw={500}>{track.title}</Text>
                      <Text size="xs" c="dimmed">{track.artist} • {formatTime(track.duration)}</Text>
                    </div>
                    
                    <TrackItemControls>
                      <ControlButton 
                        style={{
                          backgroundColor: isDark ? theme.colors?.dark[5] : theme.colors?.gray[2]
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlay(track.id);
                        }}
                      >
                        {isPlaying && activeTrack === track.id ? 
                          <Pause size={16} color={isDark ? theme.colors?.gray[3] : theme.colors?.dark[6]} /> : 
                          <Play size={16} color={isDark ? theme.colors?.gray[3] : theme.colors?.dark[6]} />
                        }
                      </ControlButton>
                      
                      <SoundCloudLink 
                        href={track.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          color: isDark ? theme.colors?.blue[4] : theme.colors?.blue[6]
                        }}
                      >
                        SoundCloud
                      </SoundCloudLink>
                    </TrackItemControls>
                  </TrackItemContent>
                </TrackItem>
              ))}
            </TrackList>
            
            <FooterInfo
              style={{
                borderTop: `1px solid ${isDark ? theme.colors?.dark[5] : theme.colors?.gray[3]}`
              }}
            >
              <Text size="xs" c="dimmed">
                For the full experience, visit my 
                <Text 
                  component="a" 
                  href="/music" 
                  ml={4}
                  c={isDark ? theme.colors?.blue[4] : theme.colors?.blue[6]}
                  style={{ textDecoration: 'none' }}
                >
                  music page
                </Text>.
              </Text>
            </FooterInfo>
          </ExpandedPlayerContainer>
        )}
        
        {/* Social Links and Copyright */}
        <Group justify="space-between" p="md">
          <SocialLinksContainer>
            {socialLinksWithIcons.map((link: SocialLink) => (
              <SocialAnchor 
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  color: isDark ? theme.colors?.blue[4] : theme.colors?.blue[6],
                }}
              >
                <Group gap="xs">
                  {link.icon}
                  <Text size="sm">{link.name}</Text>
                </Group>
              </SocialAnchor>
            ))}
          </SocialLinksContainer>
          
          <CopyrightSection>
            <Text size="sm" c="dimmed">© {currentYear} David Mieloch • All rights reserved</Text>
          </CopyrightSection>
        </Group>
      </FooterContainer>
    </Box>
  );
};

export default Footer; 