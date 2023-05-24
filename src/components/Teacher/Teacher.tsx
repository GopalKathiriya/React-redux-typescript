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
// import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { RootTeacherState, TeacherData } from "../../redux/Types/teacherTypes";
import { useSelector, useDispatch } from "react-redux";
import { addTeacher, editTeacher } from "../../redux/actions/TeacherAction";
import AddTeacherModal from "./AddTeacherModal";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Teacher: React.FC = () => {
  const navigate = useNavigate();

  const teachers = useSelector(
    (state: RootTeacherState) => state.teacherReducer
  );
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<TeacherData | null>(
    null
  );

  const handleOpenModal = () => {
    setModalOpen(true);
    setEditingTeacher(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (
    name: string,
    age: string,
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

  return (
    <>
      <div>
        <Link onClick={() => navigate("/")}>Back To Main Page</Link>
        <Button   sx={{ margin: "24px" }} variant="contained" onClick={handleOpenModal}>
          Add Teacher
        </Button>
      </div>

      <TableContainer className="cart-page-container">
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
            {teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.age}</TableCell>
                <TableCell>{teacher.subject}</TableCell>
                <TableCell>{teacher.college}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(teacher.id)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
