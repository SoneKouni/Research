import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '500px',
};

const defaultCenter = {
    lat: 34.19861, // 山口の緯度
    lng: 131.575, // 山口の経度
};

const Point = () => {
    const [selectedPoints, setSelectedPoints] = useState([]);

    // 地図をクリックしたときのイベントハンドラ
    const handleMapClick = (event) => {
        const { latLng } = event;
        const lat = latLng.lat();
        const lng = latLng.lng();
        setSelectedPoints((prevPoints) => [...prevPoints, { lat, lng }]); // 配列に新しいポイントを追加
    };

    // マーカーをクリックして削除するイベントハンドラ
    const handleMarkerClick = (index) => {
        setSelectedPoints((prevPoints) => prevPoints.filter((_, i) => i !== index)); // クリックされたポイントを削除
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyCXng6CFfzTQxVIK9tMxq0PORoAtCBsT1o"> {/* APIキーをここに入力 */}
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={defaultCenter}
                zoom={10}
                onClick={handleMapClick} // 地図上のクリックイベント
            >
                {selectedPoints.map((point, index) => (
                    <Marker
                        key={index}
                        position={point}
                        onClick={() => handleMarkerClick(index)} // マーカーをクリックしたときのイベント
                    />
                ))}
            </GoogleMap>

            {/* 選択されたポイントを一覧で表示 */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <h3>選択されたポイント:</h3>
                {selectedPoints.length > 0 ? (
                    <ul>
                        {selectedPoints.map((point, index) => (
                            <li key={index}>
                                緯度: {point.lat}, 経度: {point.lng}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>ポイントが選択されていません。</p>
                )}
            </div>
        </LoadScript>
    );
};

export default Point;
