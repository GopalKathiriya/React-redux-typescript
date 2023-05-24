import { CourseAction, CourseData, CourseState } from "../Types/coursesTypes";

const course = localStorage.getItem("course");
const intialCourse = course ? JSON.parse(course) : [];

export const courseReducer = (
  data: CourseState = course ? intialCourse : [],
  action: CourseAction
): CourseState => {
  switch (action.type) {
    case "ADD_COURSE":
      localStorage.setItem("course", JSON.stringify([...data, action.payload]));
      return [...data, action.payload];

    case "UPDATE_COURSE":
      const updatedCourse = data.map((item: CourseData) =>
        item.id === action.payload.id ? action.payload : item
      );
      localStorage.setItem("course", JSON.stringify([...updatedCourse]));

      return [...updatedCourse];

    default:
      return data;
  }
};
