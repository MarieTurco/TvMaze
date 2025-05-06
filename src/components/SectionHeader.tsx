import React from 'react';

interface SectionHeaderProps {
    title: string;
    icon: React.ReactNode;
}

export default function SectionHeader({ title, icon }: SectionHeaderProps) {
    return (
        <div className="bg-sky-200 text-gray-900 p-4 rounded-lg mb-4">
            <h2 className="text-3xl font-semibold text-center flex items-center justify-center gap-2">
                {icon}
                {title}
                {icon}
            </h2>
        </div>
    );
}