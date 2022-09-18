import logo from "./logo.svg";
import "./App.css";
import { MainPage } from "./Pages/mainPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer />
      <header className="contact-header">
        <h2>Contact App</h2>
      </header>
      <section>
        <MainPage />
      </section>
    </div>
  );
}

export default App;
