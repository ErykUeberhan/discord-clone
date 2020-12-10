import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        channelId: null,
        channelName: null,
        categoryId: null,
        categoryName: null,
        serverId: null,
        serverName: null,
        mobileMenu: null,
    },
    reducers: {
        setChannelInfo: (state, action) => {
            state.channelId = action.payload.channelId;
            state.channelName = action.payload.channelName;
        },
        setCategoryInfo: (state, action) => {
            state.categoryId = action.payload.categoryId;
            state.categoryName = action.payload.categoryName;
        },
        setServerInfo: (state, action) => {
            state.serverId = action.payload.serverId;
            state.serverName = action.payload.serverName;
        },
        setMobileVersion: (state, action) => {
            state.mobileMenu = action.payload.mobileMenu;
        },
    },
});

export const { setChannelInfo, setCategoryInfo, setServerInfo, setMobileVersion } = appSlice.actions;

export const selectChannelId = state => state.app.channelId;
export const selectChannelName = state => state.app.channelName;

export const selectCategoryId = state => state.app.categoryId;
export const selectCategoryName = state => state.app.categoryName;

export const selectServerId = state => state.app.serverId;
export const selectServerName = state => state.app.serverName;

export const selectMobileMenu = state => state.app.mobileMenu;

export default appSlice.reducer;
