import { AddTeacher, TeacherData ,EditTeacher, DeleteTeacher} from "../Types/teacherTypes";

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

  export const deleteTeacher =(teacherId: number):DeleteTeacher =>{
    return{
      type: 'DELETE_TEACHER',
      payload: teacherId,
    }
  }