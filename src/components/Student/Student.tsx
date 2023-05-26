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
import { StudentData } from "../../redux/Types/studentTypes";
import AddStudentModal from "./AddStudentModal";
import {
  addStudent,
  deleteStudent,
  editStudent,
} from "../../redux/actions/StudentAction";
import { Selectors } from "../../utility/useSelector";
import NoData from "../NoData";

const Student: React.FC = () => {
  const { students } = Selectors();

  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentData | null>(
    null
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenModal = () => {
    setModalOpen(true);
    setEditingStudent(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (
    name: string,
    age: number,
    grades: string,
    college: string,
    city: string
  ) => {
    if (editingStudent !== null) {
      const updatedStudent: StudentData = {
        id: editingStudent.id,
        name,
        age,
        grades,
        college,
        city,
      };
      dispatch(editStudent(updatedStudent));
    } else {
      const newStudent: StudentData = {
        id: Date.now(),
        name,
        age,
        grades,
        college,
        city,
      };
      dispatch(addStudent(newStudent));
    }
    handleCloseModal();
  };

  const handleEdit = (studentId: number) => {
    const studentToEdit = students.find((student) => student.id === studentId);
    if (studentToEdit) {
      setEditingStudent(studentToEdit);
      setModalOpen(true);
    }
  };

  const handleDelete = (studentId: number) => {
    dispatch(deleteStudent(studentId));
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const studentsToShow = students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <div className="header-table">
        <Button
          className="btn-add"
          variant="contained"
          onClick={handleOpenModal}
        >
          Add Student
        </Button>
      </div>
      <div className="content">
        {students.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="table-cell">Name</TableCell>
                  <TableCell className="table-cell">Age</TableCell>
                  <TableCell className="table-cell">Grades</TableCell>
                  <TableCell className="table-cell">College</TableCell>
                  <TableCell className="table-cell">City</TableCell>
                  <TableCell className="table-cell">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {studentsToShow.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.age}</TableCell>
                    <TableCell>{student.grades}</TableCell>
                    <TableCell>{student.college}</TableCell>
                    <TableCell>{student.city}</TableCell>
                    <TableCell>
                      <Button
                        className="btn-green"
                        variant="contained"
                        onClick={() => handleEdit(student.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="btn-green"
                        variant="contained"
                        onClick={() => handleDelete(student.id)}
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
              count={students.length}
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

      <AddStudentModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        editingStudent={editingStudent}
      />
    </>
  );
};

export default Student;
