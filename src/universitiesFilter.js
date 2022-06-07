const universitiesIncludes = (universities, uni) => {
    for (var u of universities) {
        if (u.id === uni.id) {
            return true;
        }
    }
    return false;
}

export function getUniversitiesToDelete(oldUniversities, universities){
    console.log("ccc")
    // let difference = oldUniversities.filter(x => {
    //      console.log(!universitiesIncludes(universities, x))
    //      return !universitiesIncludes(universities, x)
    //     });
    // console.log(difference[0])
    // return difference;
}

export function getUniversitiesToUpdate(){
    console.log('getUniversitiesToUpdate')
}