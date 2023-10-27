import React from "react";
import { Line, Pie } from '@ant-design/charts';
import './style.css';

const Chart=({sortedTransactions})=>{
    

    const data=sortedTransactions.map((item)=>{
        return{date:item.date,amount:item.amount}
    })

    const spendingData=sortedTransactions.filter((transaction)=>{
        if(transaction.type==='expense') return{tag: transaction.tag,amount:transaction.amount}
    })

    let finalSpendings=spendingData.reduce((acc,obj)=>{
        let key=obj.tag;
        if(!acc[key]){
            acc[key]={tag:obj.tag,amount:obj.amount}
        }else{
            acc[key].amount+=obj.amount;
        }
        return acc;
    },{});
    
    const spendingConfig = {
        data:Object.values(finalSpendings),
        width: 800,
        angleField:"amount",
        colorField:"tag"

      };
      const config = {
        data:data,
        width: 800,
        height: 400,
        autoFit: false,
        xField: 'date',
        yField: 'amount',
      };
    
      let chart;
      let pieChart;

    return (
        <div className="chart-wrapper">
            <div className="line-chart">
                <h3>Financial Statistics</h3>
                <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
            </div>
            <div className="pie-chart">
                <h3>Total Spending</h3>
                <Pie {...spendingConfig} onReady={(chartInstance) => (pieChart = chartInstance)}/>
            </div>
        </div>
    )
}


export default Chart;