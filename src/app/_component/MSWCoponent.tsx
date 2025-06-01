'use client';

import { useEffect } from 'react';

export const MSWComponent = () => {
  useEffect(() => {
    // 브라우저 환경일 때는 '@/mocks/msw/browser' 실행
    if (typeof window !== 'undefined') {
      if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
        require('@/mocks/msw/browser');
      }
    }
  }, []);

  return null;
};
