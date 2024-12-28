import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '500px',
};

const center = {
    lat: 34.19861, // 山口の緯度
    lng: 131.575, // 山口の経度
};

const Map = () => {
    return (
        <LoadScript googleMapsApiKey="AIzaSyCXng6CFfzTQxVIK9tMxq0PORoAtCBsT1o"> {/* ここにAPIキーを入力 */}
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;
