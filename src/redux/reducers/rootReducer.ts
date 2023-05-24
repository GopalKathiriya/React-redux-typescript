import {combineReducers} from 'redux'
import {studentReducer} from './studentReducer'
import {teacherReducer} from './teacherReducer'
import {courseReducer} from './courseReducer'
// import { StudentReducer } from '../Types/studentTypes'

export default combineReducers({

    studentReducer,
    teacherReducer,
    courseReducer,
})