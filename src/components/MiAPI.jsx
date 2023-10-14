import React, { useState, useEffect } from 'react';

function MiApi({ searchTerm, ordenAscendente }) {
    const [info, setInfo] = useState([]);

    useEffect(() => {
        const consultarApi = async () => {
            const url = 'https://free-epic-games.p.rapidapi.com/free';
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'ed9bf9c8dbmsh95022482b46ef08p10c45djsnb5366fbaef2a',
                    'X-RapidAPI-Host': 'free-epic-games.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const data = await response.json();
                if (data.freeGames && data.freeGames.current && data.freeGames.upcoming) {
                    const allGames = [...data.freeGames.current, ...data.freeGames.upcoming];
                    setInfo(allGames.map((item) => ({
                        gameTitle: item.title,
                        seller: item.seller.name,
                        keyImage: item.keyImages[0].url 
                    })));
                } else {
                    console.error('Data format is not as expected:', data);
                }
            } catch (error) {
                console.error('There was an error in the procedure:', error.message);
            }
        };

        consultarApi();
    }, []);

    const sortedInfo = info.sort((a, b) => {
        if (ordenAscendente) {
            return a.gameTitle.localeCompare(b.gameTitle);
        } else {
            return b.gameTitle.localeCompare(a.gameTitle);
        }
    });

    const filteredInfo = sortedInfo.filter((item) => {
        const isTitleMatched = item.gameTitle.toLowerCase().includes(searchTerm.toLowerCase());
        const isSellerMatched = item.seller.toLowerCase().includes(searchTerm.toLowerCase());
        return isTitleMatched || isSellerMatched;
    });

    return (
        <section className='gamegallery'>
            {filteredInfo.map((item, index) => (
                <div key={index}>
                    <img src={item.keyImage} alt={item.gameTitle} />
                    <p>{item.gameTitle}</p>
                    <p>Seller: {item.seller}</p>
                </div>
            ))}
        </section>
    );
}

export default MiApi;






