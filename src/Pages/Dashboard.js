import React, { useState } from "react";
import Header from "../Components/Header";
import Cards from "../Components/Cards";
import { Modal } from "antd";
import AddIncomeModal from "../Components/Modals/addIncome";

const Dashboard=()=>{

    const [isExpenseModalVisible,setIsExpenseModalVisible]=useState(false);
    const [isIncomeModalVisible,setIsIncomeModalVisible]=useState(false);

    const showExpenseModal=()=>{
        setIsExpenseModalVisible(true);
    }

    const showIncomeModal=()=>{
        setIsIncomeModalVisible(true);
    }

    const handleExpenseCancel=()=>{
        setIsExpenseModalVisible(false);
    }

    const handleIncomeCancel=()=>{
        setIsIncomeModalVisible(false);
    }

    const onFinish=(values,type)=>{
        console.log("On Finish",values,type);
    }



    return(
        <div>
            <Header/>
            <Cards showExpenseModal={showExpenseModal}
                   showIncomeModal={showIncomeModal}
            />
            <AddIncomeModal isIncomeModalVisible={isIncomeModalVisible} handleIncomeCancel={handleIncomeCancel} onFinish={onFinish}/>
            <Modal visible={isExpenseModalVisible} onCancel={handleExpenseCancel}>Expense</Modal>
        </div>
    )
}

export default Dashboard;