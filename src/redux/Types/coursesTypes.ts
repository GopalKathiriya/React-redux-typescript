export interface CourseData {
    id:number;
    name:string;
    durationInMonths:string;
}

export type CourseState = CourseData[];

export interface RootCourseState {
    courseReducer: CourseData[]
}

export interface AddCourse {
    type:'ADD_COURSE';
    payload:CourseData;
}

export interface EditCourse{
    type:'UPDATE_COURSE';
    payload:CourseData
}

export interface DeleteCourse{
    type:'DELETE_COURSE';
    payload: number
}

export type CourseAction =  AddCourse | EditCourse | DeleteCourse