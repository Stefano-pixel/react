import Table from './components/Table';
import Row from './components/Row';

import React, { useState } from 'react';
function Page() {
  console.log('run Page component ' + Math.random())

  var elements = [{ name: 'uni1', nation: 'italy' },
                  { name: 'uni2', nation: 'US' }]

  const array = useState('');

  const titleToShow = array[0];
  const setTitle = array[1];

  const clickHandler = () =>{
    setTitle('Updated ' + Math.random())
  }
  return (
    <div>
      <h1>Title: {titleToShow}</h1>
      number of rows: {elements.length}
      <Table>
        <Row name={elements[0].name} nation={elements[0].nation}></Row>
        <Row name={elements[1].name} nation={elements[1].nation}></Row>
      </Table>
      <button onClick={clickHandler}>Change title</button>
    </div>
  );
}

export default Page;

