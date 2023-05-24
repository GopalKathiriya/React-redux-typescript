import React, { useEffect, useState } from "react";
import { Button, Modal, TextField, Box } from "@mui/material";
import { CourseData } from "../../redux/Types/coursesTypes";

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

interface AddCourseModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    name: string,
    durationInMonths: string,
  ) => void;
  editingCourse: CourseData | null;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({
  open,
  onClose,
  onSubmit,
  editingCourse,
}) => {
  const [name, setName] = useState("");
  const [durationInMonths, setDurationInMonths] = useState('');

  useEffect(() => {
    if (editingCourse) {
      setName(editingCourse.name);
      setDurationInMonths(editingCourse.durationInMonths)
    } else {
      setName("");
      setDurationInMonths('')
    }
  }, [editingCourse]);

  const handleSubmit = () => {
    onSubmit(name,durationInMonths);
    setName("");
    setDurationInMonths('');
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
          label="durationInMonths"
          type="number"
          value={durationInMonths}
          onChange={(e) => setDurationInMonths(e.target.value)}
          sx={{ mt: 2 }}
        fullWidth
        /> 
       

        <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default AddCourseModal;
