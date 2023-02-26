import './App.css';
import Navbar from './Navbar';
import Home from './home';
import CollegeForm from './collegeForm';
import dummy_j from './dummy';
import { Route, Routes } from 'react-router-dom';
import Profile from './dummy';

function App() {
  const title ='Welcome!'
  const styles = {
    content: {
      "padding-top": "100px",
    }
  }
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path='/'
              element={<div className='content' style={styles.content}>
                        <CollegeForm/>
                      </div>}>
        </Route>
        <Route path='/college' element={<Profile/>}/>
      </Routes>

    </div>
  );
}

export default App;
