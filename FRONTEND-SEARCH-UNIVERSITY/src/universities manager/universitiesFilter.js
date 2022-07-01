const universitiesIncludes = (universities, uni) => {
    for (var u of universities) {
        // console.log('u.id' + u.id + 'u.name= ' + u.name + ' uni.name= ' + uni.name)
        if (u.id === uni.id) {
            return true;
        }
    }
    return false;
}

export function getUniversitiesToDelete(oldUniversities, universities){
    let difference = oldUniversities.filter(x => {
         return !universitiesIncludes(universities, x)
        });
    return difference;
}

export function getUniToAddDeleteUpdate(oldUniversities, universities, uniToPostDeleteUpdate){
    let universitiesCopy = [...universities];
    let indexUniToDelete = -1;
    let indexUniToPost = -1;
    console.log('old universities')
    console.log(oldUniversities)
    console.log('universities')
    console.log(universities)
    
    for(var i = 0; i < oldUniversities.length; i++){
       indexUniToDelete = i;
       for(var j = 0; j < universitiesCopy.length; j++){
         if(oldUniversities[i].id == universitiesCopy[j].id){
            indexUniToDelete = -1;
         }
       }
       if(indexUniToDelete >= 0){
        uniToPostDeleteUpdate.delete.push(oldUniversities[indexUniToDelete])
       }
    }

    for(var i = 0; i < universitiesCopy.length; i++){
        indexUniToPost = i;
        for(var j = 0; j < oldUniversities.length; j++){
          if(universitiesCopy[i].id == oldUniversities[j].id){
            indexUniToPost = -1;
            if(universitiesCopy[i].name != oldUniversities[j].name ||
               universitiesCopy[i].country != oldUniversities[j].country){
               uniToPostDeleteUpdate.update.push([oldUniversities[j], universitiesCopy[i]]); 
            }
          }
        }
        if(indexUniToPost >= 0){
         uniToPostDeleteUpdate.post.push(universitiesCopy[indexUniToPost])
        }
     }
    
    console.log('Added')
    console.log(uniToPostDeleteUpdate.post)
    console.log('Deleted')
    console.log(uniToPostDeleteUpdate.delete)
    console.log('Updated')
    console.log(uniToPostDeleteUpdate.update)
}

export function getUniversitiesToUpdate(){
    console.log('getUniversitiesToUpdate')
}