import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";
import "./LoginPage.css";
import { useProducts } from "../../context/ProductProvider";

const theme = createTheme();

export default function LoginPage() {
  const { setUserAuth } = useAuthContext();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const { fetchProducts } = useProducts();

  const signIn = async (credentials) => {
    fetchProducts();
    const response = await fetch("http://localhost:8005/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include",
    });
    const { user } = await response.json();

    setUserAuth({ ...user, isLoggedIn: true });

    if (response.status === 200) {
      if (user.cartState.length !== 0) {
        navigate("/cart", { replace: true });
        return true;
      } else {
        navigate("/products", { replace: true });
        return true;
      }
    } else {
      return false;
    }
  };

  const loginUser = async (event) => {
    event.preventDefault();
    await signIn(credentials);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
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
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User name"
              name="username"
              autoFocus
              onChange={(event) =>
                setCredentials({
                  ...credentials,
                  [event.target.name]: event.target.value,
                })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) =>
                setCredentials({
                  ...credentials,
                  [event.target.name]: event.target.value,
                })
              }
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="submit-button"
              onClick={loginUser}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
