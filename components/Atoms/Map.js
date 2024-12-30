import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '650px'
};

const center = {
    lat: 34.1859,
    lng: 131.4714
};

function Map() {
    const apiKey = "AIzaSyCXng6CFfzTQxVIK9tMxq0PORoAtCBsT1o"; // 取得したAPIキーをここに入力

    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                { /* Child components, such as markers, info windows, etc. */}
                <></>
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(Map);