
function Table(props){  
    console.log('run Table component ' + Math.random())
    return <table>{props.children}</table>;
}

export default Table;