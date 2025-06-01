'use client';

import { useRouter } from 'next/navigation';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import {
  LogoSvg,
  BaseModal,
  BaseLabel,
  BaseInput,
  DefaultButton,
} from '@/components/ui';

/**
 * 회원가입 모달
 * @returns
 */
export default function SignupModal() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState('');

  const router = useRouter();
  const onClickClose = () => {
    router.back();
    // TODO: 뒤로가기가 /home이 아니면 /home으로 보내기
  };

  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };
  const onChangeNickname: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNickname(e.target.value);
  };
  const onChangeImageFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.target.files && setImageFile(e.target.files[0]);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    fetch('http://localhost:9090/api/users', {
      method: 'post',
      body: JSON.stringify({
        id,
        nickname,
        image,
        password,
      }),
      credentials: 'include',
    })
      .then((response: Response) => {
        console.log(response.status);
        if (response.status === 200) {
          router.replace('/home');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <BaseModal>
      <div>
        <form
          className='flex flex-col items-center gap-6 md:gap-6'
          onSubmit={handleSubmit}
        >
          <LogoSvg />

          <div className='text-md font-semibold'>환영합니다!</div>

          <div className='flex flex-col gap-4'>
            {/* 아이디 설정 */}
            <div>
              <BaseLabel htmlFor='id' text='아이디' />
              <BaseInput
                id='id'
                placeholder='아이디를 입력해주세요.'
                value={id}
                onChange={onChangeId}
              />
            </div>

            {/* 비밀번호 설정 */}
            <div>
              <BaseLabel htmlFor='password' text='비밀번호' />
              <BaseInput
                id='password'
                type='password'
                placeholder='비밀번호를 입력해주세요.'
                value={password}
                onChange={onChangePassword}
              />
            </div>

            {/* 닉네임 설정 */}
            <div>
              <BaseLabel htmlFor='name' text='닉네임' />
              <BaseInput
                id='name'
                placeholder='닉네임을 입력해주세요.'
                value={nickname}
                onChange={onChangeNickname}
              />
            </div>

            {/* 프로필 이미지 설정 */}
            <div>
              <BaseLabel htmlFor='image' text='프로필 사진' />
              <input
                id='image'
                type='file'
                accept='image/*'
                onChange={onChangeImageFile}
                className='
                block w-full text-xs text-gray-400
                file:mr-3 file:py-1 file:px-2
                file:rounded file:border file:border-gray-300
                file:text-xs file:bg-white file:cursor-pointer
              '
              />
            </div>
          </div>

          {/* 가입하기 버튼 */}
          <DefaultButton text='가입하기' />
        </form>
      </div>
    </BaseModal>
  );
}
