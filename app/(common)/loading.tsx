'use client';

import React from 'react';
import { SpinnerLoader } from '../../src/components';

export default function CommonLoading() {
  return (
    <SpinnerLoader 
      type="climbing-box"
      color="#2196f3"
      size={40}
      fullPage={true}
    />
  );
} 