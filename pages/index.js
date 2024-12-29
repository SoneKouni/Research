import Direction from '../components/Atoms/Direction';

export default function HomePage() {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>橋梁迂回路</h1>
            {/* 他のコンテンツ */}
            <Direction />
        </div>
    );
}