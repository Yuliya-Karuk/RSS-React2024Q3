import PageWithLoader from './(home)/pageWithLoader';

export default function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
  return <PageWithLoader searchParams={searchParams} />;
}
