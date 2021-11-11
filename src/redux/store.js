import { configureStore } from '@reduxjs/toolkit'
import settingSlice from './reducers/main'

export default configureStore({
  reducer: {
    settings: settingSlice,
  },
})