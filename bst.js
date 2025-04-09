import { mergeSort as mergeSort } from './mergesort.js'

class Node {
    constructor(data) {
        this._data = data;
        this.left = null;
        this.right = null;
    }
}


class Tree {
    constructor(array) {
        this._array = array;
        this.root = null;
    }


    find(value) {
        let searchNode = this.root;

        while(searchNode != null) {
            
            if(searchNode._data == value) {
                return searchNode;
            } else if(searchNode._data > value) {
                // check left
                searchNode = searchNode.left;
            } else if(searchNode._data < value) {
                //check right
                searchNode = searchNode.right;
            }
        }
        return searchNode;
    }
}


//Builds the BST recursively
function buildTree(array) {

    if(array.length == 0) {
        return null;
    } else {

        let finalArr = formatArray(array);
        let rootPos = Math.floor(finalArr.length / 2);
        let rootNode = new Node(finalArr[rootPos]);
        let leftArr = finalArr.slice(0, rootPos);
        let rightArr = finalArr.slice(rootPos+1, finalArr.length);
        rootNode.left = buildTree(leftArr);
        rootNode.right = buildTree(rightArr);
        return rootNode;

    }


    

}

// Formats to sort array with mergesort and removes duplicates, returning the final array to be used to build the BST
function formatArray(array) {
        // sort
        let sortedArr = mergeSort(array);

        // remove duplicates
        let finalArr = []
        for(let i = 0; i < sortedArr.length; i++) {
            if(!finalArr.includes(sortedArr[i])) {
                finalArr.push(sortedArr[i]);
            }
        }

        return finalArr;
}

// Provided code that prints out the BST
const prettyPrint = (node, prefix = "", isLeft = true) => {

    if (node === null) {
      return;
    }

    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node._data}`);

    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = new Tree(arr);
tree.root = buildTree(arr);

// let node = tree.find(12);
// console.log(node);



// prettyPrint(tree.root);




