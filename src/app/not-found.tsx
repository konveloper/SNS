import Link from 'next/link';
import { NextPage } from 'next';

const NotFound: NextPage = () => {
  return (
    <main>
      <div>이 페이지는 존재하지 않습니다.</div>
      <Link href='/search'>검색</Link>
    </main>
  )
}

export default NotFound;