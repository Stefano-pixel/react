import React, {useState} from 'react';
import Table from './components/Table'
import FormUniveristy from './components/FormUniversity';

function Page() {

  const [arrayUni, setArray] = useState([])                              

  const setUniversityInformation = (array) => {
    setArray(array)
  }

  console.log(arrayUni)

  return (
    <div>
      <h1>Univeristy manager</h1>
      <FormUniveristy onSetUniversityInformation = {setUniversityInformation}/> 
      <Table items = {arrayUni}/>
    </div>
  );
}

export default Page;
