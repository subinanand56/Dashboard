import React, { useState,useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Layout from "../../components/Layout/Layout";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://web-final-etmp.onrender.com/api/v1/auth/login`,
        { email, password }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
  
        // Assuming the response includes the user object with a 'role' property
        const { user, token } = res.data;
        
        console.log('User Object:', user);
        console.log('role:',user.role);
        const userRole = user.role;
  
        // Save user data to authentication context
        setAuth({
          ...auth,
          user,
          token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
  
        // Check the role and redirect accordingly
        switch (userRole) {
          case 'admin':
            navigate("/admin-dashboard");
            break;
          case 'manager':
            navigate("/manager-dashboard");
            break;
          case 'employee':
            navigate("/employee-dashboard");
            break;
          default:
            navigate("/home");
            break;
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <LoginContainer>
      <div className="Admin-Dashboard">
        <div className="App-Glass">
          <div className="d-flex align-items-center justify-content-center">
            <Card
              style={{
                width: "300px",
                borderRadius: "15px",
                border: "2px solid rgba(0, 0, 0, 0.125)",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Card.Body>
                <Card.Title className="text-center">Login</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <div className="password-input">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                      />
                      <div
                        className="password-toggle"
                        onClick={togglePasswordVisibility}
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEye : faEyeSlash}
                        />
                      </div>
                    </div>
                  </Form.Group>
                  <div
                    className="d-flex justify-content-center"
                    style={{ marginTop: "20px" }}
                  >
                    <Button variant="primary" type="submit">
                      Login
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  .password-input {
    display: flex;
    align-items: center;
  }

  .password-toggle {
    cursor: pointer;
  }
  .Admin-Dashboard{
  background: linear-gradient(
  106.37deg,
  #B0E0E6 29.63%, 
  #87CEEB 51.55%, 
  #f3c6f1 90.85%  
);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
}
.App-Glass{
  display: grid;
  height: 97%;
  width: 97%;
  background: var(--glass);
  border-radius: 2rem;
  gap: 16px;

  overflow: hidden;
}

`;
export default Login;
