import React, { useEffect } from "react";
import { Button, Modal, TextField, Box } from "@mui/material";
import { StudentData } from "../../redux/Types/studentTypes";
import { useForm } from "react-hook-form";

interface initialData {
  id: number;
  name: string;
  age: number;
  grades: string;
  college: string;
  city: string;
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

interface AddStudentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    name: string,
    age: number,
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<initialData>();

  useEffect(() => {
    if (editingStudent) {
      setValue("name", editingStudent.name);
      setValue("age", editingStudent.age);
      setValue("grades", editingStudent.grades);
      setValue("college", editingStudent.college);
      setValue("city", editingStudent.city);
    } else {
      reset();
    }
  }, [editingStudent, reset, setValue]);

  const handleModalClose = () => {
    onClose();
    reset();
  };

  const handleFormSubmit = (data: initialData) => {
    onSubmit(data.name, data.age, data.grades, data.college, data.city);
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleModalClose}>
      <Box sx={style}  className="modal">
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
              sx={{ mt: 2 }}
              fullWidth
              error={!!errors.name}
              helperText={errors.name && errors.name.message?.toString()}
            />
          </div>
          <TextField
            label="Age"
            type="number"
            {...register("age", { required: "Age is required", min: 0 })}
            fullWidth
            error={!!errors.age}
            helperText={errors.age && errors.age.message?.toString()}
            sx={{ mt: 2 }}
          />
          <div>
            <TextField
              label="Grades"
              {...register("grades", {
                required: "Grades is required",
              })}
              sx={{ mt: 2 }}
              fullWidth
              error={!!errors.grades}
              helperText={errors.grades && errors.grades.message?.toString()}
            />
          </div>
          <div>
            <TextField
              label="College"
              {...register("college", {
                required: "College is required",
              })}
              sx={{ mt: 2 }}
              fullWidth
              error={!!errors.college}
              helperText={errors.college && errors.college.message?.toString()}
            />
          </div>
          <div>
            <TextField
              label="City"
              {...register("city", {
                required: "City is required",
              })}
              sx={{ mt: 2 }}
              fullWidth
              error={!!errors.city}
              helperText={errors.city && errors.city.message?.toString()}
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

export default AddStudentModal;
