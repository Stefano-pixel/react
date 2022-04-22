import React, {useState} from 'react';

const FormUniveristy = (props) =>{

    const arrayNameUniversity = useState('')
    const enteredName = arrayNameUniversity[0];
    const setEnteredTitle = arrayNameUniversity[1];

    const arryaNationUniveristy = useState('')
    const enteredUniversity = arryaNationUniveristy[0]
    const setEnteredUniversity = arryaNationUniveristy[1]

    const nameChangeHandler = (event) => {
            setEnteredTitle(event.target.value);
    }

    const universityChangeHandler = (event) => {
            setEnteredUniversity(event.target.value);
    }

    const removeUniversity = ()=>{
        props.onRemoveUniversity(enteredName);
    }

    const addUniversity = ()=>{
        props.onAddUniversity({name: enteredName, nation: enteredUniversity})
    }

    const submitHandler = (event) =>{
        event.preventDefault();

          setEnteredTitle('');
          setEnteredUniversity('');
    }

    return <form onSubmit={submitHandler}>
        <div>
            <div>
                <label>Name</label>
                <input 
                     type='text' 
                     value={enteredName}
                     onChange={nameChangeHandler} 
                     />
            </div>
            <div>
                <label>Nation</label>
                <input 
                     type='text' 
                     value={enteredUniversity}
                     onChange={universityChangeHandler}
                     />
            </div>
        </div>
        <button onClick={removeUniversity}>Remove University</button>
        <button onClick={addUniversity}>Add Univeristy</button>
    </form>
}

export default FormUniveristy;