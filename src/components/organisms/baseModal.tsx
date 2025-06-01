'use client';

import { useRouter } from 'next/navigation';
import { CloseButton } from '@/components/ui';

/**
 *
 * @param children
 * @returns
 */
export const BaseModal = ({ children }) => {
  const router = useRouter();
  const onClickClose = () => {
    router.back();
    // TODO: 뒤로가기가 /home이 아니면 /home으로 보내기
  };

  return (
    <div className='absolute inset-0 flex items-center justify-center bg-black/50 z-50'>
      <div className='relative bg-white rounded-lg max-w-[90vw] px-15 py-10 shadow-lg'>
        <CloseButton
          className='absolute top-3 right-3'
          onClick={onClickClose}
        />
        <div>{children}</div>
      </div>
    </div>
  );
};
