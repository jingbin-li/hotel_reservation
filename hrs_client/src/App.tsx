import { useColorScheme } from "@mui/joy/styles";
import { useSelector } from "react-redux";
import { BrowserRouter, useRoutes } from "react-router-dom";
import "./App.css";
import createRoutes from "./routes/router";
import { RootState } from "./store/store";

function App() {
  const { mode, setMode } = useColorScheme();
  setMode("light");
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const routes = createRoutes(isAuthenticated);
  const routing = useRoutes(routes);

  return (
    <>
      {routing}
      {/* <Typography
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
      </Typography> */}
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
