import Button from "@mui/joy/Button";
import CssBaseline from "@mui/joy/CssBaseline";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_ACCOUNT } from "../../graphql/queries/users";
import { IUser } from "../../interface/user.interface";
import { FormHelperText } from "@mui/joy";
import { InfoOutlined } from "@mui/icons-material";
import NumericFormatAdapter from "../../components/numeric-format-adapter";
import { Navigate } from "react-router-dom";

function SignUp() {
  const [createAccount, { data, error }] = useMutation<{
    createAccount: IUser;
  }>(CREATE_ACCOUNT);

  const [userInfo, setUserInfo] = useState({
    name: "",
    phoneNumber: "",
    password: "",
  });

  const [errorInfo, setErrorInfo] = useState({
    isInValid: false,
    message: "",
  });

  useEffect(() => {
    if (data && data.createAccount?.access_token) {
      setErrorInfo({ isInValid: false, message: "" });
      localStorage.setItem("access_token", data.createAccount.access_token);
    }

    if (error) {
      const message = error.message;
      setErrorInfo({
        isInValid: message === "INVALID_PH_NUM",
        message: "Invalid phone number!!!",
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
            if (userInfo.name && userInfo.phoneNumber && userInfo.password) {
              createAccount({ variables: { ...userInfo } });

              return;
            }
          }}
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body-sm">Sign up to continue.</Typography>
          </div>
          <FormControl required>
            <FormLabel>Full name</FormLabel>
            <Input
              name="name"
              type="text"
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
            />
          </FormControl>
          <FormControl error={errorInfo.isInValid} required>
            <FormLabel>Phone number</FormLabel>
            <Input
              // html input attribute
              name="phoneNumber"
              slotProps={{ input: { component: NumericFormatAdapter } }}
              onChange={(e) =>
                setUserInfo({ ...userInfo, phoneNumber: e.target.value })
              }
            />
            {errorInfo.isInValid && (
              <FormHelperText>
                <InfoOutlined /> {errorInfo.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl required>
            <FormLabel>Password</FormLabel>
            <Input
              // html input attribute
              name="password"
              type="password"
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
            />
          </FormControl>
          <Button type="submit" sx={{ mt: 1, width: "100%" }}>
            Sign up
          </Button>
        </form>
      </Sheet>
    </main>
  );
}
export default SignUp;
