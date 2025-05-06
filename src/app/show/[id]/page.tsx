import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchShowDetails } from '@/lib/fetchTvMaze';

interface ShowPageProps {
    params: { id: string };
}

interface Episode {
    id: number;
    name: string;
    season: number;
    number: number;
}

interface Season {
    id: number;
    number: number;
    premiereDate?: string;
    endDate?: string;
}


interface CastMember {
    person: { id: number; name: string; image?: { medium: string } };
    character: { name: string };
}

export default async function ShowPage({ params }: ShowPageProps) {
    if (!params?.id) return notFound();

    const data = await fetchShowDetails(params.id);

    if (!data) return notFound();

    const { show, episodes, cast, seasons } = data;

    const episodesBySeason: Record<string, Episode[]> = {};
    for (const ep of episodes as Episode[]) {
        const key = String(ep.season);
        if (!episodesBySeason[key]) episodesBySeason[key] = [];
        episodesBySeason[key].push(ep);
    }

    return (
        <div className="p-8 bg-gray-900 text-white min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Lien vers la page d'accueil */}
                <div className="mb-6">
                    <Link href="/">
                        <button className="text-white py-2 px-4 rounded-md hover:bg-gray-600 transition">
                            ⬅️ Retour à l'accueil
                        </button>
                    </Link>
                </div>

                <h1 className="text-4xl font-bold mb-6 text-center">{show.name}</h1>

                <div className="text-center text-gray-300 mb-6">
                    <p className="text-lg">🌍 Langue : {show.language}</p>
                    <p className="text-lg">🎭 Genres : {show.genres.join(', ')}</p>
                    <p className="text-lg">📅 Diffusé à partir du : {show.premiered}</p>
                </div>

                {show.image && (
                    <img
                        src={show.image.original}
                        alt={show.name}
                        className="w-full max-w-md mx-auto mb-6 rounded-lg shadow-lg"
                    />
                )}

                {show.summary && (
                    <div
                        className="prose prose-invert max-w-none mb-10"
                        dangerouslySetInnerHTML={{ __html: show.summary }}
                    />
                )}

                {/* Cast */}
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2">🎭 Casting 🎭</h2>

                <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    {(cast as CastMember[]).map((c, i) => (
                        <li key={i} className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg">
                            {c.person.image && (
                                <img
                                    src={c.person.image.medium}
                                    alt={c.person.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                            )}
                            <div>
                                <Link href={`/actor/${c.person.id}`}>
                                    <span className="font-semibold hover:underline">{c.person.name}</span>
                                </Link>
                                <div className="text-sm text-gray-300">
                                    dans le rôle de <em>{c.character.name}</em>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Episodes */}
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2 pt-6">🎬 Épisodes 🎬</h2>

                <div className="mt-6 space-y-8">
                    {Object.entries(episodesBySeason).map(([season, eps]) => {
                        const seasonData = seasons.find((s: Season) => String(s.number) === season);

                        const dateInfo = seasonData?.premiereDate && seasonData?.endDate
                            ? `(${seasonData.premiereDate} – ${seasonData.endDate})`
                            : '';

                        return (
                            <div key={season} className="bg-gray-800 rounded-lg p-4">
                                <h3 className="text-xl font-bold mb-4 text-gray-100 flex flex-col lg:flex-row lg:items-center">
                                    📺 Saison {season}
                                    <span className="mt-2 lg:mt-0 lg:ml-2 text-sm lg:text-xl block lg:inline">{dateInfo}</span>
                                </h3>
                                <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {eps.map((ep: Episode) => (
                                        <li
                                            key={ep.id}
                                            className="bg-gray-700 p-3 rounded-md hover:bg-gray-600 transition"
                                        >
                                            <Link href={`/episode/${ep.id}`} className="block hover:underline">
                                                <strong>Épisode {ep.number}</strong> — {ep.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
