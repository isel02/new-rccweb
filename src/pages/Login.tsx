import React, { useState } from "react";
import styles from "./Login.module.css";

const Login: React.FC = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://www.rcccabling.com.ph/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/dashboard";
      } else {
        setError(data.error || "Invalid username or password");
      }
    } catch (err) {
      setError("Server error — please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      {/* Animated Background */}
      <div className={styles.loginBackground}>
        <div className={`${styles.circle} ${styles.circle1}`}></div>
        <div className={`${styles.circle} ${styles.circle2}`}></div>
        <div className={`${styles.circle} ${styles.circle3}`}></div>
      </div>

      {/* Login Card */}
      <div className={styles.loginCard}>
        {/* Header */}
        <div className={styles.loginHeader}>
          <h2 className={styles.loginTitle}>Admin Login</h2>
          <p className={styles.loginSubtitle}>RCC Cabling Dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          {error && (
            <div className={styles.errorMessage}>
              <span className={styles.errorIcon}>⚠️</span>
              {error}
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.formLabel}>
              Username
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>👤</span>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={form.username}
                onChange={handleChange}
                className={styles.formInput}
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              Password
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>🔒</span>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className={styles.formInput}
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading && <span className={styles.spinner}></span>}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <div className={styles.loginFooter}>
          <p>🔐 Secure access only</p>
        </div>
      </div>
    </div>
  );
};

export default Login;