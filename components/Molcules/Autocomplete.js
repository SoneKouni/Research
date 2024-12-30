import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const Autocomplete = ({ onSearch }) => {
    const [queryA, setQueryA] = useState('');
    const [queryB, setQueryB] = useState('');
    const searchBoxARef = useRef(null);
    const searchBoxBRef = useRef(null);

    const handlePlacesChanged = (ref, setQuery) => {
        const places = ref.current.getPlaces();
        if (places.length === 0) return;

        const place = places[0];
        setQuery(place.formatted_address);
    };

    const handleSearch = () => {
        handlePlacesChanged(searchBoxARef, setQueryA);
        handlePlacesChanged(searchBoxBRef, setQueryB);
        onSearch(queryA, queryB);
    };

    return (
        <LoadScript googleMapsApiKey=".env">
            <GoogleMap
                id="searchbox-example"
                mapContainerStyle={{ height: "400px", width: "800px" }}
                zoom={10}
                center={{ lat: -34.397, lng: 150.644 }}
            >
                <div style={{ display: 'flex', gap: '10px' }}>
                    <StandaloneSearchBox
                        onLoad={ref => (searchBoxARef.current = ref)}
                        onPlacesChanged={() => handlePlacesChanged(searchBoxARef, setQueryA)}
                    >
                        <input
                            type="text"
                            id="locationA"
                            value={queryA}
                            onChange={(e) => setQueryA(e.target.value)}
                            placeholder="地点A"
                        />
                    </StandaloneSearchBox>
                    <StandaloneSearchBox
                        onLoad={ref => (searchBoxBRef.current = ref)}
                        onPlacesChanged={() => handlePlacesChanged(searchBoxBRef, setQueryB)}
                    >
                        <input
                            type="text"
                            id="locationB"
                            value={queryB}
                            onChange={(e) => setQueryB(e.target.value)}
                            placeholder="地点B"
                        />
                    </StandaloneSearchBox>
                    <button onClick={handleSearch}>検索</button>
                </div>
            </GoogleMap>
        </LoadScript>
    );
};

export default Autocomplete;