'use client';
import { useState } from 'react';
import { useAuthStore } from '@/store/autoStore';
import {
  BaseModal,
  LogoSvg,
  BaseLabel,
  BaseInput,
  DefaultButton,
} from '@/components/ui';

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
    <BaseModal>
      <form
        className='flex flex-col items-center gap-6 md:gap-6'
        onSubmit={handleSubmit}
      >
        <LogoSvg />
        <div className='flex flex-col items-center gap-4'>
          {/* 아이디 */}
          <div>
            <BaseLabel htmlFor='id' text='아이디' />
            <BaseInput
              type='text'
              id='id'
              value={loginId}
              onChange={handleEmailChange}
              placeholder='your id'
              required={true}
            />
          </div>
          {/* 비밀번호 */}
          <div>
            <BaseLabel htmlFor='password' text='비밀번호' />
            <BaseInput
              type='password'
              id='password'
              value={password}
              onChange={handlePasswordChange}
              placeholder='••••••'
              required={true}
            />
          </div>
          {/* 로그인 기억하기 */}
          <div className='flex self-start justify-between mb-6'>
            <div className='flex items-center h-5'>
              <input
                id='remember'
                aria-describedby='remember'
                type='checkbox'
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
            </div>
            <div className='ml-3 text-sm'>
              <label
                htmlFor='remember'
                className='text-gray-500 dark:text-gray-300'
              >
                Remember me
              </label>
            </div>
          </div>
        </div>
        {/* 로그인 버튼 */}
        <DefaultButton text='로그인' />
      </form>
    </BaseModal>
  );
}
