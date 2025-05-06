import HomePage from './home-client';

export default function PageWrapper({ searchParams }: { searchParams: { page?: string } }) {
  return <HomePage />;
}
