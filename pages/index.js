import Direction from '../components/Atoms/Direction';
import Search from '../components/Atoms/Search';
import { Data } from '@react-google-maps/api';
import Pin from '../components/Atoms/Pin';

export default function HomePage() {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>橋梁迂回路</h1>
            {/* 他のコンテンツ */}
            <Search />
            <Direction />
            <Data />
        </div>
    );
}