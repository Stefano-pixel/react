function Row(props){
    console.log('run Row component ' + Math.random())
    return(
        <tr>
            <td>{props.name}</td>
            <td>{props.nation}</td>
        </tr>
    )
}

export default Row;