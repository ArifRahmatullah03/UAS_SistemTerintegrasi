import React, { useState } from 'react';
import './GameList.css';

const GameList = ({ onGameClick }) => {
    const [genre, setGenre] = useState('');
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!genre.trim()) {
            alert('Please enter a genre!');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games`, {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'a977a05f28msh792f536e5e52401p11089fjsnd4f8baff26e4',
                    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch games list');
            }

            const allGames = await response.json();
            const filteredGames = allGames.filter((game) =>
                game.genre.toLowerCase().includes(genre.toLowerCase())
            );
            setGames(filteredGames);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="game-list-container">
            <div className="search-bar">
                <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    placeholder="Enter game genre (e.g., shooter)"
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <ul className="games-list">
                {games.length > 0 ? (
                    games.map((game) => (
                        <li key={game.id}>
                            <div>
                                <p className="game-title">{game.title}</p>
                                <p className="genre">{game.genre}</p>
                            </div>
                            <button
                                className="view-button"
                                onClick={() => onGameClick(game.id)}
                            >
                                View
                            </button>
                        </li>
                    ))
                ) : (
                    !loading && <p className="no-games">No games found.</p>
                )}
            </ul>
        </div>
    );
};

export default GameList;
