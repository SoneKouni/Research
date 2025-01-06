import React, { useEffect, useState } from 'react';
import { Marker } from '@react-google-maps/api';
import InfoWindowContent from './InfoWindowContent';

const pinColors = {
    blue: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    green: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    yellow: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
    grey: 'http://maps.google.com/mapfiles/ms/icons/grey-dot.png',
};

const Pin = ({ color }) => {
    const [positions, setPositions] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState(null);

    useEffect(() => {
        const fetchBridgeData = async () => {
            const API_URL = "https://k-lab2.herokuapp.com/getopendata";
            const API_KEY = "9ea168d0f0b3459fa23a833b80739b2e";
            try {
                const response = await fetch(`${API_URL}?ApiKey=${API_KEY}`);
                if (!response.ok) {
                    throw new Error(`HTTPエラー! 状態: ${response.status}`);
                }
                const data = await response.json();
                // 全ての橋のデータを使用
                const positions = data.map(bridge => ({
                    lat: parseFloat(bridge.Lat),
                    lng: parseFloat(bridge.Lng),
                    name: bridge.Name,
                    rank: bridge.Rank
                }));
                setPositions(positions);
            } catch (err) {
                console.error('データの取得に失敗しました:', err);
            }
        };

        fetchBridgeData();
    }, []);

    const icon = pinColors[color] || pinColors.blue; // デフォルトは青色

    return (
        <>
            {positions.map((position, index) => (
                <Marker
                    key={index}
                    position={{ lat: position.lat, lng: position.lng }}
                    icon={icon}
                    onClick={() => setSelectedPosition(position)}
                />
            ))}
            {selectedPosition && (
                <InfoWindowContent
                    selected={selectedPosition}
                    onClose={() => setSelectedPosition(null)}
                />
            )}
        </>
    );
};

export default Pin;
