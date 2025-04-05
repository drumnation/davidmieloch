'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-slate-50 flex items-center justify-center z-50">
      <div className="loading-hash">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <style jsx>{`
        .loading-hash {
          display: inline-block;
          position: relative;
          width: 80px;
          height: 80px;
        }
        .loading-hash div {
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #2196f3;
          animation: loading-hash 1.2s linear infinite;
        }
        .loading-hash div:nth-child(1) {
          top: 8px;
          left: 8px;
          animation-delay: 0s;
        }
        .loading-hash div:nth-child(2) {
          top: 8px;
          left: 32px;
          animation-delay: -0.4s;
        }
        .loading-hash div:nth-child(3) {
          top: 8px;
          left: 56px;
          animation-delay: -0.8s;
        }
        .loading-hash div:nth-child(4) {
          top: 32px;
          left: 8px;
          animation-delay: -0.4s;
        }
        .loading-hash div:nth-child(5) {
          top: 32px;
          left: 32px;
          animation-delay: -0.8s;
        }
        @keyframes loading-hash {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
} 