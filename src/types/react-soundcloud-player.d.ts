declare module 'react-soundcloud-player' {
  interface SoundCloudPlayerOptions {
    auto_play?: boolean;
    hide_related?: boolean;
    show_comments?: boolean;
    show_user?: boolean;
    show_reposts?: boolean;
    visual?: boolean;
    color?: string;
  }

  interface SoundCloudPlayerProps {
    url: string;
    opts?: SoundCloudPlayerOptions;
    className?: string;
    style?: React.CSSProperties;
  }

  const SoundCloudPlayer: React.FC<SoundCloudPlayerProps>;
  export default SoundCloudPlayer;
} 