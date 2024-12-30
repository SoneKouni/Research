import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '750px',
};

const center = {
    lat: 34.19861, // 山口の緯度
    lng: 131.575, // 山口の経度
};

const APIKey = () => {
    const [apiKey, setApiKey] = useState(''); // APIキー
    const [bridges, setBridges] = useState([]); // 橋梁情報
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setApiKey(e.target.value);
    };

    const handleButtonClick = () => {
        if (apiKey) {
            fetch(`https://api.example.com/bridges?apikey=${apiKey}`)
                .then(response => response.json())
                .then(data => setBridges(data))
                .catch(error => setError('橋梁情報を取得できませんでした。'));
        }
    };

    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                <input
                    type="text"
                    placeholder="59449ec6376845338c2f8010264f6c94"
                    value={apiKey}
                    onChange={handleInputChange}
                    style={{ width: '300px', padding: '10px', fontSize: '14px', marginRight: '10px' }}
                />
                <button onClick={handleButtonClick} style={{ padding: '10px 20px', fontSize: '14px' }}>設定</button>
            </div>
            {apiKey && (
                <LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                    >
                        {bridges.map((bridge, index) => (
                            <Marker
                                key={index}
                                position={{ lat: bridge.Lat, lng: bridge.Lng }}
                                label={bridge.id.toString()}
                            />
                        ))}
                    </GoogleMap>
                    {error && <div>{error}</div>}
                </LoadScript>
            )}
        </div>
    );
};

export default APIKey;