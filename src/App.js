import logo from './Assets/Images/iA.svg';
import './App.css';
import MainBody from './components/MainBody';
import {Helmet} from "react-helmet";

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta charSet='utf-8' />
        <title>Iftekharul Abedeen</title>
        <link rel='canonical' href='http://google.com' />
        <meta name='description' content='My portfolio' />
      </Helmet>
      <MainBody></MainBody>
    </div>
  );
}

export default App;
