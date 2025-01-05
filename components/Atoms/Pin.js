import React from 'react';
import { Marker } from '@react-google-maps/api';

const pin = {
    blue: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    green: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    yellow: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
    grey: 'http://maps.google.com/mapfiles/ms/icons/grey-dot.png',
};

const Pin = ({ position, color }) => {
    const icon = pinColors[color] || pinColors.red; // デフォルトは赤色

    return <Marker position={position} icon={icon} />;
};

export default Pin;