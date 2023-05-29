import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal, TextField, Box } from "@mui/material";
import { CourseData } from "../../redux/Types/coursesTypes";

interface initialData {
  id: number;
  name: string;
  durationInMonths: string;
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

interface AddCourseModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, durationInMonths: string) => void;
  editingCourse: CourseData | null;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({
  open,
  onClose,
  onSubmit,
  editingCourse,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<initialData>();

  useEffect(() => {
    if (editingCourse) {
      setValue("name", editingCourse.name);
      setValue("durationInMonths", editingCourse.durationInMonths);
    } else {
      reset();
    }
  }, [editingCourse, reset, setValue]);

  const handleModalClose = () => {
    onClose();
    reset();
  };

  const handleFormSubmit = (data: initialData) => {
    onSubmit(data.name, data.durationInMonths);
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
              label="Duration in Months"
              type="number"
              {...register("durationInMonths", {
                required: "Duration is required",
              })}
              sx={{ mt: 2 }}
              fullWidth
              error={!!errors.durationInMonths}
              helperText={
                errors.durationInMonths &&
                errors.durationInMonths.message?.toString()
              }
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

export default AddCourseModal;
