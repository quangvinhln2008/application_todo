import TodoItems from '../Todo/components/Item/index'
import React from 'react';

function Todo() {
    return ( 
        <div>
            <TodoItems taskName = 'Task name 1' />
            <TodoItems taskName = 'Task name 2' />
            <TodoItems taskName = 'Task name 3' />
        </div>
     );
}

export default Todo;