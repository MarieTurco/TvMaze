import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void; // Attends un string
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    // Gestion du changement dans la recherche
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <div className="w-full max-w-3xl mx-auto my-6 px-4">
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400"
                    placeholder="Rechercher une série..."
                />
            </div>
        </div>
    );
};

export default SearchBar;
