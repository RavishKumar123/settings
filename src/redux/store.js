import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/main'

export default configureStore({
  reducer: {
    settings: counterReducer,
  },
})