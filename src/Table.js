import Row from './components/Row';

function Table() {
  var elements = [{ name: 'uni1', nation: 'italy' },
                  { name: 'uni2', nation: 'US' }]
  return (
    <div>
      number of rows: {elements.length}
      <div>name: {elements[0].name}, nation: {elements[0].nation}</div>
      <div>name: {elements[1].name}, nation: {elements[1].nation}</div>
      <table>
        <Row name={elements[0].name} nation={elements[0].nation}></Row>
        <Row name={elements[1].name} nation={elements[1].nation}></Row>
      </table>
    </div>
  );
}

export default Table;

