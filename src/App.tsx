import './App.css';
import Student from './components/Student/Student';
import { useRoutes } from 'react-router-dom';
import Teacher from './components/Teacher/Teacher';
import Courses from './components/Courses/Courses';
import MainPage from './components/MainPage';
import Header from './components/Header';

function App() {

const routes = useRoutes([
  {
    path:'/',
    element:<MainPage/>
  },
  {
    path:'/student',
    element:<Student/>
  },
  {
    path:'/teacher',
    element:<Teacher />
  },
  {
    path:'/courses',
    element:<Courses/>
  }
])

  return (
    <div className="App">
      <Header/>
        {routes}
    </div>
  );
}

export default App;
