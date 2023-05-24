import { AddCourse, CourseData, EditCourse } from '../Types/coursesTypes';

export const addCourse = (course: CourseData): AddCourse => {
  return {
    type: 'ADD_COURSE',
    payload: course,
  };
};

export const editCourse = (course: CourseData): EditCourse => {
    return {
      type: 'UPDATE_COURSE',
      payload: course,
    };
  };