import {useState} from 'react'
import PieChartExample from './piechartsexample'

export default function Cards({type}) {

//const percentageSpend = (data.total / data.spend) * 100

if (type === "overview") {
    return (
        <div className='card'>
            <h2>OVERVIEW</h2>
            <PieChartExample />
        </div>
        );
    }
}