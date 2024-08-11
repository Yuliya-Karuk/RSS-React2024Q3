import Home from '@components/Home/Home';
import HomeWithLoader from '@components/HomeWithLoader/HomeWithLoader';

export default function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
  return (
    <HomeWithLoader>
      <Home searchParams={searchParams} />
    </HomeWithLoader>
  );
}
