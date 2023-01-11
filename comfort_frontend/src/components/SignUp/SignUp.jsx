import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { FaUserGraduate } from "react-icons/fa";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { nanoid } from "nanoid";

import "./SignUp.css";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useAuthContext } from "../../context/AuthProvider";
import LoadingCircle from "../../MuiBlocks/Progress";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      mb="30px"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        QuizzApp
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [createdUser, setCreatedUser] = useState({
    _id: nanoid(),
    orders: [],
    creationDate: moment().format("MMM Do YY"),
  });

  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuthContext();

  const navigate = useNavigate();

  const username = createdUser.username;
  const password = createdUser.password;
  const credentials = {
    username,
    password,
  };

  const createUser = async (createdUser) => {
    const formData = new FormData();
    formData.append("_id", nanoid());
    formData.append("username", createdUser.username);
    formData.append("email", createdUser.email);
    formData.append("password", createdUser.password);
    formData.append("avatar", createdUser.avatar);
    formData.append("orders", createdUser.orders);

    formData.append("creationDate", createdUser.creationDate);

    await fetch("http://localhost:8005/users/register", {
      method: "POST",

      body: formData,
    });

    setIsLoading(false);

    signIn(credentials);
    navigate("/", { replace: true });
  };

  const signUp = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await createUser(createdUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-up">
      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {" "}
          <LoadingCircle />
        </div>
      ) : (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#1976D2" }}>
                <FaUserGraduate />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={signUp} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="username"
                      required
                      fullWidth
                      id="username"
                      label="User Name"
                      autoFocus
                      onChange={(event) =>
                        setCreatedUser({
                          ...createdUser,
                          [event.target.name]: event.target.value,
                        })
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={(event) =>
                        setCreatedUser({
                          ...createdUser,
                          [event.target.name]: event.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={(event) =>
                        setCreatedUser({
                          ...createdUser,
                          [event.target.name]: event.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="verifyPassword"
                      label="Verify password"
                      type="password"
                      id="verify password"
                      autoComplete="new-password"
                      onChange={(event) =>
                        setCreatedUser({
                          ...createdUser,
                          [event.target.name]: event.target.value,
                        })
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <input
                      required
                      fullWidth
                      name="file"
                      label=""
                      type="file"
                      id="file"
                      onChange={(e) => {
                        setCreatedUser({
                          ...createdUser,
                          avatar: e.target.files[0],
                        });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {/* <FormControlLabel
                control={
                  <Checkbox value="allowExtraEmails" color="primary" />
                }
                label="I want to receive inspiration, marketing promotions and updates via email."
              /> */}
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/loginpage" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
      )}
    </div>
  );
}
