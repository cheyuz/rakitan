import React from 'react';
import { Puzzle } from 'lucide-react';

export default function ApplicationLogo({ className = 'w-10 h-10', ...props }) {
    return (
        <div
            {...props}
            className={`rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-xl shadow-indigo-600/30 ${className}`}
        >
            <Puzzle className="w-3/5 h-3/5" />
        </div>
    );
}
