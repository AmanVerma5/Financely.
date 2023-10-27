import { Radio, Select, Table } from "antd";
import React, { useState } from "react";
import './style.css';
import Button from "../Button";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";

const {Option}=Select;

const TransactionTable=({transactions,addTransaction,fetchTransactions})=>{

    const [search,setSearch]=useState('');
    const [typeFilter,setTypeFilter]=useState('');
    const [sortKey,setSortKey]=useState('');
      
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
          },
          {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
          },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: 'Tag',
          dataIndex: 'tag',
          key: 'tag',
        },
        
        
      ];
      
      let filteredTransactions=transactions.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase())
                                                            && item.type.includes(typeFilter))
    
      let sortedTransactions=filteredTransactions.sort((a,b)=>{
        if(sortKey==='date'){
            return new Date(a.date)-new Date(b.date);
        }else if(sortKey==='amount'){
            return a.amount-b.amount;
        }else{
            return 0;
        }
      })


      function exportCSV(){
        const csv = unparse(transactions, {
          fields: ["name", "type", "date", "amount", "tag"],
        });
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "transactions.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      function importFromCsv(event) {
        event.preventDefault();
        try {
          parse(event.target.files[0], {
            header: true,
            complete: async function (results) {
              // Now results.data is an array of objects representing your CSV rows
              for (const transaction of results.data) {
                // Write each transaction to Firebase, you can use the addTransaction function here
                console.log("Transactions", transaction);
                const newTransaction = {
                  ...transaction,
                  amount: parseFloat(transaction.amount),
                };
                await addTransaction(newTransaction, true);
              }
            },
          });
          toast.success("All Transactions Added");
          fetchTransactions();
          event.target.files = null;
        } catch (e) {
          toast.error(e.message);
        }
      }

    return (
      <div className="transaction-table">
        <div className="selection-container">
          <div className="input-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 50 50"
            >
              <path d="M 21.5 8 C 14.057 8 8 14.057 8 21.5 C 8 28.943 14.057 35 21.5 35 C 24.789065 35 27.805703 33.816017 30.150391 31.853516 C 30.435292 32.138417 39.711913 41.416007 39.943359 41.648438 C 40.413359 42.118437 41.176484 42.118437 41.646484 41.648438 C 42.116484 41.178438 42.116484 40.415312 41.646484 39.945312 C 41.415038 39.712882 32.138417 30.435292 31.853516 30.150391 C 33.816017 27.805703 35 24.789065 35 21.5 C 35 14.057 28.943 8 21.5 8 z M 21.5 9 C 28.392 9 34 14.608 34 21.5 C 34 28.392 28.392 34 21.5 34 C 14.608 34 9 28.392 9 21.5 C 9 14.608 14.608 9 21.5 9 z"></path>
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name"
            />
          </div>
          <Select
            className="select-input"
            onChange={(value) => setTypeFilter(value)}
            placeholder="Filter"
            allowClear
          >
            <Option value="">All</Option>
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
          </Select>
        </div>

        <div className="table">
          <div className="my-table">
            <h3>My Transactions</h3>
            <Radio.Group
              className="input-radio"
              onChange={(e) => setSortKey(e.target.value)}
              value={sortKey}
            >
              <Radio.Button value="">No Sort</Radio.Button>
              <Radio.Button value="date">Sort by date</Radio.Button>
              <Radio.Button value="amount">Sort by amount</Radio.Button>
            </Radio.Group>
            <div className="csv">
              <Button text="Export to CSV" blue={false} onClick={exportCSV} />
              <label for="file-csv" className="btn btn-blue">
                Import from CSV
              </label>
              <input
                onChange={importFromCsv}
                id="file-csv"
                type="file"
                accept=".csv"
                required
                style={{ display: "none" }}
              />
            </div>
          </div>
          <Table dataSource={sortedTransactions} columns={columns} />
        </div>
      </div>
    );
}


export default TransactionTable;