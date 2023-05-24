import './App.css';
import Student from './components/Student/Student';
import { Routes,Route, BrowserRouter } from 'react-router-dom';
import Teacher from './components/Teacher/Teacher';
import Courses from './components/Courses/Courses';
import MainPage from './components/MainPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage/>} />
        <Route path='/student' element={<Student/>} />
        <Route path='/teacher' element={<Teacher />} />
        <Route path='/courses' element={<Courses/>} />
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
