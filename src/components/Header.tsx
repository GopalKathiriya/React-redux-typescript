import React from "react";
import { AppBar, Toolbar, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <AppBar position="fixed" className="header">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            className="header-font"
            sx={{ flexGrow: 1, textAlign: "left" }}
            onClick={() => navigate("/")}
          >
            My School App
          </Typography>
          <Link
            className="link-name"
            component="button"
            color="inherit"
            onClick={() => navigate("/student")}
            sx={{ marginRight: 2 }}
          >
            Student
          </Link>
          <Link
            className="link-name"
            component="button"
            color="inherit"
            onClick={() => navigate("/teacher")}
            sx={{ marginRight: 2 }}
          >
            Teacher
          </Link>
          <Link
            className="link-name"
            component="button"
            color="inherit"
            onClick={() => navigate("/courses")}
          >
            Course
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
