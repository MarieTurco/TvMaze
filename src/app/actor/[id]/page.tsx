import { fetchActorDetails } from '@/lib/fetchTvMaze';
import { notFound } from 'next/navigation';
import ShowCard from '@/components/ShowCard';

export default async function ActorPage({ params }: { params: { id: string } }) {
    const data = await fetchActorDetails(params.id);
    if (!data) return notFound();

    const { person, castCredits } = data;

    return (
        <div className="p-8 bg-gray-900 text-white">
            <div className="max-w-6xl mx-auto">
                <div className="flex gap-6 items-start">
                    {person.image?.medium && (
                        <img src={person.image.medium} alt={person.name} className="rounded-lg w-28 lg:w-48" />
                    )}
                    <div>
                        <h1 className="text-xl lg:text-4xl font-bold mb-2">{person.name}</h1>

                        <div className="text-sm lg:text-lg text-gray-300">
                            <p><strong>Pays de naissance :</strong> {person.country?.name || 'Inconnue'}</p>
                            <p><strong>Date de naissance :</strong> {person.birthday || 'Non renseignée'}</p>
                            <p><strong>Genre :</strong> {person.gender || 'Non spécifié'}</p>
                            {person.deathday && (
                                <p><strong>Date de décès :</strong> {person.deathday}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Apparitions dans des séries</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {castCredits.map((credit: any) => (
                            <ShowCard
                                key={credit._embedded.show.id}
                                id={credit._embedded.show.id}
                                name={credit._embedded.show.name}
                                image={credit._embedded.show.image || { medium: '/placeholder-image.png' }}
                                genres={credit._embedded.show.genres}
                                premiered={credit._embedded.show.premiered}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
