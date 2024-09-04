import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [branch, setBranch] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://web-final-etmp.onrender.com/api/v1/auth/register`,
        { name, email, password, phone, address, role, branch }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        window.location.reload();
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

  const getAllBranches = async () => {
    try {
      const response = await axios.get(
        `https://web-final-etmp.onrender.com/api/v1/branch/get-branch`
      );
      if (response.data?.success) {
        setBranches(response.data.branch);
      } else {
        toast.error(
          response.data?.message || "Something went wrong in getting branches"
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Network Error: Unable to connect to the API server");
    }
  };

  useEffect(() => {
    getAllBranches();
  }, []);

  return (
    <RegisterContainer>
      <div
        className="d-flex justify-content-center align-items-center mt-4"
        style={{ height: "90vh" }}
      >
        <Card
          style={{
            width: "300px",
            borderRadius: "15px",
            border: "2px solid rgba(0, 0, 0, 0.125)",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Card.Body>
            <Card.Title className="text-center">Register Employee</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Name"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Select a role</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="branch">
                <Form.Label>Select Branch:</Form.Label>
                <Form.Control
                  as="select"
                  value={branch} 
                  onChange={(e) => {
                    const selectedBranchId = e.target.value;
                    setBranch(selectedBranchId); 
                    const foundBranch = branches.find(
                      (branch) => branch._id === selectedBranchId
                    );
                    const selectedBranchName = foundBranch
                      ? foundBranch.name
                      : "";

                    setSelectedBranch(selectedBranchName);
                  }}
                >
                  <option value="">Select a branch</option>
                  {branches.map((branch) => (
                    <option key={branch._id} value={branch._id}>
                      {branch.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
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
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </div>
                </div>
              </Form.Group>

              <Form.Group controlId="formBasicPhones">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter Phone number"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter address"
                  required
                />
              </Form.Group>

              <div
                className="d-flex justify-content-center"
                style={{ marginTop: "20px" }}
              >
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </RegisterContainer>
  );
};

const RegisterContainer = styled.div`
  .password-input {
    display: flex;
    align-items: center;
  }

  .password-toggle {
    cursor: pointer;
  }
`;

export default Register;
