import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
  TableHead,
  TablePagination,
} from "@mui/material";
import { useDispatch } from "react-redux";
import AddCourseModal from "./AddCourseModal";
import { CourseData } from "../../redux/Types/coursesTypes";
import {
  addCourse,
  deleteCourse,
  editCourse,
} from "../../redux/actions/CourseAction";
import { Selectors } from "../../utility/useSelector";
import NoData from "../NoData";

const Courses: React.FC = () => {
  const { courses } = Selectors();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseData | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const handleDelete = (courseId: number) => {
    dispatch(deleteCourse(courseId));
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const coursesToShow = courses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <div className="header-table">
        <Button
          className="btn-add"
          variant="contained"
          onClick={handleOpenModal}
        >
          Add Course
        </Button>
      </div>
      <div className="content">
        {courses.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="table-cell">Name</TableCell>
                  <TableCell className="table-cell">
                    Duration In Months
                  </TableCell>
                  <TableCell className="table-cell">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {coursesToShow.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.durationInMonths}</TableCell>
                    <TableCell>
                      <Button
                        className="btn-green"
                        variant="contained"
                        onClick={() => handleEdit(course.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="btn-green"
                        variant="contained"
                        onClick={() => handleDelete(course.id)}
                        sx={{ margin: "10px" }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={courses.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        ) : (
          <NoData/>
        )}
      </div>

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
