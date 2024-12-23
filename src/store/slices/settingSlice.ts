import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import i18n from '../../configs/i18n'
import { SettingState } from '../../configs/types/setting'

const initialState: SettingState = {
    language: i18n.language,
}

const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        changeLanguage(state, action: PayloadAction<string>) {
            state.language = action.payload
            i18n.changeLanguage(action.payload)
        },
    },
})

export const { changeLanguage } = settingSlice.actions

export default settingSlice.reducer
