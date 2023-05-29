import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal, TextField, Box } from "@mui/material";
import { TeacherData } from "../../redux/Types/teacherTypes";

interface initialData {
  id: number;
  name: string;
  age: number;
  subject: string;
  college: string;
}

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
    age: number,
    subject: string,
    college: string
  ) => void;
  editingTeacher: TeacherData | null;
}

const AddTeacherModal: React.FC<AddTeacherModalProps> = ({
  open,
  onClose,
  onSubmit,
  editingTeacher,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<initialData>();

  useEffect(() => {
    if (editingTeacher) {
      const { name, age, subject, college } = editingTeacher;
      setValue("name", name || "");
      setValue("age", age || 0);
      setValue("subject", subject || "");
      setValue("college", college || "");
    } else {
      reset();
    }
  }, [editingTeacher, reset, setValue]);

  const handleModalClose = () => {
    onClose();
    reset();
  };

  const handleFormSubmit = (data: initialData) => {
    onSubmit(data.name, data.age, data.subject, data.college);
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleModalClose} >
      <Box sx={style} className="modal">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div>
            <TextField
              label="Name"
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[a-zA-Z\s]*$/,
                  message: "Name should not contain numbers",
                },
              })}
              fullWidth
              error={!!errors.name}
              helperText={errors.name && errors.name.message?.toString()}
            />
          </div>

          <div>
            <TextField
              label="Age"
              type="number"
              {...register("age", { required: "Age is required", min: 0 })}
              fullWidth
              error={!!errors.age}
              helperText={errors.age && errors.age.message?.toString()}
              sx={{ mt: 2 }}
            />
          </div>

          <div>
            <TextField
              label="Subject"
              {...register("subject", { required: "Subject is required" })}
              fullWidth
              error={!!errors.subject}
              helperText={errors.subject && errors.subject.message?.toString()}
              sx={{ mt: 2 }}
            />
          </div>

          <div>
            <TextField
              label="College"
              {...register("college", { required: "College is required" })}
              fullWidth
              error={!!errors.college}
              helperText={errors.college && errors.college.message?.toString()}
              sx={{ mt: 2 }}
            />
          </div>

          <Button
            className="btn-green"
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddTeacherModal;
