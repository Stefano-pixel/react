import FormUniveristy from './components/FormUniversity';

import React, { useState } from 'react';
function Page() {

    const arryaName = useState('')
    const nameArray = arryaName[0]
    const setName = arryaName[1]

  var nameUniveristy = ''
  const setNameUniversity= (name)=>{
    console.log('name ----- '+nameUniveristy)
    console.log(this)
    setName(name)
  }

  return (
    <div>
      <h1>University name: {nameArray}</h1>
      <FormUniveristy onSetNameUniversity = {setNameUniversity}/> 
    </div>
  );
}

export default Page;
