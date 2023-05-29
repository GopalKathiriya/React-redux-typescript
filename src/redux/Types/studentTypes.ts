export interface StudentData {
    id:number;
    name:string;
    age:number;
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

export interface DeleteStudent {
    type: 'DELETE_STUDENT';
    payload: number; 
  }
  

export type StudentAction =  AddStudent | EditStudent | DeleteStudent