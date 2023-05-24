import { TeacherAction, TeacherData, TeacherState } from "../Types/teacherTypes";


export const teacherReducer=(data:TeacherState=[], action: TeacherAction) :TeacherState=>{


    switch(action.type){
        case 'ADD_TEACHER':
            return [...data,action.payload]

        case 'UPDATE_TEACHER':
            
            const updatedTeacher = data.map((item:TeacherData) =>
            item.id === action.payload.id ? action.payload : item
          );
          return [...updatedTeacher]
            
        default:
                return data;
    }
}