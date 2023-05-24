import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
  TableHead,
} from "@mui/material";
// import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useSelector, useDispatch } from "react-redux";
import AddCourseModal from "./AddCourseModal";
import { CourseData, RootCourseState } from "../../redux/Types/coursesTypes";
import { addCourse, editCourse } from "../../redux/actions/CourseAction";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Courses: React.FC = () => {
  const courses = useSelector((state: RootCourseState) => state.courseReducer);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseData | null>(null);

  const handleOpenModal = () => {
    setModalOpen(true);
    setEditingCourse(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (name: string, durationInMonths: string) => {
    if (editingCourse !== null) {
      const updatedCourse: CourseData = {
        id: editingCourse.id,
        name,
        durationInMonths,
      };
      dispatch(editCourse(updatedCourse));
    } else {
      const newCourse: CourseData = {
        id: Date.now(),
        name,
        durationInMonths,
      };
      dispatch(addCourse(newCourse));
    }
    handleCloseModal();
  };

  const handleEdit = (courseId: number) => {
    const courseToEdit = courses.find((course) => course.id === courseId);
    if (courseToEdit) {
      setEditingCourse(courseToEdit);
      setModalOpen(true);
    }
  };

  return (
    <>
      <Link onClick={() => navigate("/")}>Back To Main Page</Link>

      <div>
        <Button   sx={{ margin: "24px" }} variant="contained" onClick={handleOpenModal}>
          Add Course
        </Button>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="table-cell">Name</TableCell>
              <TableCell className="table-cell">Duration In Months</TableCell>
              <TableCell className="table-cell">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.durationInMonths}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(course.id)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddCourseModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        editingCourse={editingCourse}
      />
    </>
  );
};

export default Courses;
