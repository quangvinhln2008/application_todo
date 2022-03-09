import React, { useState, useEffect } from "react";

const TodoItems = (props) => {
    const [change, setChange] = useState(true);
    const [count, setCount] = useState(0);
    const [element, setElement] = useState() ;

    useEffect(() => {
        setElement(<h2>you click {count}</h2>)
    }, [count]);

    return ( 
        <div>
            <input type ='checkbox'></input>
            <label>{props.taskName}</label>
            <button onClick={()=> setChange(!change)}>Edit</button>
            <button onClick={()=> setCount(count + 1)}>Delete</button>
            {element}
            {change? <h1>Welcome</h1>:<h1>click</h1>}
        </div>
     );
}

export default TodoItems