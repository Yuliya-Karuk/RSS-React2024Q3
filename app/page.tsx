import Home from './(home)/home';
import HomeWithLoader from './(home)/homeWithLoader';

export default function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
  return (
    <HomeWithLoader>
      <Home searchParams={searchParams} />
    </HomeWithLoader>
  );
}
