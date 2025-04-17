'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProjectsPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the experience page's projects section
    router.push('/experience#projects');
  }, [router]);
  
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      color: 'white'
    }}>
      Redirecting to projects...
    </div>
  );
} 