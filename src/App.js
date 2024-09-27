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
  );
}

export default App;
