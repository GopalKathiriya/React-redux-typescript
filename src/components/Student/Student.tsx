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
import { StudentData, RootStudentState } from "../../redux/Types/studentTypes";
import AddStudentModal from "./AddStudentModal";
import { addStudent, editStudent } from "../../redux/actions/StudentAction";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Student: React.FC = () => {
  const students = useSelector(
    (state: RootStudentState) => state.studentReducer
  );
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentData | null>(
    null
  );

  const handleOpenModal = () => {
    setModalOpen(true);
    setEditingStudent(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (
    name: string,
    age: string,
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
      console.log("dasasd", updatedStudent);
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

  return (
    <>
      <div>
        <Link onClick={() => navigate("/")}>Back To Main Page</Link>
        <Button
          sx={{ margin: "24px" }}
          variant="contained"
          onClick={handleOpenModal}
        >
          Add Student
        </Button>
      </div>

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
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>{student.grades}</TableCell>
                <TableCell>{student.college}</TableCell>
                <TableCell>{student.city}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(student.id)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
