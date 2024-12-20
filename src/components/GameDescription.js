import React, { useEffect, useState } from 'react';

const GameDescription = ({ gameId, onBack }) => {
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGameDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`, {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': 'a977a05f28msh792f536e5e52401p11089fjsnd4f8baff26e4',
                        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch game details');
                }

                const gameDetails = await response.json();
                setGame(gameDetails);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGameDetails();
    }, [gameId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {game && (
                <div>
                    <h2>{game.title}</h2>
                    <p><strong>Genre:</strong> {game.genre}</p>
                    <p><strong>Description:</strong> {game.short_description}</p>
                    <img src={game.thumbnail} alt={game.title} />
                    <p>
                        <a href={game.game_url} target="_blank" rel="noopener noreferrer">
                            Play Now
                        </a>
                    </p>
                </div>
            )}
            <button onClick={onBack}>Back to List</button>
        </div>
    );
};

export default GameDescription;
