import Button from "@mui/joy/Button";
import CssBaseline from "@mui/joy/CssBaseline";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_ACCOUNT } from "../../graphql/queries/users";

function SignUp() {
  const [createAccount, { data, loading, error }] = useMutation(CREATE_ACCOUNT);
  const [userInfo, setUserInfo] = useState({
    name: "",
    phoneNumber: "",
    password: "",
  });

  const handleSubmit = () => {
    console.log(userInfo);
    createAccount({ variables: { ...userInfo } });

    console.log(data);
  };

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
        <div>
          <Typography level="h4" component="h1">
            <b>Welcome!</b>
          </Typography>
          <Typography level="body-sm">Sign up to continue.</Typography>
        </div>
        <FormControl>
          <FormLabel>Full name</FormLabel>
          <Input
            name="name"
            type="text"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Phone number</FormLabel>
          <Input
            // html input attribute
            name="phoneNumber"
            type="text"
            onChange={(e) =>
              setUserInfo({ ...userInfo, phoneNumber: e.target.value })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            // html input attribute
            name="password"
            type="password"
            // value={userInfo.password}
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
          />
        </FormControl>
        <Button sx={{ mt: 1 /* margin top */ }} onClick={handleSubmit}>
          Sign up
        </Button>
      </Sheet>
    </main>
  );
}
export default SignUp;
