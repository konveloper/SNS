'use client';
import { useState } from 'react';
import { useAuthStore } from '@/store/autoStore';
import { LogoSvg, CloseButton } from '@/components/ui';

/**
 * 로그인 모달
 * @returns
 */
export default function LoginModal() {
  const { setAccessToken, setProfiles, login } = useAuthStore();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleEmailChange = (e) => setLoginId(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRememberMeChange = (e) => setRememberMe(e.target.checked);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setAccessToken(fakeToken);
    // setProfiles(fakeProfile);
    login();
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative bg-white rounded-lg px-15 py-10 shadow-lg">
        <CloseButton className='absolute top-3 right-3'/>
        <form className="flex flex-col items-center gap-4 md:gap-6" onSubmit={handleSubmit}>
          <LogoSvg />
       {/* 아이디 */}
       <div>
          <label
            htmlFor="id"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Id
          </label>
          <input
            type="text"
            name="id"
            id="id"
            value={loginId}
            onChange={handleEmailChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="your id"
            required
          />
        </div>
        {/* 비밀번호 */}
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        {/* 로그인 기억하기 */}
        <div className="flex self-start justify-between mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="remember"
              className="text-gray-500 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
        </div>
        {/* 로그인 버튼 */}
        <button
          type="submit"
          className="w-fit px-4 py-1 bg-black text-white rounded
          hover:bg-blue-700 transition"
        >
          로그인
        </button>
      </form>
      </div>
    </div>
  )
}