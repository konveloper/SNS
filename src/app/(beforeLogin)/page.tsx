import Link from 'next/link';
import { LogoSvg } from '@/components/ui';

export default function HomePage() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='w-full flex gap-5'>
        {/* 로고 및 소개 영역 */}
        <div className='flex-1 flex items-center justify-center gap-2'>
          <LogoSvg />
          <p className='text-xl font-bold'>Hi, There!</p>
        </div>
        <div className='flex-1 flex flex-col items-start gap-5'>
        {/* 회원가입 텍스트 영역 */}
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>처음이신가요? 함께 시작해요.</p>
          <Link
            href='/flow/signup'
            className="w-fit px-4 py-1 bg-black text-white rounded
            hover:bg-blue-700 transition"
          >
            계정 만들기
          </Link>
        </div>
        {/* 로그인 텍스트 영역 */}
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>다시 오셨군요. 반가워요!</p>
          <Link
            href='/flow/login' // 이후 '/flow/login' 리다이렉트
            className="w-fit px-4 py-1 bg-black text-white rounded
            hover:bg-blue-700 transition"
          >
            로그인
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}
