import { useSelector } from "react-redux";
import { RootCourseState } from "../redux/Types/coursesTypes";
import { RootStudentState } from "../redux/Types/studentTypes";
import { RootTeacherState } from "../redux/Types/teacherTypes";

export const Selectors = () => {
  const courses = useSelector((state: RootCourseState) => state.courseReducer);
  const students = useSelector((state: RootStudentState) => state.studentReducer);
  const teachers = useSelector((state: RootTeacherState) => state.teacherReducer);
  return { courses, students,teachers };
};
