import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

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
                    console.error('Formato no esta correcto:', data);
                }
            } catch (error) {
                console.error('Hubo un error en el procedimiento:', error.message);
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
                <Card key={index}>
                    <Card.Img className="cards" src={item.keyImage} alt={item.gameTitle} />
                    <Card.Title>{item.gameTitle}</Card.Title>
                    <Card.Text>Seller: {item.seller}</Card.Text>
                </Card>
            ))}
        </section>
    );
}

export default MiApi;






