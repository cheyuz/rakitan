import React from 'react';

export default function ApplicationLogo({ className = 'w-10 h-10', ...props }) {
    return (
        <img
            src="/images/rakitan-logo.png"
            alt="Rakitan CMS"
            className={`object-contain ${className}`}
            {...props}
        />
    );
}
