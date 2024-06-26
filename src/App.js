import Comment from './comps/Comment';
import './App.css';
import useNode from './hooks/useNode';
import { useState, useRef, useEffect } from 'react';


// When the items array is empty it tells the user that no comment has been added, and that 
// there is no top most element in the tree of comments
const commentItems = {
  id: 1,
  items: []
}

function App() {
  // The state helps intialize the commentItems object 
  const [commentData, setCommentData] = useState(commentItems);

  const { insertNode, editNode, deleteNode } = useNode();

  // Each of three function will help update the comment status of state 
  // after each insertion, edit, or deletion of a node
  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertNode(commentData, folderId, item);
    setCommentData(finalStructure);
  }
  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(commentData, folderId, value);
    setCommentData(finalStructure); 
  }
  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(commentData, folderId);
    const temp = { ...finalStructure };
    setCommentData(temp);
  }

  return (
    <div className="App">
      <Comment 
      handleInsertNode={handleInsertNode}
      handleEditNode={handleEditNode}
      handleDeleteNode={handleDeleteNode}
      commentsItem={commentData} 
      />
    </div>
  );
}

export default App;
