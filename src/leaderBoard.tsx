import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import { FaUser, FaStopwatch } from 'react-icons/fa';
import { addScore } from './store/leaderboardSlice';
import './leaderBorad.css'; // Adjust CSS file name as per your project

const Leaderboard: React.FC = () => {
    const scores = useSelector((state: RootState) => state.leaderboard.scores);
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [score, setScore] = useState('');
    const [newScoreId, setNewScoreId] = useState<string | null>(null);

    // Function to handle adding a new score
    const handleAddScore = () => {
        const [minutes, seconds, milliseconds] = score.split(':').map(Number);
        const totalMilliseconds = (minutes * 60 * 1000) + (seconds * 1000) + milliseconds;

        const newScore = { id: generateUniqueId(), username, score: totalMilliseconds };
        dispatch(addScore(newScore));

        // Clear input fields and set animation trigger
        setUsername('');
        setScore('');
        setNewScoreId(newScore.id);

        setTimeout(() => {
            setNewScoreId(null);
        }, 1000);
    };

    // Function to generate unique IDs for scores
    const generateUniqueId = () => '_' + Math.random().toString(36).substr(2, 9);

    // Function to format score from milliseconds to MM:SS:MS format
    const formatScore = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = ms % 1000;
        return `${minutes}:${seconds}:${milliseconds}`;
    };

    // Array of image URLs for scrolling footer carousel
    const imageUrls = [
        "https://www.topgear.com/sites/default/files/news-listicle/image/2022/06/0-Best-F1-tracks.jpg",
        "https://static01.nyt.com/images/2023/09/16/multimedia/16sp-singapore-races-inyt-01-hgvc/16sp-singapore-races-inyt-01-hgvc-videoSixteenByNine3000.jpg",
        "https://media.wired.com/photos/6557e61b8ba298d25d23d7f5/16:9/w_2400,h_1350,c_limit/Inside-The-Race-to-Secure-the-Formula-1-Las-Vegas-Grand-Prix-Security-GettyImages-1787267227.jpg"
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
        }, 1000); // Change image every 4 seconds

        return () => clearInterval(interval);
    }, []);

    // Function to get background color based on index
    const getBackgroundColor = (index: number) => {
        if (index === 0) return 'gold';
        if (index === 1) return 'silver';
        if (index === 2) return '#D2B48C';
        return 'rgba(1, 1, 1, 0.5)';
    };

    return (
        <>
            <div className="leaderboard-container">
                <div className='content'>
                    <div className='nav'>
                        <h1>FASTEST OF TODAY</h1>
                        <li className='leaderboard-item header'>
                            <div className='align'><FaUser className="icon" /> <h1>Name</h1> </div>
                            <div className='align'><FaStopwatch className="icon" /> <h1>Time</h1></div>
                        </li>
                    </div>
                    <ul className="leaderboard-list">
                        <div className='imageBackground'>
                            {scores.map((score) => (
                                <li
                                    key={score.id}
                                    id={score.id}
                                    className={`leaderboard-item ${newScoreId === score.id ? 'scale-up' : ''}`}
                                    style={{ backgroundColor: getBackgroundColor(scores.indexOf(score)) }}
                                >
                                    <div className='align'>
                                        <p className='number'>{scores.indexOf(score) + 1}</p>
                                        <p>{score.username}</p>
                                    </div>
                                    <p>{formatScore(score.score)}</p>
                                </li>
                            ))}
                        </div>
                    </ul>
                </div>
                <div className='input'>
                    <div className="add-score-form">
                        <input
                            type="text"
                            placeholder="Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="MM:SS:MS"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                        />
                        <button onClick={handleAddScore}>Add Score</button>
                    </div>
                </div>
            </div>
            <div className='footer'>
                <footer className="scrolling-footer">
                    <div className="carousel">
                        {imageUrls.map((imageUrl, index) => (
                            <img
                                key={index}
                                src={imageUrl}
                                alt={`Footer Image ${index + 1}`}
                                className={`carousel-item ${index === currentImageIndex ? 'active' : ''}`}
                            />
                        ))}
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Leaderboard;
