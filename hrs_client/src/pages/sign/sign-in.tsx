import Button from "@mui/joy/Button";
import CssBaseline from "@mui/joy/CssBaseline";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { LOGIN } from "../../graphql/queries/users";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import NumericFormatAdapter from "../../components/numeric-format-adapter";
import { InfoOutlined } from "@mui/icons-material";
import { FormHelperText, Link } from "@mui/joy";
import { IUser } from "../../interface/user.interface";

export default function SignIn() {
  const [createAccount, { data, error }] = useMutation<{ login: IUser }>(LOGIN);
  const [userInfo, setUserInfo] = useState({
    phoneNumber: "",
    password: "",
  });

  const [errorInfo, setErrorInfo] = useState({
    isInValid: false,
    message: "",
  });

  useEffect(() => {
    console.log(data);
    if (data && data.login.access_token) {
      setErrorInfo({ isInValid: false, message: "" });
      localStorage.setItem("access_token", data.login.access_token);
    }

    if (error) {
      const message = error.message;
      setErrorInfo({
        isInValid: message === "INVALID_ACCOUNT",
        message: "Wrong Password!!!",
      });
    }
  }, [data, error]);
  return (
    <main>
      <CssBaseline />
      <Sheet
        sx={{
          width: 300,
          mx: "auto", // margin left & right
          my: 4, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
        }}
        variant="outlined"
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (userInfo.phoneNumber && userInfo.password) {
              createAccount({ variables: { ...userInfo } });

              return;
            }
          }}
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body-sm">Sign in to continue.</Typography>
          </div>
          <FormControl required>
            <FormLabel>Phone number</FormLabel>
            <Input
              // html input attribute
              name="phoneNumber"
              slotProps={{ input: { component: NumericFormatAdapter } }}
              onChange={(e) =>
                setUserInfo({ ...userInfo, phoneNumber: e.target.value })
              }
            />
          </FormControl>
          <FormControl error={errorInfo.isInValid} required>
            <FormLabel>Password</FormLabel>
            <Input
              // html input attribute
              name="password"
              type="password"
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
            />
            {errorInfo.isInValid && (
              <FormHelperText>
                <InfoOutlined /> {errorInfo.message}
              </FormHelperText>
            )}
          </FormControl>
          <Button type="submit" sx={{ mt: 1, width: "100%" }}>
            Sign in
          </Button>
        </form>
        <Typography
          endDecorator={<Link href="/sign-up">Sign up</Link>}
          sx={{ fontSize: "sm", alignSelf: "center" }}
        >
          Don&apos;t have an account?
        </Typography>
      </Sheet>
    </main>
  );
}
