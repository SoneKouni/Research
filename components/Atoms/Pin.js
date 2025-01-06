import React, { useEffect, useState } from 'react';
import { Marker } from '@react-google-maps/api';

const pinColors = {
    blue: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    green: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    yellow: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
    grey: 'http://maps.google.com/mapfiles/ms/icons/grey-dot.png',
};

const Pin = ({ color }) => {
    const [positions, setPositions] = useState([]);

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
                console.log('API Response:', data); // デバッグ用

                // データの検証とマッピング
                const positions = data
                    .filter(bridge => bridge.Lat && bridge.Lng) // 緯度経度が存在するデータのみ
                    .map(bridge => ({
                        lat: parseFloat(bridge.Lat),
                        lng: parseFloat(bridge.Lng)
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
                <Marker key={index} position={position} icon={icon} />
            ))}
        </>
    );
};

export default Pin;
