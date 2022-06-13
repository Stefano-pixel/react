const arr = [4, 3, 5, 7, 9];
var i = 0;
for(const a of arr){
    console.log(a)
    if (i == 2) {arr.splice(i,1);
                 break;}  
    i++;
}
console.log(arr)

console.log("cazzo" != "cazzo")
