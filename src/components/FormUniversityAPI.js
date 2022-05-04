import React, {useState, useEffect} from 'react';
import Table from './Table'

const FormUniveristyAPI = (props) =>{
    //API baseURL
    const baseURL = "http://universities.hipolabs.com/search?country="

    const arrayNameUniversity = useState('')
    const enteredName = arrayNameUniversity[0];
    const setEnteredTitle = arrayNameUniversity[1];

    const trigger = useState('')
    const enteredTrigger = trigger[0];
    const setEnteredTrigger = trigger[1];

    const arrayUniversity = useState([])
    const unis = arrayUniversity[0];
    const setUnis = arrayUniversity[1]; 

    const searchUniversityHandler = (event)=>{
        setEnteredTitle(event.target.value)
    }

    //This function triggers the API call
    const triggerHandler = ()=>{
        setEnteredTrigger(Math.random())
    }
    
    //Clean the field after submitting
    const submitHandler = (event) =>{
        event.preventDefault();
          setEnteredTitle('');
    }

    useEffect(()=>{
        //Call the University's API
        fetch(baseURL + enteredName).then( (res) => {
            return res.json();
        }).then( data => {
            setUnis(data.slice(0));
        })
    },[enteredTrigger])

    return <form onSubmit={submitHandler}>
                <div>
                    <div>
                        <label>Name</label>
                        <input 
                            type='text' 
                            value={enteredName}
                            onChange={searchUniversityHandler}/>
                    </div>
                </div>
                <button onClick={triggerHandler}>Search</button>
                <Table items = {unis}/>
          </form>
}

export default FormUniveristyAPI;