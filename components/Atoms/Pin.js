import React, { useEffect, useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

const pinColors = {
    blue: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    green: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    yellow: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
    grey: 'http://maps.google.com/mapfiles/ms/icons/grey-dot.png',
};

const Pin = ({ color }) => {
    const [positions, setPositions] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [blockedPositions, setBlockedPositions] = useState([]);

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
                const positions = data.map(bridge => ({
                    lat: parseFloat(bridge.Lat),
                    lng: parseFloat(bridge.Lng),
                    name: bridge.Name,
                    address: bridge.Address,
                    office: bridge.Office,
                    tel: bridge.Tel,
                }));
                setPositions(positions);
            } catch (err) {
                console.error('データの取得に失敗しました:', err);
            }
        };

        fetchBridgeData();
    }, []);

    const icon = pinColors[color] || pinColors.blue; // デフォルトは青色

    const handleBlockClick = (position) => {
        setBlockedPositions([...blockedPositions, position]);
        alert('通行止めにされました');
    };

    return (
        <>
            {positions.map((position, index) => (
                <Marker
                    key={index}
                    position={{ lat: position.lat, lng: position.lng }}
                    icon={blockedPositions.includes(position) ? 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png' : icon}
                    onClick={() => setSelectedPosition(position)}
                />
            ))}
            {selectedPosition && (
                <InfoWindow
                    position={{ lat: selectedPosition.lat + 0.001, lng: selectedPosition.lng }}
                    onCloseClick={() => setSelectedPosition(null)}
                >
                    <div>
                        <h4>{selectedPosition.name}</h4>
                        <p>所在地： {selectedPosition.address}</p>
                        <p>事務所： {selectedPosition.office}</p>
                        <p>Tel： {selectedPosition.tel}</p>
                        <button onClick={() => handleBlockClick(selectedPosition)}>通行止め</button>
                    </div>

                </InfoWindow>
            )}
        </>
    );
};

export default Pin;
