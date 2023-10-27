import React from "react";
import { Card,Row } from "antd";
import './style.css';
import Button from "../Button";
const Cards=({showExpenseModal,showIncomeModal})=>{
    return(
        <div>
            <Row className="my-row">
                <Card className="my-card" title="Current Balance">
                    <p>₹0</p>
                    <Button text="Reset Balance" blue={true}/>
                </Card>
                <Card className="my-card" title="Total Income">
                    <p>₹0</p>
                    <Button text="Add Income" blue={true} onClick={showIncomeModal}/>
                </Card>
                <Card className="my-card" title="Total Expense">
                    <p>₹0</p>
                    <Button text="Add Expense" blue={true} onClick={showExpenseModal}/>
                </Card>
            </Row>
        </div>
    )
}

export default Cards;