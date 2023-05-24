import { CourseAction, CourseData, CourseState } from "../Types/coursesTypes";


export const courseReducer=(data:CourseState = [], action: CourseAction) :CourseState=>{
    switch(action.type){
        case 'ADD_COURSE':
            return [...data,action.payload]

        case 'UPDATE_COURSE':

        const updatedCourse = data.map((item:CourseData) =>
            item.id === action.payload.id ? action.payload : item
          );
          return [...updatedCourse]
           
            
        default:
                return data;
    }
}