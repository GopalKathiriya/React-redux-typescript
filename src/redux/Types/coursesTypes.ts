export interface CourseData {
    id:number;
    name:string;
    durationInMonths:string;
}

export type CourseState = CourseData[];

export interface RootCourseState {
    courseReducer: CourseData[]
}


export interface CourseList {
    type:'COURSE_LIST';
    payload:CourseData;
}

export interface AddCourse {
    type:'ADD_COURSE';
    payload:CourseData;
}

export interface EditCourse{
    type:'UPDATE_COURSE';
    payload:CourseData
}

export type CourseAction = CourseList | AddCourse |EditCourse