import {
  TeacherAction,
  TeacherData,
  TeacherState,
} from "../Types/teacherTypes";

const teacher = localStorage.getItem("teacher");
const intialTeacher = teacher ? JSON.parse(teacher) : {};

export const teacherReducer = (
  data: TeacherState = teacher ? intialTeacher : [],
  action: TeacherAction
): TeacherState => {
  switch (action.type) {
    case "ADD_TEACHER":
      localStorage.setItem(
        "teacher",
        JSON.stringify([...data, action.payload])
      );
      return [...data, action.payload];

    case "UPDATE_TEACHER":
      const updatedTeacher = data.map((item: TeacherData) =>
        item.id === action.payload.id ? action.payload : item
      );
      localStorage.setItem("teacher", JSON.stringify([...updatedTeacher]));
      return [...updatedTeacher];

    case "DELETE_TEACHER":
      const deletedTeacher = data.filter(
        (teacher: TeacherData) => teacher.id !== action.payload
      );
      localStorage.setItem("teacher", JSON.stringify([...deletedTeacher]));
      return [...deletedTeacher];

    default:
      return data;
  }
};
