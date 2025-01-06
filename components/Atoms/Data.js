import React, { useEffect, useState } from 'react';

const API_URL = "https://k-lab2.herokuapp.com/getopendata?ApiKey=59449ec6376845338c2f8010264f6c94"; // APIのエンドポイントを設定

const Data = () => {
    const [bridgeData, setBridgeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // データを取得する関数
        const fetchBridgeData = async () => {
            try {
                const response = await fetch(`${API_URL}?key=${API_KEY}`);
                if (!response.ok) {
                    throw new Error(`HTTPエラー! 状態: ${response.status}`);
                }
                const data = await response.json();
                setBridgeData(data); // データをステートに設定
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); // ローディング完了
            }
        };

        fetchBridgeData();
    }, []);

    if (loading) return <p>ロード中...</p>;
    if (error) return <p>エラー: {error}</p>;

    return (
        <div>
            <h1>橋の情報</h1>
            <p><strong>緯度:</strong> {bridgeData.Lat}</p>
            <p><strong>経度:</strong> {bridgeData.Lng}</p>
            {/* 必要に応じて他のプロパティを表示 */}
        </div>
    );
};

export default Data;
