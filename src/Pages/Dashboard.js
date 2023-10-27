import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Cards from "../Components/Cards";
import AddIncomeModal from "../Components/Modals/addIncome";
import { addDoc,collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "../fierbase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import AddExpenseModal from "../Components/Modals/addExpense";
import TransactionTable from "../Components/TransactionTable";
import Chart from "../Components/Charts";
import NoTransactions from "../Components/NoTransactions";

const Dashboard=()=>{
    

    const [transactions,setTransactions]=useState([]);
    const [user]=useAuthState(auth)
    const [isExpenseModalVisible,setIsExpenseModalVisible]=useState(false);
    const [isIncomeModalVisible,setIsIncomeModalVisible]=useState(false);
    const [loading,setLoading]=useState(false);
    const [income,setIncome]=useState(0);
    const [expense,setExpense]=useState(0);
    const [totalBalance,setTotalBalance]=useState(0);


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


    function calculateBalance(){
        let incomeTotal=0;
        let expenseTotal=0;

        transactions.forEach((transaction)=>{
            if(transaction.type==='income'){
                incomeTotal+=transaction.amount
            }else{
                expenseTotal+=transaction.amount
            }
        })

        setIncome(incomeTotal);
        setExpense(expenseTotal);
        setTotalBalance(incomeTotal-expenseTotal);
    }
    useEffect(()=>{
        calculateBalance();
    },[transactions])

    const onFinish=(values,type)=>{
        console.log("On Finish",values,type);
        const newTransaction={
            type:type,
            date:values.date.format("YYYY-MM-DD"),
            amount:parseFloat(values.amount),
            tag:values.tag,
            name:values.name
        }
       // console.log("User>>>>",user)
        addTranscation(newTransaction);

    }

    async function addTranscation(transaction,many){
        try{
            const docRef=await addDoc(
                collection(db, `users/${user.uid}/transactions`),
                transaction
            );
           // console.log("Document writted:", docRef.id);
            if(!many) toast.success("Transaction Added!")
            let newarr=transactions;
            newarr.push(transaction);
            setTransactions(newarr);
            calculateBalance();

        }catch(e){
            if(!many) toast.error(e.message);
        }
    }

    useEffect(()=>{
        fetchTransactions();
    },[user])

    async function fetchTransactions(){
        setLoading(true);
        if(user){
            const q=query(collection(db, `users/${user.uid}/transactions`))
            const querySnapshot=await getDocs(q);
            let transactionArray=[];
            querySnapshot.forEach((doc)=>{
                transactionArray.push(doc.data());
            })
            setTransactions(transactionArray);
            console.log("Transaction Array.....",transactionArray)
            toast.success("Transactions Fetched!")
        }
        setLoading(false);
    }

    let soretedTransactions=transactions.sort((a,b)=> a.date-b.date)
    return(
        <div>
            <Header/>
            {loading ?(<p>Loading...</p>):(<>
            <Cards showExpenseModal={showExpenseModal}
                   showIncomeModal={showIncomeModal}
                   income={income}
                   expense={expense}
                   totalBalance={totalBalance}
            />
            {transactions.length!=0?<Chart sortedTransactions={soretedTransactions}/>:<NoTransactions/>}
            <AddIncomeModal isIncomeModalVisible={isIncomeModalVisible} handleIncomeCancel={handleIncomeCancel} onFinish={onFinish}/>
            <AddExpenseModal isExpenseModalVisible={isExpenseModalVisible} handleExpenseCancel={handleExpenseCancel} onFinish={onFinish}/>
            </>)}
            <TransactionTable transactions={transactions} addTransaction={addTranscation} fetchTransactions={fetchTransactions}/>
        </div>
    )
}

export default Dashboard;