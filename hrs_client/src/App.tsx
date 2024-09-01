import { useColorScheme } from "@mui/joy/styles";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes/router";
import { FormLabel, Stack, Switch, Typography } from "@mui/joy";
import { DarkMode, Label } from "@mui/icons-material";
import { useState } from "react";

function App() {
  const [toggleDarkMode, setToggleDarkMode] = useState(true);
  const { mode, setMode } = useColorScheme();
  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
    const theme = toggleDarkMode ? "light" : "dark";
    setMode(theme);
  };

  return (
    <>
      {/* <Stack
        className="theme-container"
        sx={{ display: "flex", gap: 1, mx: 3, mt: 2, justifyContent: "end" }}
      >
        <FormLabel>Theme</FormLabel>
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
      </Stack> */}
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
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
