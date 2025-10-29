import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, CircularProgress, Alert } from "@mui/material";
import api from "../api";
import { auth } from "../auth";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await api.post("/login", form);
      const token = res.data?.token;
      if (!token) throw new Error("No token returned");
      auth.token = token;
      nav("/tasks");
    } catch (e: any) {
      setErr(e?.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      className="min-h-screen bg-gray-100"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Roboto, system-ui, -apple-system, Segoe UI, Inter, Arial, sans-serif",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "20px",
          boxShadow: 3,
          p: 5,
          width: "90%",
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700, color: "#1e40af" }}
        >
          Welcome Back
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          Sign in to continue managing your tasks
        </Typography>

        {!!err && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {err}
          </Alert>
        )}

        <form noValidate onSubmit={submit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            size="medium"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            size="medium"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            disabled={loading}
            sx={{
              mt: 2,
              py: 1.2,
              fontSize: "1rem",
              fontWeight: 500,
              textTransform: "none",
              borderRadius: "10px",
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Sign In"}
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 3, color: "text.secondary" }}>
          Don’t have an account?{" "}
          <RouterLink to="/register" className="text-blue-600 hover:underline">
            Sign Up
          </RouterLink>
        </Typography>
      </Box>
    </Box>
  );
}
