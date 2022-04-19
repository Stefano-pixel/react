import React, {useState} from 'react';
import Table from './Table'

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

    const submitHandler = (event) =>{
        event.preventDefault();
          const univeristy = {
              name: enteredName,
              nation: enteredUniversity
          }

          console.log(univeristy)
          setEnteredTitle('');
          setEnteredUniversity('');
          props.onSetUniversityInformation(enteredName, enteredUniversity)
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
        <button type="submit">Add Univeristy</button>
    </form>
}

export default FormUniveristy;