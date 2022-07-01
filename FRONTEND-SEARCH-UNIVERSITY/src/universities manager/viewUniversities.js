const viewUni = function functionViewUni(universities){
    universities.forEach(element => {
        console.log('name: ' + element.name + ' country: ' + element.country);
    });
}

module.exports = viewUni;