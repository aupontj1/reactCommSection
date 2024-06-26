const useNode = () => {
    // Adds a new tree node to a specific tree structure, 
    // based off a specific position defined by the comment ID parameter
    const insertNode = function (tree, commentId, item) {
        if(tree.id === commentId){
            tree.items.push({
                id: new Date().getTime(),
                name: item,
                items: []
            });

            return tree;
        };

        // Then the calls get stored in an array called latest node
        let latestNode = [];

        // function recursively searches for an appropriate position to insert the new node by calling 
        // itself on each child node 
        latestNode = tree.items.map((ob) => {
            return insertNode(ob, commentId, item);
        });

        // Finally creates a new object by spreading the properties of the original object
        // with the items property replaced with the latest new node array, since it will contain the entire 
        // structure in the end, (preserving the entire tree structure) 
        return { ...tree, items: latestNode};
    };

    // Update value in the tree
    const editNode = (tree, commentId, value) => {
        if(tree.id === commentId){
            tree.name = value;
            return tree;
        }

        tree.items.map((ob) => {
            return editNode(ob, commentId, value);
        });

        return {...tree};
    };

    const deleteNode = (tree, id) => {
        for(let i = 0; i < tree.items.length; i++){
            const currentItem = tree.items[i];
            if(currentItem.id === id){
                tree.items.splice(i, 1);
                return tree;
            } else {
                deleteNode(currentItem, id);
            }
        }
        return tree;
    };

    return { insertNode, editNode, deleteNode };
};

export default useNode;