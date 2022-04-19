import Row from './Row'

function Table(props){  

    return (<table>
            <tr>
               <th>Name</th>
               <th>Nation</th>
            </tr>
            {
                props.items.map((uni) => (
                 <tr>
                    <td>{uni.name}</td>
                    <td>{uni.nation}</td>
                 </tr>
                ))
            }
            </table>)

}

export default Table;