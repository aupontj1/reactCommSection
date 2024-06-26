import { useState, useRef, useEffect } from "react";
import '../App.css';
import Action from "./Action";

const Comment = ({
    commentsItem, 
    handleInsertNode, 
    handleEditNode, 
    handleDeleteNode
}) => {
    const [input, setInput] = useState('');
    const [editMode, setEditMode] = useState(false);

    // Show initialized statement that is already set to false
    const [showInput, showSetInput] = useState(false);
    const [expand, setExpand] = useState(false);

    // To update the text properly
    const inputRef = useRef(null);

    // To highlight input text once you try to edit
    useEffect(() => {
        inputRef?.current?.focus();
    },[editMode]);

    // When clicked it showSetInput becomes true, to show the reply input element
    const handleNewComment = () => {
        setExpand(!expand);
        showSetInput(true);
    }

    const addComment = () => {
        // If true editMode will pass the handleEditNode function with
        // params of inputRef with the current innerText
        if(editMode){
            handleEditNode(commentsItem.id, inputRef?.current?.innerText);
        } else {
            setExpand(true);
            handleInsertNode(commentsItem.id, input);
            showSetInput(false);
            // Empty input state after entering a comment
            setInput("");
        }

        // After editing is finished, update editMode to false
        if (editMode) setEditMode(false);
    }

    const handleDelete = () => {
        handleDeleteNode(commentsItem.id);
    }

    return (
    <div>
        {/* If the comment id is equal to 1, then apply styling to this comment else, 
        apply styling to the other individual comments. */}
        <div className={commentsItem.id === 1 ? "containerInput" : "containerComment"}>

            {/* If the comment id is equal to 1, then show the top input w/ the comment btn. */}
            {commentsItem.id === 1 ? (
                <>
                <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                className="containerInput inputFirst" 
                autoFocus  
                placeholder="leave comment..." 
                />
                <Action className="reply comment" type="COMMENT" handleClick={addComment} />
            </>
            ) : 
            // Otherwise, show the comment name & info, if top comment is filled
            (
                <>
                <span 
                contentEditable={editMode}
                suppressContentEditableWarning={editMode}
                style={{wordWrap: "break-word"}} 
                ref={inputRef}
                >
                    {commentsItem.name}
                </span>
                    <div style={{display: 'flex', marginTop: "5px"}}>
                       {editMode ? (
                        <>
                            <Action className="reply" type="Save" handleClick={addComment}/>
                            <Action className="reply" type="Cancel" handleClick={() => {
                                if(inputRef.current)
                                    inputRef.current.innerText = commentsItem.name;
                                setEditMode(false)}} />
                        </>
                        ) : (
                            <>
                                <Action className="reply" type="Reply" handleClick={handleNewComment} />
                                <Action className="reply" type="Edit" handleClick={() => setEditMode(true)} />
                                <Action className="reply" type="Delete" handleClick={() => {handleDelete(commentsItem.id)}}/>
                            </>
                       )}
                    </div>
                </>
            )
            }
        </div>
        <div style={{ display: expand ? "block" : "none", paddingLeft: '25px'}}>
            {/* If showInput is true, then render a new input div containing two buttons
            Reply & Cancel  */}
            {showInput && (
                <div className="containerInput"> 
                <input 
                type="text" 
                className="containerInput_input" 
                autoFocus
                onChange={(e) => setInput(e.target.value)} 
                />
                    <Action className="reply" type="Reply" handleClick={addComment}/>
                    <Action className="reply" type="Cancel" handleClick={() => showSetInput(false)} />
                </div>
            )}

            {commentsItem?.items?.map((comm) => {
                return <Comment 
                handleInsertNode={handleInsertNode}
                handleEditNode={handleEditNode}
                handleDeleteNode={handleDeleteNode}
                key={comm.id} 
                commentsItem={comm} />
            })}
        </div>
    </div>
    );
}

export default Comment;