import React from 'react';
import Button from '../components/Atoms/Button';
import Map from '../components/Atoms/Map';
import Point from '../components/Atoms/Point';
import Direction from '../components/Atoms/Direction';

const Home = () => {
    const handleClick = () => {
        alert('Button clicked!');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Next.js Button Component</h1>
            <Button label="Click Me" onClick={handleClick} />
            <Button label="Disabled" disabled className="mt-4" />
            <Map></Map>
            <Point></Point>
            <Direction></Direction>

        </div>
    );
};

export default Home;
