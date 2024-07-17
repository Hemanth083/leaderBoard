import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import { FaUser, FaStopwatch } from 'react-icons/fa';
import { addScore } from './store/leaderboardSlice';
import './leaderBorad.css';

const Leaderboard: React.FC = () => {
    const scores = useSelector((state: RootState) => state.leaderboard.scores);
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [score, setScore] = useState('');
    const [newScoreIndex, setNewScoreIndex] = useState<number | null>(null);

    const handleAddScore = () => {
        const [minutes, seconds, milliseconds] = score.split(':').map(Number);
        const totalMilliseconds = (minutes * 60 * 1000) + (seconds * 1000) + milliseconds;

        const newScore = { username, score: totalMilliseconds };
        dispatch(addScore(newScore));

        setUsername('');
        setScore('');
        setNewScoreIndex(scores.length); // Set index for the new score

        // Reset the newScoreIndex after a delay
        setTimeout(() => {
            setNewScoreIndex(null);
        }, 1000); // Adjust timing as needed
    };

    const formatScore = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = ms % 1000;
        return `${minutes}:${seconds}:${milliseconds}`;
    };

    return (
        <>
            <div className="leaderboard-container">
                <div className='content'>
                    <h1>FASTEST OF TODAY</h1>
                    <li className='leaderboard-item header'>
                        <div className='align'><FaUser className="icon" /> <h1>Name</h1> </div>
                        <div className='align'><FaStopwatch className="icon" /> <h1>Time</h1></div>
                    </li>
                    <ul className="leaderboard-list">
                        <div className='imageBackground'>
                            {scores.map((score, index) => (
                                <li
                                    key={index}
                                    className={`leaderboard-item ${newScoreIndex === index ? 'scale-up' : ''}`}
                                    style={{ backgroundColor: getBackgroundColor(index) }}
                                >
                                    <div className='align'>
                                        <p className='number'>{index + 1}</p>
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
                            placeholder="Username"
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
                    {/* <img src="https://github.com/LazyIdli-SoftwareTeam/internshal_project_software/blob/master/assets/BANER-SHANNH%201.png?raw=true" alt="Footer" /> */}
                </footer>
            </div>
        </>
    );
};

const getBackgroundColor = (index: number) => {
    if (index === 0) return 'gold';
    if (index === 1) return 'silver';
    if (index === 2) return '#D2B48C';
    return 'rgba(1, 1, 1, 0.5)';
};

export default Leaderboard;
