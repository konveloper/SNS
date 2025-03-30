import { CloseButton } from '@/components/ui';

export default function LoginModal() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative bg-white rounded-lg p-10 shadow-lg">
        <CloseButton className='absolute top-3 right-3'/>
        <p className="text-lg">로그인 패러렐 모달</p>
      </div>
    </div>
  )
}