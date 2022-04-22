import React, {useState} from 'react';
import Table from './components/Table'
import FormUniveristy from './components/FormUniversity';

function Page() {

  const [arrayUni, setArray] = useState([])                              
  
  const addUniversity = (uni) => {
    //add an element
    setArray((prev)=>{
      return [uni, ...prev];
    })
  }

  const removeUniversity = (name) => {
    //remove the element with id equal to idUni
    if(typeof arrayUni !== 'undefined' && arrayUni !== null && arrayUni.length !== 0){
        setArray((prev)=>{
          prev.splice(prev.findIndex(object => { return object.name === name}),1)
          return [...prev];
        })
    } else {
      console.log('Errore list vuota o nulla o non definita');
      console.log(arrayUni)
    }
  }

  return (
    <div>
      <h1>Univeristy manager</h1>
      <FormUniveristy onAddUniversity={addUniversity} onRemoveUniversity={removeUniversity}/> 
      <Table items = {arrayUni}/>
    </div>
  );
}

export default Page;
