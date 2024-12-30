import Head from 'next/head';
import SearchRan from '../components/Atoms/SearchRan';
import Map from '../components/Atoms/Map';
import Button from '../components/Atoms/Button';
import Autocomplete from '../components/Molcules/Autocomplete';
import StsndaloneSearchBox from '@react-google-maps/api';

export default function Home() {
    const handleButtonClick = () => {
        console.log('Button clicked');
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>橋梁迂回路</h1>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <StsndaloneSearchBox></StsndaloneSearchBox>
                <SearchRan></SearchRan>
                {/* <Autocomplete></Autocomplete> */}
                <Button></Button>
            </div>
            <div style={{ height: '20px' }}></div> {/* 空白行 */}
            <Map />
        </div>
    );
}