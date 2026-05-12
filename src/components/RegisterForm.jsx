function RegisterForm({
  registerForm,
  setRegisterForm,
  registerError,
  onSubmit,
}) {
  return (
    <section className="auth-card">
      <div className="auth-head">
        <p className="auth-brand">EduNexa</p>
        <h2>Create Account</h2>
        <p className="auth-subtitle">Register as Admin or Student</p>
      </div>

      <div className="auth-role-cards">
        <button
          type="button"
          className={`auth-role-card ${
            registerForm.role === "admin" ? "active" : ""
          }`}
          onClick={() =>
            setRegisterForm((prev) => ({ ...prev, role: "admin" }))
          }
        >
          Admin
        </button>

        <button
          type="button"
          className={`auth-role-card ${
            registerForm.role === "student" ? "active" : ""
          }`}
          onClick={() =>
            setRegisterForm((prev) => ({ ...prev, role: "student" }))
          }
        >
          Student
        </button>
      </div>

       <form onSubmit={onSubmit} className="form-grid"> 
        <input
          type="text"
          placeholder="Full Name"
          value={registerForm.name}
          onChange={(e) =>
            setRegisterForm((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          } 
          /> 
        <input
          type="email"
          placeholder="Email"
          value={registerForm.email}
          onChange={(e) =>
            setRegisterForm((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={registerForm.password}
          onChange={(e) =>
            setRegisterForm((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
        />

        <select
          value={registerForm.role}
          onChange={(e) =>
            setRegisterForm((prev) => ({
              ...prev,
              role: e.target.value,
            }))
          }
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        {registerError && <p className="error-text">{registerError}</p>}

        <button type="submit" className="primary-btn">
          Register
        </button>
      </form>
    </section>
  );
}

export default RegisterForm;
