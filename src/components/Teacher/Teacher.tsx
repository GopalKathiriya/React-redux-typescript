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
import { TeacherData } from "../../redux/Types/teacherTypes";
import AddTeacherModal from "./AddTeacherModal";
import {
  addTeacher,
  deleteTeacher,
  editTeacher,
} from "../../redux/actions/TeacherAction";
import { Selectors } from "../../utility/useSelector";
import NoData from "../NoData";

const Teacher: React.FC = () => {
  const { teachers } = Selectors();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<TeacherData | null>(
    null
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenModal = () => {
    setModalOpen(true);
    setEditingTeacher(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (
    name: string,
    age: number,
    subject: string,
    college: string
  ) => {
    if (editingTeacher !== null) {
      const updatedTeacher: TeacherData = {
        id: editingTeacher.id,
        name,
        age,
        subject,
        college,
      };
      dispatch(editTeacher(updatedTeacher));
    } else {
      const newTeacher: TeacherData = {
        id: Date.now(),
        name,
        age,
        subject,
        college,
      };
      dispatch(addTeacher(newTeacher));
    }
    handleCloseModal();
  };

  const handleEdit = (teacherId: number) => {
    const teacherToEdit = teachers.find((teacher) => teacher.id === teacherId);
    if (teacherToEdit) {
      setEditingTeacher(teacherToEdit);
      setModalOpen(true);
    }
  };

  const handleDelete = (teacherId: number) => {
    dispatch(deleteTeacher(teacherId));
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const teachersToShow = teachers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <div className="header-table">
        <Button
          className="btn-add"
          variant="contained"
          onClick={handleOpenModal}
        >
          Add Teacher
        </Button>
      </div>
      <div className="content">
        {teachers.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="table-cell">Name</TableCell>
                  <TableCell className="table-cell">Age</TableCell>
                  <TableCell className="table-cell">Subject</TableCell>
                  <TableCell className="table-cell">College</TableCell>
                  <TableCell className="table-cell">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {teachersToShow.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>{teacher.name}</TableCell>
                    <TableCell>{teacher.age}</TableCell>
                    <TableCell>{teacher.subject}</TableCell>
                    <TableCell>{teacher.college}</TableCell>
                    <TableCell>
                      <Button
                        className="btn-green"
                        variant="contained"
                        onClick={() => handleEdit(teacher.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="btn-green"
                        variant="contained"
                        onClick={() => handleDelete(teacher.id)}
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
              count={teachers.length}
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

      <AddTeacherModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        editingTeacher={editingTeacher}
      />
    </>
  );
};

export default Teacher;
