import { useColorScheme } from "@mui/joy/styles";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes/router";

function App() {
  const { mode, setMode } = useColorScheme();
  setMode("dark");

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
