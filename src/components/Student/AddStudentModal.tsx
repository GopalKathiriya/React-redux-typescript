import React, { useEffect, useState } from "react";
import { Button, Modal, TextField, Box } from "@mui/material";
import { StudentData } from "../../redux/Types/studentTypes";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface AddStudentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    name: string,
    age:string,
    grades: string,
    college: string,
    city: string
  ) => void;
  editingStudent: StudentData | null;
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({
  open,
  onClose,
  onSubmit,
  editingStudent,
}) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState('');
  const [grades, setGrades] = useState("");
  const [college, setCollege] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setAge(editingStudent.age);
      setGrades(editingStudent.grades);
      setCollege(editingStudent.college);
      setCity(editingStudent.city);
    } else {
      setName("");
      setAge('');
      setGrades("");
      setCollege("");
      setCity("");
    }
  }, [editingStudent]);

  const handleSubmit = () => {
    onSubmit(name,age, grades, college, city);
    setName("");
    setAge('');
    setGrades("");
    setCollege("");
    setCity("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <div>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </div>

        <TextField
          label="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          sx={{ mt: 2 }}
            fullWidth
        />
        <div>
          <TextField
            label="Grades"
            value={grades}
            onChange={(e) => setGrades(e.target.value)}
            sx={{ mt: 2 }}
            fullWidth
          />
        </div>
        <div>
          <TextField
            label="College"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            sx={{ mt: 2 }}
            fullWidth
          />
        </div>
        <div>
          <TextField
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            sx={{ mt: 2 }}
            fullWidth
          />
        </div>

        <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default AddStudentModal;
