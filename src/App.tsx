import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const user = localStorage.getItem("user");
  return <>{user ? <Home /> : <Login />}</>;
}

export default App;
