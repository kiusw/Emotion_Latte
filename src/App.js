<<<<<<< HEAD
import './App.css';
import Logo from './component/logo.js'
import LoginForm from './component/loginForm.js';
import Section from './component/section.js';
import Footer from './component/footer.js';
import Advertisement from './component/advertisement.js';
import AutoSlider from './component/autoSlider.js';

function App() {
  return (
    <>
    <div className="flexContainer">
      <Logo />
      <LoginForm />
      <Section />
      <Footer />
      <Advertisement />
    </div>
      <AutoSlider />
      <AutoSlider />
    </>
=======
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
>>>>>>> 9c68b7e (Initialize project using Create React App)
  );
}

export default App;
