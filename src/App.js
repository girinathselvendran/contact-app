import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ContactApp } from "./Pages/contactApp";

function App() {
  return (
    <div>
      <ToastContainer />
      <header className="contact-header">
        <h2>Contact App</h2>
      </header>
      <section>
        <ContactApp />
      </section>
    </div>
  );
}

export default App;
