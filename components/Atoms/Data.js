import React, { useEffect, useState } from 'react';

const Data = () => {
    const [bridgeData, setBridgeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // データを取得する関数
        const API_URL = "https://k-lab2.herokuapp.com/getopendata";
        const API_KEY = "9ea168d0f0b3459fa23a833b80739b2e";

        const fetchBridgeData = async () => {
            try {
                const response = await fetch(`${API_URL}?ApiKey=${API_KEY}`);
                if (!response.ok) {
                    throw new Error(`HTTPエラー! 状態: ${response.status}`);
                }
                const data = await response.json();
                setBridgeData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };


        fetchBridgeData();
    }, []);

    if (loading) return <p>ロード中...</p>;
    if (error) return <p>エラー: {error}</p>;

};

export default Data;
