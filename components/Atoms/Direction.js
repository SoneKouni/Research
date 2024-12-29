import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer, StandaloneSearchBox } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '750px',
};

const center = {
    lat: 34.19861, // 山口の緯度
    lng: 131.575, // 山口の経度
};

const Direction = () => {
    const APIKey = process.env.NEXT_PUBLIC_API_KEY;
    const [pointA, setPointA] = useState(null); // 地点A
    const [pointB, setPointB] = useState(null); // 地点B
    const [directions, setDirections] = useState(null); // ルート情報
    const [error, setError] = useState(null);
    const searchBoxARef = useRef(null);
    const searchBoxBRef = useRef(null);

    // 地図クリック時の処理
    const handleMapClick = (event) => {
        const clickedLocation = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };

        if (!pointA) {
            setPointA(clickedLocation); // 最初のクリックで地点Aを設定
        } else if (!pointB) {
            setPointB(clickedLocation); // 次のクリックで地点Bを設定
        }
    };

    const handlePlacesChanged = (ref, setPoint) => {
        const places = ref.current.getPlaces();
        if (places.length === 0) return;

        const place = places[0];
        const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
        };
        setPoint(location);
    };

    const handleSearch = () => {
        handlePlacesChanged(searchBoxARef, setPointA);
        handlePlacesChanged(searchBoxBRef, setPointB);
    };

    useEffect(() => {
        if (pointA && pointB) {
            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route(
                {
                    origin: pointA,
                    destination: pointB,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        setDirections(result);
                    } else {
                        setError('ルートを取得できませんでした。');
                    }
                }
            );
        }
    }, [pointA, pointB]);

    return (
        <LoadScript googleMapsApiKey={APIKey} libraries={['places']}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <StandaloneSearchBox
                    onLoad={ref => (searchBoxARef.current = ref)}
                >
                    <input
                        type="text"
                        placeholder="地点Aを検索"
                        style={{ boxSizing: 'border-box', border: '1px solid transparent', width: '240px', height: '32px', marginRight: '10px', padding: '0 12px', borderRadius: '3px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)', fontSize: '14px', outline: 'none', textOverflow: 'ellipses' }}
                    />
                </StandaloneSearchBox>
                <StandaloneSearchBox
                    onLoad={ref => (searchBoxBRef.current = ref)}
                >
                    <input
                        type="text"
                        placeholder="地点Bを検索"
                        style={{ boxSizing: 'border-box', border: '1px solid transparent', width: '240px', height: '32px', marginRight: '10px', padding: '0 12px', borderRadius: '3px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)', fontSize: '14px', outline: 'none', textOverflow: 'ellipses' }}
                    />
                </StandaloneSearchBox>
                <button onClick={handleSearch} style={{ padding: '10px 20px', fontSize: '14px' }}>検索</button>
            </div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onClick={handleMapClick}
            >
                {pointA && <Marker position={pointA} />}
                {pointB && <Marker position={pointB} />}
                {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
            {error && <div>{error}</div>}
        </LoadScript>
    );
};

export default Direction;