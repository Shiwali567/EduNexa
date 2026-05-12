function LoginForm({ loginForm, setLoginForm, loginError, onSubmit }) {
  return (
    <section className="auth-card">
      <div className="auth-head">
        <p className="auth-brand">EduNexa</p>
        <h2>Sign in</h2>
        <p className="auth-subtitle">Choose how you are signing in</p>
      </div>

      <div className="auth-role-cards">
        <button
          type="button"
          className={`auth-role-card ${loginForm.role === "admin" ? "active" : ""}`}
          onClick={() => setLoginForm((prev) => ({ ...prev, role: "admin" }))}
        >
          Admin
        </button>

        <button
          type="button"
          className={`auth-role-card ${loginForm.role === "student" ? "active" : ""}`}
          onClick={() => setLoginForm((prev) => ({ ...prev, role: "student" }))}
        >
          Student
        </button>
      </div>

      <p className="helper-text auth-credentials">
        Use your registered email and password to login
      </p>

      <form onSubmit={onSubmit} className="form-grid">
        <input
          type="email"
          placeholder="Enter email"
          value={loginForm.email}
          onChange={(e) =>
            setLoginForm((prev) => ({ ...prev, email: e.target.value }))
          }
        />

        <input
          type="password"
          placeholder="Enter password"
          value={loginForm.password}
          onChange={(e) =>
            setLoginForm((prev) => ({ ...prev, password: e.target.value }))
          }
        />

        {loginError && <p className="error-text">{loginError}</p>}

        <button type="submit" className="primary-btn">
          Login
        </button>
      </form>
    </section>
  );
}

export default LoginForm;
