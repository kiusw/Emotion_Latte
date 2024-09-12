<<<<<<< HEAD
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
=======
>>>>>>> 2605a04 (	deleted:    public/favicon.ico)
import './App.css';
import Logo from './component/logo.js'
import LoginForm from './component/loginForm.js';
import Section from './component/section.js'
import Footer from './component/footer.js'

function App() {
  return (
    <div className="gridContainer">
      <Logo />
      <LoginForm />
      <Section />
      <Footer />
    </div>
>>>>>>> 9c68b7e (Initialize project using Create React App)
  );
}

export default App;
