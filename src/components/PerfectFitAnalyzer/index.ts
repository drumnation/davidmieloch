import dynamic from 'next/dynamic';

// Use dynamic import with ssr:false to ensure the component is only loaded on the client-side
const PerfectFitAnalyzer = dynamic(
  () => import('./PerfectFitAnalyzer'),
  { ssr: false }
);

export default PerfectFitAnalyzer;

export type { PerfectFitAnalyzerProps } from './PerfectFitAnalyzer'; 