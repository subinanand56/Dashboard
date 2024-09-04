import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import { AdminCardsData } from "../../../Data/AdminData"

function CompactCard({ param, setExpanded ,cardType}) {
  const Png = param.png;
  const [selectedOption, setSelectedOption] = useState("day");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [branches, setBranches] = useState([]);
  const [salesAmount, setSalesAmount] = useState("");
  const [expensesAmount, setExpensesAmount] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState("");

  useEffect(() => {
    const getAllBranches = async () => {
      try {
        const response = await axios.get(
          `https://web-final-etmp.onrender.com/api/v1/branch/get-branch`
        );
        if (response.data?.success) {
          setBranches(response.data.branch);
          setSelectedBranch("all");
        } else {
          console.error(
            response.data?.message || "Something went wrong in getting branches"
          );
        }
      } catch (error) {
        console.error(error);
        console.error("Network Error: Unable to connect to the API server");
      }
    };

    getAllBranches();
  }, []);

  useEffect(() => {
    const fetchSalesAmount = async () => {
      try {
        const currentDate = new Date();
        let yearValue = currentDate.getFullYear().toString();
        let monthValue = (currentDate.getMonth() + 1)
          .toString()
          .padStart(2, "0");
        let dayValue = currentDate.getDate().toString().padStart(2, "0");

        let endpoint = `https://web-final-etmp.onrender.com/api/v1/sales/all-sales/${selectedBranch}`;

        const response = await axios.get(endpoint, {
          params: {
            period: selectedOption,
            year: yearValue,
            month: monthValue,
            day: dayValue,
          },
        });

        if (response.data?.success) {
          setSalesAmount(response.data.totalSalesAmount.toString());
        } else {
          console.error(
            response.data?.message || "Error fetching sales amount"
          );
          setSalesAmount("");
        }
      } catch (error) {
        console.error("Network Error:", error);
        setSalesAmount("");
      }
    };

    fetchSalesAmount();
  }, [selectedOption, selectedBranch]);

  useEffect(() => {
    const fetchExpenseAmount = async () => {
      try {
        const currentDate = new Date();
        const yearValue = currentDate.getFullYear().toString();
        const monthValue = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const dayValue = currentDate.getDate().toString().padStart(2, '0');

        let endpoint = `https://web-final-etmp.onrender.com/api/v1/expense/all-expenses/${selectedBranch}`;

        const response = await axios.get(endpoint, {
          params: {
            period: selectedOption,
            year: yearValue,
            month: monthValue,
            day: dayValue,
          },
        });

        if (response.data?.success) {
          setExpensesAmount(response.data.totalExpenseAmount.toString());
        } else {
          console.error(response.data?.message || 'Error fetching expense amount');
          setExpensesAmount('');
        }
      } catch (error) {
        console.error('Network Error:', error);
        setExpensesAmount('');
      }
    };

    fetchExpenseAmount();
  }, [selectedOption, selectedBranch]);
  
  useEffect(() => {
    const fetchPurchaseAmount = async () => {
      try {
        const currentDate = new Date();
        let yearValue = currentDate.getFullYear().toString();
        let monthValue = (currentDate.getMonth() + 1).toString().padStart(2, "0");
        let dayValue = currentDate.getDate().toString().padStart(2, "0");
  
        let endpoint = `https://web-final-etmp.onrender.com/api/v1/purchaserqst/all-purchase/${selectedBranch}`;
  
        const response = await axios.get(endpoint, {
          params: {
            period: selectedOption,
            year: yearValue,
            month: monthValue,
            day: dayValue,
          },
        });
  
        if (response.data?.success) {
          setPurchaseAmount(response.data.totalPurchaseAmount.toString());
        } else {
          console.error(response.data?.message || "Error fetching purchase amount");
          setPurchaseAmount("");
        }
      } catch (error) {
        console.error("Network Error:", error);
        setPurchaseAmount("");
      }
    };
  
    fetchPurchaseAmount();
  }, [selectedOption, selectedBranch]);
  
  

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };


  let displayValue;
  let title;
  if (cardType === 'sales') {
    displayValue = salesAmount;
    title = 'Sales';
  } else if (cardType === 'expenses') {
    displayValue = expensesAmount;
    title = 'Expenses';
  } else if (cardType === 'purchases') {
    displayValue = purchaseAmount;
    title = 'Purchase';
  }

  return (
    <motion.ul
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      onClick={setExpanded}
    >
      <div className="radialBar">
      <span>{title} Amount</span>
      </div>
      <div className="detail">
        <Png />
         <span>Rs{displayValue}</span>
        
        <span>
          <select value={selectedOption} onChange={handleDropdownChange}>
            <option value="day">Day</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </span>
        <span>
          <select value={selectedBranch} onChange={handleBranchChange}>
            <option value="all">All</option>
            {branches.map((branch) => (
              <option key={branch._id} value={branch._id}>
                {branch.name}
              </option>
            ))}
          </select>
        </span>
      </div>
    </motion.ul>
  );
}

export default function AdminCard(props) {
  const [expanded, setExpanded] = useState(false);
  const { title } = props;
  
 
  let cardType = '';
  if (title === 'Sales Amount') {
    cardType = 'sales';
  } else if (title === 'Expenses Amount') {
    cardType = 'expenses';
  } else if (title === 'Purchase Amount') {
    cardType = 'purchases';
  }

  return (
    <AdminCardContainer>
      <CompactCard param={AdminCardsData[0]}  setExpanded={() => setExpanded(!expanded)} cardType={cardType} />
    </AdminCardContainer>
  );
}

const AdminCardContainer = styled.div`
  .CompactCard {
    display: flex;
    flex: 1;
    height: 12rem !important;
    border-radius: 0.7rem;
    color: white;
    padding: 1rem;
    position: relative;
    cursor: pointer;
  }
  .CompactCard:hover {
    box-shadow: none !important;
  }
  .radialBar {
    flex: 1 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 1rem;
  }
  .CircularProgressbar {
    width: 3rem !important;
    overflow: visible;
  }
  .CircularProgressbar-path {
    stroke: white !important;
    stroke-width: 12px !important;
    filter: drop-shadow(2px 4px 6px white);
  }
  .CircularProgressbar-trail {
    display: none;
  }
  .CircularProgressbar-text {
    fill: white !important;
  }

  .radialBar > span {
    font-size: 17px;
    font-weight: bold;
  }

  .detail {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
  }
  .detail > span:nth-child(2) {
    font-size: 22px;
    font-weight: bold;
  }
  .detail > span:nth-child(3) {
    font-size: 12px;
  }
  @media screen and (max-width: 768px) {
    .CompactCard {
      width: 100%;
      margin-bottom: 1rem;
    }
  }
`;
