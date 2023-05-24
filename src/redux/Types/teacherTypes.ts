export interface TeacherData{
    id:number;
    name:string;
    age:string;
    subject:string;
    college:string;
}

// export interface TeacherState{
//     teachers : TeacherData[];
// }

export type TeacherState = TeacherData[];

export interface RootTeacherState {
    teacherReducer: TeacherData[]
}

export interface TeacherList {
    type:'TEACHER_LIST';
    payload:TeacherData;
}

export interface AddTeacher{
    type:'ADD_TEACHER';
    payload:TeacherData;
}

export interface EditTeacher{
    type:'UPDATE_TEACHER';
    payload:TeacherData;
}

export type TeacherAction =  TeacherList | AddTeacher | EditTeacher