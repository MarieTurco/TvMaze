import Link from 'next/link';

interface ShowCardProps {
    id: number;
    name: string;
    image: { medium: string };
    genres: string[];
    premiered: string;
}

export default function ShowCard({ id, name, image, genres, premiered }: ShowCardProps) {
    return (
        <div className="bg-gray-800 rounded-lg p-4 shadow-md hover:scale-105 transition-transform duration-300 ease-in-out">
            <Link href={`/show/${id}`}>
                <img
                    src={image?.medium}
                    alt={name}
                    className="w-full rounded-lg mb-4"
                />
                <h2 className="text-xl text-center font-semibold text-gray-100">{name}</h2>
                <div className="text-center text-gray-300 mb-6">
                    <p className="text-lg italic">{genres.join(', ')}</p>
                    <p className="text-lg">Diffusé à partir du {premiered}</p>
                </div>
            </Link>
        </div>
    );
}
