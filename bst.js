import { error } from 'console';
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

    insert(value) {
        let searchNode = this.root;
        let newNode = new Node(value);
        while(true) {
            if(searchNode._data > value) {
                // go left
                if(searchNode.left == null) {
                    // value is less than lowest leaft in this path - make it new leaf and set left pointer of searchNode to newNode
                    searchNode.left = newNode;
                    break;
                } else {
                    // search further left
                    searchNode = searchNode.left;
                }                
            } else if (searchNode._data < value) {
                // value is more than lowest leaft in this path - make it new leaf and set right pointer of searchNode to newNode
                if(searchNode.right == null) {
                    searchNode.right = newNode;
                    break;
                } else {
                    // search further right
                    searchNode = searchNode.right;
                }
            } else {
                // covering the edge case where were trying to insert a value already found in the BST
                return; 
            }
        }
    }

    delete(value) {
        let searchResults = this.find(value);
        // console.log(searchResults);
        if(searchResults.searchNode == null) {
            // value not in BST, return from function
            return;
        } else if(searchResults.searchNode.left == null && searchResults.searchNode.right == null) {
            // value we are deleting is a leaf, children dont need to be accounted for
            if(searchResults.searchNode._data > searchResults.prevNode._data) {
                // searchResults data is greater than its parent -> searchResults is the right child of prevNode
                searchResults.prevNode.right = null;
            } else {
                // searchResults data is less than its parent -> searchResults is the left child of prevNode
                searchResults.prevNode.left = null;
            }
        } else if((searchResults.searchNode.left == null && searchResults.searchNode.right != null) || (searchResults.searchNode.left != null && searchResults.searchNode.right == null)) {
            // value we are deleting has 1 child
            if(searchResults.searchNode.left == null) {
                // the child is on the right
                if(searchResults.searchNode._data > searchResults.prevNode._data) {
                    // searchResults node is the right child of prevNode -> make searchResults right child the right child of prevNode
                    searchResults.prevNode.right = searchResults.searchNode.right;
                } else {
                    // searchResults node is the left child of prevNode -> make searchResults right child the left child of prevNode
                    searchResults.prevNode.left = searchResults.searchNode.right;

                }
            } else {
                // the child is on the left
                if(searchResults.searchNode._data > searchResults.prevNode._data) {
                    // searchResults node is the right child of prevNode -> make searchResults left child the right child of prevNode
                    searchResults.prevNode.right = searchResults.searchNode.left;
                } else {
                    //searchResults node is the left child of prevNode -> make searchResults left child the left child of prevNode
                    searchResults.prevNode.left = searchResults.searchNode.left;
                }
            }
        } else {
            // value we are deleting has 2 children
            let parent = searchResults.prevNode;
            let delNode = searchResults.searchNode;
            let prev;
            let repNode = delNode.right;
            while(repNode.left != null) {
                // console.log(`repNode data is = ${repNode._data}`);
                prev = repNode;
                repNode = repNode.left;
            }

            if (prev != null) {
                //if prev != null, then we had to go down a series of nodes to reach the repNode. we need to sete repNodes parents left to null to avoid circular chains
                prev.left = null;
            }

            if(delNode._data > parent._data) {
                //delNode is right child of parent
                parent.right = repNode;                
            } else {
                //delNode is left child of parent
                parent.left = repNode;
            }

            // console.log(delNode)

            repNode.left = delNode.left;
            // console.log(repNode);
            if(delNode.right == repNode) {
                // repNode is the only shift from delNode and there are no further nodes down the chain, therefore repNode will have no right child
                repNode.right = null;
            } else {
                repNode.right = delNode.right;
            }
            // console.log(repNode);
        }
        searchResults.searchNode = null;
    }


    find(value) {

        let prevNode;
        let searchNode = this.root;

        while(searchNode != null) {
            
            if(searchNode._data == value) {
                return { prevNode, searchNode };
            } else if(searchNode._data > value) {
                // check left
                prevNode = searchNode;
                searchNode = searchNode.left;
            } else if(searchNode._data < value) {
                //check right
                prevNode = searchNode;
                searchNode = searchNode.right;
            }
        }
        return { prevNode, searchNode };
    }

    // breadth-first-search function which calls a callback function on each node of the tree in level order
    levelOrder(callback) {
        // make sure callback is provided
        if(callback == undefined) {
            throw error ("You must provide a callback function");
        }

        let queue = [];
        let curr;
        queue.push(this.root);
        while(queue.length !== 0) {
            curr = queue.shift();
            callback(curr);
            if(curr.left != null) {
                queue.push(curr.left);
            }
            if(curr.right != null) {
                queue.push(curr.right);
            }
        }
    }

    // depth-first-search function which calls a callback function on ceach node of the tree in recursive preOrder
    preOrder(root, callback) {
        // make sure callback is provided
        if(callback == undefined) {
            throw error ("You must provide a callback function");
        }

        if(root == null) {
            return;
        }
        callback(root);
        this.preOrder(root.left, callback);
        this.preOrder(root.right, callback);
    }

    // depth-first-search function which calls a callback function on ceach node of the tree in recursive inOrder
    inOrder(root, callback) {
        // make sure callback is provided
        if(callback == undefined) {
            throw error ("You must provide a callback function");
        }

        if(root == null) {
            return;
        }

        if(root.left != null) {
            this.inOrder(root.left, callback);
        }
        callback(root);
        if(root.right != null) {
            this.inOrder(root.right, callback);
        }
    }
    // depth-first-search function which calls a callback function on ceach node of the tree in recursive postOrder
    postOrder(root, callback) {
        // make sure callback is provided
        if(callback == undefined) {
            throw error ("You must provide a callback function");
        }

        if(root == null) {
            return;
        }

        if(root.left != null) {
            this.postOrder(root.left, callback);
        }
        if(root.right != null) {
            this.postOrder(root.right, callback);
        }
        callback(root);
    }

    // returns the height of the tree defined at "value"
    height(value) {
        // if nothing is provided, return null
        if(value == undefined) {
            return null;
        }

        let root = value;
        let left = 0;
        let right = 0;
        if(root.left != null) {
            left = 1 + this.height(root.left);
        }

        if(root.right != null) {
            right = 1 + this.height(root.right);
        }

        return Math.max(left, right);
    }

    depth(value, root, first) {

        // checks to see if the value even exists in the tree in the first place. Does this on the first iteration and returns null immediately if value isnt found
        if(first) {
            let res = this.find(value);
            if(res.searchNode == null) {
                return null
            }
        }

        // we found the value
        if(root._data == value) {
            return 0;
        }

        // value is to the left of root
        if(root._data > value) {
            return 1 + this.depth(value, root.left, false);
        }

        // value is to the right of root
        if(root._data < value) {
            return 1 + this.depth(value, root.right, false)
        }
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

function printNodeData(node) {
    console.log(node._data);
}

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = new Tree(arr);
tree.root = buildTree(arr);
prettyPrint(tree.root);
// console.log(tree.depth(324, tree.root, true));
// tree.levelOrder(printNodeData);
// tree.preOrder(tree.root, printNodeData);
// tree.inOrder(tree.root, printNodeData);
// tree.postOrder(tree.root, printNodeData);


// let searchResults = tree.find(7);
// console.log(searchResults);



// prettyPrint(tree.root);
// console.log("------------------")
// tree.insert(6);
// prettyPrint(tree.root);
// console.log("------------------")
// tree.insert(2);
// prettyPrint(tree.root);
// console.log("------------------")
// tree.insert(7);
// prettyPrint(tree.root);
// console.log("------------------")
// tree.insert(10);
// prettyPrint(tree.root);
// console.log("------------------")
// tree.insert(11);
// prettyPrint(tree.root);
// console.log("------------------")
// tree.insert(10000);
// prettyPrint(tree.root);
// console.log("------------------")
// tree.insert(20000);
// prettyPrint(tree.root);
// console.log("------------------")

// console.log(tree.height(tree.root));
// tree.insert(10000);
// tree.insert(8000);
// tree.insert(9000);
// tree.insert(9500);
// tree.insert(7000);
// tree.insert(20000);
// prettyPrint(tree.root);
// console.log(tree.height(tree.root));
// console.log("------------------")
// console.log(tree.depth(9500, tree.root, true));
// tree.postOrder(tree.root, printNodeData);
// tree.levelOrder(printNodeData);
// tree.preOrder(tree.root, printNodeData);
// tree.inOrder(tree.root, printNodeData);
// tree.delete(67);
// prettyPrint(tree.root);
// console.log("------------------")



