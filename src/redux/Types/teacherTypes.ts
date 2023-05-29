export interface TeacherData{
    id:number;
    name:string;
    age:number;
    subject:string;
    college:string;
}

export type TeacherState = TeacherData[];

export interface RootTeacherState {
    teacherReducer: TeacherData[]
}

export interface AddTeacher{
    type:'ADD_TEACHER';
    payload:TeacherData;
}

export interface EditTeacher{
    type:'UPDATE_TEACHER';
    payload:TeacherData;
}

export interface DeleteTeacher{
    type:'DELETE_TEACHER';
    payload:number;
}

export type TeacherAction =  AddTeacher | EditTeacher | DeleteTeacher