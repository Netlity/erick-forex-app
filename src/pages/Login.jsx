import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const handleLogin = () => {
    // Your login logic here (API call, etc.)
    // On success:
    localStorage.setItem("user", "some-user-data"); // or token
    // localStorage.setItem("token", "your-jwt-token");

    // Redirect to dashboard (or wherever you want)
    navigate("/", { replace: true });
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow" style={{ maxWidth: "420px", width: "100%" }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h2 className="text-success fw-bold">Chotuwahe</h2>
            <p className="text-muted">Staff Login</p>
          </div>

          <form>
            <div className="mb-3">
              <label className="form-label">Email or Phone</label>
              <input type="text" className="form-control form-control-lg" placeholder="staff@erickforex.com" />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control form-control-lg" />
            </div>
            <div className="d-flex justify-content-between mb-3">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="remember" />
                <label className="form-check-label" htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="text-decoration-none">Forgot password?</a>
            </div>

            <button className="btn btn-success btn-lg w-100" onClick={handleLogin}>Log In</button>
          </form>

          <div className="text-center mt-4">
            <small className="text-muted">
              © {new Date().getFullYear()} Chotuwahe. All rights reserved.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}