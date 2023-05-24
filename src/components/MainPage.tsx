import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
  } from "@mui/material";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const MainPage:React.FC = () => {
    const navigate = useNavigate();
  return(
    <>
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom>
                Main page
        </Typography>
      </CardContent>
    </Card>
      <TableContainer >
        <Table>
          <TableHead>
          <TableRow>
            <TableCell className="table-cell"><Link onClick={() => navigate("/student")}>Student</Link></TableCell>
            <TableCell className="table-cell"><Link onClick={() => navigate("/teacher")}>Teacher</Link></TableCell>
            <TableCell className="table-cell"><Link onClick={() => navigate("/courses")}>Course</Link></TableCell>
          </TableRow>
          </TableHead>
          
          <TableBody>
            
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
  };
  
  export default MainPage;