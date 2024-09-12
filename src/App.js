import './App.css';
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Component } from 'react';

export default class App extends Component {
  state = {
    progress: 0
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route path='/' element={<News setProgress={this.setProgress} key='general' pageSize={12} country='us' category='general' />} />
            <Route path='/business' element={<News setProgress={this.setProgress} key='business' pageSize={12} country='us' category='business' />} />
            <Route path='/entertainment' element={<News setProgress={this.setProgress} key='entertainment' pageSize={12} country='us' category='entertainment' />} />
            <Route path='/health' element={<News setProgress={this.setProgress} key='health' pageSize={12} country='us' category='health' />} />
            <Route path='/science' element={<News setProgress={this.setProgress} key='science' pageSize={12} country='us' category='science' />} />
            <Route path='/sports' element={<News setProgress={this.setProgress} key='sports' pageSize={12} country='us' category='sports' />} />
            <Route path='/technology' element={<News setProgress={this.setProgress} key='technology' pageSize={12} country='us' category='technology' />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
