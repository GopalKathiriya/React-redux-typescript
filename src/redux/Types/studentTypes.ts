export interface StudentData {
    id:number;
    name:string;
    age:string;
    grades:string;
    college:string;
    city:string;
}

export type StudentState = StudentData[];

export interface RootStudentState {
    studentReducer: StudentData[]
}

export interface AddStudent {
    type:'ADD_STUDENT';
    payload:StudentData;
}

export interface EditStudent{
    type:'UPDATE_STUDENT';
    payload:StudentData
}

export type StudentAction =  AddStudent | EditStudent