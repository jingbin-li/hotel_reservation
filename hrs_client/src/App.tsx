import { useColorScheme } from "@mui/joy/styles";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Switch, Typography } from "@mui/joy";
import { DarkMode, Label } from "@mui/icons-material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import createRoutes from "./routes/router";
import { BrowserRouter, useRoutes } from "react-router-dom";

function App() {
  const [toggleDarkMode, setToggleDarkMode] = useState(true);
  const { mode, setMode } = useColorScheme();
  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
    const theme = toggleDarkMode ? "light" : "dark";
    setMode(theme);
  };

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const routes = createRoutes(isAuthenticated);
  const routing = useRoutes(routes);

  return (
    <>
      {routing}
      <Typography
        component="label"
        sx={{ display: "flex", gap: 1, mx: 3, mt: 2, justifyContent: "end" }}
        endDecorator={
          <Switch
            size="lg"
            slotProps={{
              input: { "aria-label": "Dark mode" },
              thumb: {
                children: <DarkMode />,
              },
            }}
            checked={toggleDarkMode}
            onChange={toggleDarkTheme}
            sx={{ "--Switch-thumbSize": "16px" }}
          />
        }
      >
        Theme
      </Typography>
      {/* <RouterProvider router={router}></RouterProvider> */}
    </>
  );
}
const AppWrapper: React.FC = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
export default AppWrapper;
