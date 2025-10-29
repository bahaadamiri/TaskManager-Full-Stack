import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, CircularProgress, Alert } from "@mui/material";
import api from "../api";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await api.post("/register", form);
      nav("/login");
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Registration failed");
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
          Create Account
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          Join us and start managing your tasks efficiently
        </Typography>

        {!!err && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {err}
          </Alert>
        )}

        <form noValidate onSubmit={submit}>
          <TextField
            label="Full Name"
            name="name"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            size="medium"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
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
            {loading ? <CircularProgress size={24} /> : "Sign Up"}
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 3, color: "text.secondary" }}>
          Already have an account?{" "}
          <RouterLink to="/login" className="text-blue-600 hover:underline">
            Sign In
          </RouterLink>
        </Typography>
      </Box>
    </Box>
  );
}
