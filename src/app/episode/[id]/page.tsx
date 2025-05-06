import { fetchEpisodeDetails } from '@/lib/fetchTvMaze';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface EpisodePageProps {
    params: { id: string };
}

export default async function EpisodePage({ params }: EpisodePageProps) {
    const episode = await fetchEpisodeDetails(params.id);
    if (!episode) return notFound();

    const show = episode.show;

    // @ts-ignore
    return (
        <div className="p-8 bg-gray-900 text-white min-h-screen">
            <div className="max-w-4xl mx-auto">
                {show && (
                    <div className="mb-4">
                        <Link href={`/show/${show.id}`} className="text-indigo-400 hover:underline">
                            ← Retour à {show.name}
                        </Link>
                    </div>
                )}

                {show && (
                    <h2 className="text-2xl text-indigo-300  mb-4">{show.name}</h2>
                )}

                <h1 className="text-3xl font-bold text-center mt-4 mb-2">{episode.name}</h1>

                <p className="text-gray-300 mb-6 text-center">
                    Saison {episode.season}, Épisode {episode.number}
                </p>

                {episode.image && (
                    <img
                        src={episode.image.original || episode.image.medium}
                        alt={episode.name}
                        className="w-full rounded-lg shadow-lg mb-6"
                    />
                )}

                <div
                    className="prose prose-invert"
                    dangerouslySetInnerHTML={{ __html: episode.summary || 'Pas de résumé disponible.' }}
                />
            </div>
        </div>
    );
}
