import './globals.css';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
        <head />
        <body className="bg-indigo-800 text-white">
        <header className="py-2 bg-gray-800">
            <div className="w-full px-5"> {/* Utilisation de w-full pour occuper toute la largeur */}
                <h1 className="text-3xl font-semibold text-left text-white m-5">
                    <a
                        href="/"
                        className="text-decoration-none hover:text-gray-300"
                    >
                        Accueil
                    </a>
                </h1>
            </div>
        </header>

        <main className="bg-gray-900 text-white min-h-screen">{children}</main>

        <footer className="bg-gray-800 text-gray-300 py-4 text-center">
            <p>© {new Date().getFullYear()} TVMaze Platform. Tous droits réservés.</p>
            <p>
                <a
                    href="https://www.tvmaze.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                >
                    Powered by TVMaze API
                </a>
            </p>
        </footer>
        </body>
        </html>
    );
}
