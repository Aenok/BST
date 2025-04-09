export function mergeSort(array) {

    if(array.length == 1) {
        return array;
    } else {
        // console.log(array);
        let pos = Math.floor(array.length/2);
        let retVal = [];
        let left = mergeSort(array.slice(0, pos));
        // console.log(`left is ${left}`);
        let right = mergeSort(array.slice(pos, array.length));
        // console.log(`right is ${right}`);
        while(left.length != 0 && right.length !=0) {
            if(left[0] < right[0]) {
                retVal.push(left.shift());
            } else {
                retVal.push(right.shift());
            }
        }
        if(left.length == 0) {
            retVal.push(right.shift());
        } else {
            retVal.push(left.shift());
        }
        return retVal.concat(left, right);
    }
}

// console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
// console.log(mergeSort([105, 79, 100, 110]));