import React, { useEffect, useState } from "react";
import { Button, Modal, TextField, Box } from "@mui/material";
import { TeacherData } from "../../redux/Types/teacherTypes";

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

interface AddTeacherModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    name: string,
    age:string,
    subject:string,
    college:string,
  ) => void;
  editingTeacher: TeacherData | null;
}

const AddTeacherModal: React.FC<AddTeacherModalProps> = ({
  open,
  onClose,
  onSubmit,
  editingTeacher,
}) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState('');
  const [subject, setSubject] = useState("");
  const [college, setCollege] = useState("");

  useEffect(() => {
    if (editingTeacher) {
      setName(editingTeacher.name);
      setAge(editingTeacher.age)
      setSubject(editingTeacher.subject);
      setCollege(editingTeacher.college);
    } else {
      setName("");
      setSubject("");
      setCollege("");
    }
  }, [editingTeacher]);

  const handleSubmit = () => {
    onSubmit(name, age,subject, college);
    setName("");
    setAge('');
    setSubject("");
    setCollege("");
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
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
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
        <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default AddTeacherModal;
