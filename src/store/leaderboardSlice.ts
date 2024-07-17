import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Score {
    id: string;
    username: string;
    score: number;
}

interface LeaderboardState {
    scores: Score[];
}

const initialState: LeaderboardState = {
    scores: [
        { id: '_1', username: 'Hemanth', score: 120000 },
        { id: '_2', username: 'Akash', score: 150000 },
        { id: '_3', username: 'Karan', score: 180000 },
        { id: '_4', username: 'Motte', score: 210000 },
        { id: '_5', username: 'King', score: 240000 },
        { id: '_6', username: 'YOooo', score: 270000 },
        { id: '_7', username: 'JO', score: 300000 },
        { id: '_8', username: 'JJ', score: 330000 },
        { id: '_9', username: 'Neo', score: 360000 },
        { id: '_10', username: 'Aligg', score: 390000 },
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
