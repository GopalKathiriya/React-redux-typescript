import { StudentAction,StudentState, StudentData } from "../Types/studentTypes";

// const initialState : RootStudentState = {
//     students :[]
// }

// export const studentReducer=(state:RootStudentState = initialState, action: StudentAction) :RootStudentState{
//     switch(action.type){

        export const studentReducer=(data:StudentState=[], action: StudentAction) :StudentState=>{
            switch(action.type){
        case 'ADD_STUDENT':
            // return{
            //     // ...state,
            //     students:[...data,action.data]
            // }
            return [...data,action.payload]


           

        case 'UPDATE_STUDENT':
            const updatedStudent = data.map((item:StudentData) =>
            item.id === action.payload.id ? action.payload : item
          );
          return [...updatedStudent]
           
          ;
            // return{
            //     students:state.students.map((student)=>student.id === action.payload.id)
            // }
            
        default:
                return data;
    }
}