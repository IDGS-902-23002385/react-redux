import { useDispatch, useSelector} from "react-redux";
import { decrement, increment, reset,incrementByAmount } from "./counterSlice";
import { useState } from "react";

export default function Counter(){
    const value=useSelector((state)=>state.counter.value);
    const dispatch = useDispatch();
    const [amount,setAmount]=useState(10);
    return(
        <div className="card">
            <h1></h1>
            <h2>Valor:{value}</h2>
            <div className="rows">
                <button onClick={()=>dispatch(increment())}>Incrementa</button>
                <button onClick={()=>dispatch(decrement())}>Decrementra</button>
                <button onClick={()=>dispatch(reset())}>Reinicia</button>
            </div>
            <div className="rows">
                <input type="number" value={amount} onChange={(e)=> setAmount(Number(e.target.value))}/>
                <button onClick={()=>dispatch(incrementByAmount(amount))}> Incrementa cantidad</button>
            </div>
        </div>
    )
}