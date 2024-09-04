import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import AdminCard from "../AdminCard/AdminCard";
import { AdminCardsData } from "../../../Data/AdminData";
import {
  UilEstate,
  UilUsersAlt,
  UilPackage,
  UilUsdSquare,
  UilMoneyWithdrawal,
  UilClipboardAlt,
} from "@iconscout/react-unicons";

const AdminCards = () => {
  const [salesAmount, setSalesAmount] = useState('');
  const [expensesAmount, setExpensesAmount] = useState('');
  const [purchasesesAmount, setPurchasesesAmount] = useState('');
  return (
    <AdminCardsContainer>

      <div className="Cards">
        <div className="parentContainer">
          <AdminCard
            title="Sales Amount"
            value={salesAmount}
            color="" 
            png={UilUsdSquare}
            
          />
        </div>
         <div className="parentContainer">
          <AdminCard
            title="Expenses Amount"
            value={expensesAmount}
            color="" 
            png={UilMoneyWithdrawal}
           
          />
        </div> 
        <div className="parentContainer">
          <AdminCard
            title="Purchase Amount"
            value={purchasesesAmount}
            color="" 
            png={UilClipboardAlt}
           
          />
        </div> 
        
      </div>

    </AdminCardsContainer>
  );
};
const AdminCardsContainer = styled.div`
.Cards {
  display: flex;
  gap: 10px;
}
.parentContainer{
  width: 100%;
}
@media screen and (max-width: 768px)
{
  .Cards{
    width: 90%;
    flex-direction: column;
    gap: 60px;
    margin-bottom:60px;
  }
  .parentContainer{
    height: 9rem;
  }
  @media screen and (max-width: 425px)
{
  .Cards{
    width: 80%;
    flex-direction: column;
    gap: 60px;
    margin-bottom:60px;
  }
  .parentContainer{
    height: 9rem;
  }
}
}
`;
export default AdminCards;
