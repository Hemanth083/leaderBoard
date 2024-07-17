// src/store/leaderboardSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Score {
    username: string;
    score: number;
}

interface LeaderboardState {
    scores: Score[];
}

const initialState: LeaderboardState = {
    scores: [
        { username: 'Hemanth', score: 120000 },
        { username: 'Akash', score: 150000 },
        { username: 'Karan', score: 180000 },
        { username: 'Motte', score: 210000 },
        { username: 'King', score: 240000 },
        { username: 'YOooo', score: 270000 },
        { username: 'JO', score: 300000 },
        { username: 'JJ', score: 330000 },
        { username: 'Neo', score: 360000 },
        { username: 'Aligg', score: 390000 },
    ],
};

const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {
        addScore: (state, action: PayloadAction<Score>) => {
            state.scores.push(action.payload);
            state.scores.sort((a, b) => a.score - b.score);
            if (state.scores.length > 10) {
                state.scores.pop();
            }
        },
    },
});

export const { addScore } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
