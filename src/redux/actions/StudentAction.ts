import { StudentData,AddStudent,EditStudent, DeleteStudent } from '../Types/studentTypes';

export const addStudent = (student: StudentData): AddStudent => {
  return {
    type: 'ADD_STUDENT',
    payload: student,
  };
};

export const editStudent = (student: StudentData): EditStudent => {
    return {
      type: 'UPDATE_STUDENT',
      payload: student,
    };
  };

export const deleteStudent = (studentId: number): DeleteStudent => {
  return {
    type: 'DELETE_STUDENT',
    payload: studentId,
  };
};