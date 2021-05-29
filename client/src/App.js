import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import OtherPage from './OtherPage';
import Fib from './Fib';

function App() {
  return (
    <Router>
      <div className='App'>
        <header>
          <Link to='/'>Home</Link>
          <Link to='/otherpage'>Other Page</Link>
        </header>

        <Route exact path='/' component={Fib}></Route>
        <Route exact path='/otherpage' component={OtherPage}></Route>
      </div>
    </Router>
  );
}

export default App;
