export interface FeatureItem {
  text: string;
}

export interface ReactNativeFeatureProps {
  className?: string;
  isVisible?: boolean;
  title?: string;
  description?: string;
  items?: FeatureItem[];
} 