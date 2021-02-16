import { useState } from "react";

export const useInputState = (initialVal) =>{
    const [value, setValue] = useState(initialVal);

    const handleChange = e => {
        if (e.target){
            setValue(e.target.value);
        }else{
            setValue(e);
        }
        
    };
    // const resetValue = () => {
    //     setValue('')
    // }
    return [value, handleChange];
};

export const useToggle = (editable) => {
    const [state, setState] = useState(editable);
    const toggle = () => {
      setState(!state);
    };
    return [state, toggle];
};
// For can_deliver
export const useArray = (a) => {
    const [arr, setArr] = useState(a);
    const handleArr = arr => {
            setArr(arr);
    };
    const addArr = (newObj) => {
        setArr([...arr, newObj]);
    }
    const removeArr = todoId => {
        //filter out removed todo
        const updatedTodos = arr.filter(todo => todo.id !== todoId);
        //call setTodos with new todos array
        setArr(updatedTodos);
    }
    return [arr, handleArr, addArr, removeArr];
  };
  
  export const useForceUpdate = () => {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}