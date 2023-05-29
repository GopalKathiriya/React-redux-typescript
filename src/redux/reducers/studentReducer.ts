import {
  StudentAction,
  StudentState,
  StudentData,
} from "../Types/studentTypes";
const student = localStorage.getItem("student");
const intialStudent = student ? JSON.parse(student) : {};

export const studentReducer = (
  data: StudentState = student ? intialStudent : [],
  action: StudentAction
): StudentState => {
  switch (action.type) {
    case "ADD_STUDENT":
      localStorage.setItem(
        "student",
        JSON.stringify([...data, action.payload])
      );
      return [...data, action.payload];

    case "UPDATE_STUDENT":
      const updatedStudent = data.map((item: StudentData) =>
        item.id === action.payload.id ? action.payload : item
      );
      localStorage.setItem("student", JSON.stringify([...updatedStudent]));
      return [...updatedStudent];

    case "DELETE_STUDENT":
      const deletedStudent = data.filter(
        (student: StudentData) => student.id !== action.payload
      );
      localStorage.setItem("student", JSON.stringify([...deletedStudent]));
      return [...deletedStudent];

    default:
      return data;
  }
};
