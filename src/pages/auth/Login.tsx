import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/features/AuthSlice";
import ButtonSubmit from "../../components/Button/ButtonSubmit";

import { useDispatch } from "react-redux";
import { EmailIcon, EyeIcon, LockIcon } from "../../assets/icons";
import "./login.scss";
import "./input.scss";
import { Button } from "../../components/Button/Button";

const Login = () => {

  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState<string>('admin@admin.com');
  const [password, setPassword] = useState<string>('Abc@1234');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    // debugger
    e.preventDefault();
    dispatch(login({ email: username, password: password }))
      .then((response: any) => {
        // debugger
        // localStorage.setItem("token", response?.payload?.data?.accessToken);
        localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTcwNDQzNzE2Nn0.Oop3F0l22-qf1in5eM8ovvVIoN136lNd6wG0MPIS-Ds");
        navigate("/dashboard");
      })
      .catch((err: any) => {
        console.log("Login submit err", err);
      });
  };

  return (
    <div className="login-wrap" style={{ display: 'flex', alignContent: 'center' }}>
      <div className="login-form-wrap">
        <form onSubmit={submitHandler}>
          <h2 className="login-form-title">SmartSheet Login</h2>
          <div className="form-content">
            <div className={`form-control`}>
              <label className="input-label" htmlFor="email">
                Email<span>*</span>
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Enter Email"
                onChange={(e) => setUsername(e.target.value)}
                ref={null}
                value={username}
                className={`common-input`}
                autoFocus={true}
              />
              <span className="input-preffix">{<EmailIcon size="24" color="#181F2A" />}</span>

            </div>

            <div
              className={`form-control password-filed orange-dark`}
            >
              <label className="input-label" htmlFor="password">
                Password<span>*</span>
              </label>
              <input
                type="text"
                name="password"
                id="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                ref={null}
                value={password}
                className={`common-input orange-dark ispreffix ${isVisible ? "visible" : ""
                  } `}
                autoFocus={false}
              />
              <span className="input-preffix">{<LockIcon size="24" color="#181F2A" />}</span>

              <span
                className={`toggle-visible ${isVisible ? "visible" : ""}`}
                onClick={(e) => {
                  setIsVisible(!isVisible);
                }}
              >
                <EyeIcon />
              </span>
            </div>
          </div>
          {/* <div className="forgot-password">
            <Link className="text-blue text-sm" to="#">
              Register
            </Link>
          </div> */}
          <div className="btn-wrapper">
            {/* <ButtonSubmit title={"Login"} disabled={false} /> */}
            <Button
              type="submit"
              title="Login"
              style="purple-dark"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
