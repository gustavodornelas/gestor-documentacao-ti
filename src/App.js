import GlobalStyle from "./globalStyles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import AppRoutes from "./AppRoutes";

function App() {

  return (
    <>
      <AppRoutes />
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
      <GlobalStyle />

    </>
  )
}

export default App;
