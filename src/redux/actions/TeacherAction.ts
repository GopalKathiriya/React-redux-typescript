import { AddTeacher, TeacherData ,EditTeacher} from "../Types/teacherTypes";

export const addTeacher = (teacher: TeacherData): AddTeacher => {
    return {
      type: 'ADD_TEACHER',
      payload: teacher,
    };
  };

  export const editTeacher  = (teacher: TeacherData): EditTeacher => {
    return {
      type: 'UPDATE_TEACHER',
      payload: teacher,
    };
  };