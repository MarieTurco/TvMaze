'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchShowsByPage, fetchSearchResults } from '@/lib/fetchTvMaze';
import ShowCard from '@/components/ShowCard';
import SearchBar from '@/components/SearchBar';

interface Show {
    id: number;
    name: string;
    image: { medium: string };
    genres: string[];
    premiered: string;
}

export default function HomePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [shows, setShows] = useState<Show[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const page = parseInt(searchParams.get('page') || '0');

    useEffect(() => {
        const fetchData = async () => {
            if (searchQuery) {
                const results = await fetchSearchResults(searchQuery);
                setShows(results);
            } else {
                const showsData = await fetchShowsByPage(page);
                setShows(showsData);
            }
        };

        fetchData();
    }, [page, searchQuery]);

    const goToPage = (newPage: number) => {
        router.push(`/?page=${newPage}`);
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <div className="p-8 lg:p-4 bg-gray-900 text-white min-h-screen">

            {/* Barre de recherche */}
            <div className="mb-6 flex justify-center">
                <SearchBar onSearch={handleSearchChange} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {shows.map((show) => (
                    <ShowCard
                        key={show.id}
                        id={show.id}
                        name={show.name}
                        image={show.image}
                        genres={show.genres}
                        premiered={show.premiered}
                    />
                ))}
            </div>

            {searchQuery === '' && (
                <div className="mt-8 flex justify-between">
                    {page > 0 ? (
                        <button
                            onClick={() => goToPage(page - 1)}
                            className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
                        >
                            ⬅️ Précédent
                        </button>
                    ) : (
                        <div />
                    )}

                    {shows.length > 0 ? (
                        <button
                            onClick={() => goToPage(page + 1)}
                            className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
                        >
                            Suivant ➡️
                        </button>
                    ) : (
                        <div />
                    )}
                </div>
            )}

        </div>
    );
}
