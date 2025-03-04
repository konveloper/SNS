import Link from 'next/link';

export default function MainPage() {
  return (
    <div>
      <p>지금 일어나고 있는 일</p>
      <p>지금 가입하세요.</p>
      <Link href='/flow/signup'>계정 만들기</Link>
      <p>이미 가입하셨나요?</p>
      <Link href='/flow/login'>로그인</Link>
    </div>
  );
}
