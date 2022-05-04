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
                    <td>{uni.country}</td>
                 </tr>
                ))
            }
            </table>)

}

export default Table;