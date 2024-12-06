import "./App.css";
import { Helmet } from "react-helmet";
import MainBody from "./components/MainBody";

function App() {
  // console.log(useVisitCounter());
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Iftekharul Abedeen</title>
        <link rel="canonical" href="http://google.com" />
        <meta name="description" content="My portfolio" />
      </Helmet>
      <MainBody></MainBody>
    </div>
  );
}

export default App;
