'use client';

import React from 'react';
import { SpinnerLoader } from '../src/components';

export default function Loading() {
  return (
    <SpinnerLoader 
      type="scale"
      color="#2196f3"
      size={80}
      fullPage={true}
    />
  );
} 