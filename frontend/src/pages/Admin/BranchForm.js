import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import axios from "axios";
import { Button, Table, Card, Row, Col } from "react-bootstrap";
import AddBranchForm from "./AddBranchForm";
import { Modal } from "antd";

const BranchForm = () => {
  const [branches, setBranches] = useState([]);
  const [name, setName] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `https://web-final-etmp.onrender.com/api/v1/branch/create-branch`,
        {
          name,
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllBranches();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in the input form");
    }
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

  const handleRowClick = (branch) => {
    if (selectedBranch === branch) {
      setSelectedBranch(null);
    } else {
      setSelectedBranch(branch);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://web-final-etmp.onrender.com/api/v1/branch/update-branch/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllBranches();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `https://web-final-etmp.onrender.com/api/v1/branch/delete-branch/${pId}`
      );
      if (data?.success) {
        toast.success(`Branch is updated`);
        getAllBranches();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BranchFormContainer>
      <Row className="mt-5 justify-content-center">
        <Col md={12} lg={6} className="mb-5">
          <Card>
            <Card.Body>
              <Modal
                onCancel={() => setVisible(false)}
                footer={null}
                open={visible}
              >
                <AddBranchForm
                  value={updatedName}
                  setValue={setUpdatedName}
                  handleSubmit={handleUpdate}
                />
              </Modal>
              <div className="p-3">
              <h2 className="text-center ">Add New Branches</h2>
                <AddBranchForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} lg={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center pt-3">Branches</h2>
              {Array.isArray(branches) && branches.length > 0 ? (
                <CustomTable responsive hover>
                  <thead>
                    <tr>
                      <th>Branch Name</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {branches.map((branch, index) => (
                      <tr key={index} onClick={() => handleRowClick(branch)}>
                        <td>{branch?.name}</td>
                        <td>
                          {selectedBranch === branch && (
                            <>
                              <Button
                                variant="primary ms-2"
                                onClick={() => {
                                  setVisible(true);
                                  setUpdatedName(branch.name);
                                  setSelected(branch);
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="danger ms-2 "
                                onClick={() => {
                                  handleDelete(branch._id);
                                }}
                              >
                                Delete
                              </Button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </CustomTable>
              ) : (
                <p>No branches found.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </BranchFormContainer>
  );
};

const BranchFormContainer = styled.div``;

const CustomTable = styled(Table)`
  background-color: #ffa500;
  border-radius: 20px;
  cursor: pointer;
`;

export default BranchForm;
