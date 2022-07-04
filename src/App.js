import {db} from './firebase-config'
import {uid} from 'uid'
import {set,ref, onValue,remove,update} from 'firebase/database'
import {useState,useEffect} from 'react'

function App(){
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [Edit, setEdit] = useState(false);
    const [tempUuid, setTempUuid] = useState("");


    const handleTodoChange = (e) => {
        setTodo(e.target.value);
    };

    //READ FROM DATABASE
    useEffect(() => {
        onValue(ref(db), (snapshot) => {
            setTodos([]);
            const data = snapshot.val();
            if (data !== null) {
            Object.values(data).map((todo) => {
                setTodos((oldArray) => [...oldArray, todo]);
            });
            }
        });
    }, []);

    //CREATE/WRITE TO DATABASE
    function writeToDataBase() {
        const uuid = uid();
    set(ref(db, `/${uuid}`), {
        todo,
        uuid,
    });

    setTodo("");
    };

      //update
    const handleUpdate = (todo) => {
        setEdit(true);
        setTempUuid(todo.uuid);
        setTodo(todo.todo);
        };
    
        const handleSubmitChange = () => {
        update(ref(db, `/${tempUuid}`), {
            todo,
            uuid: tempUuid,
        });
    
        setTodo("");
        setEdit(false);
        };
     //DELATE FROM WEB AND DATABASE
    const handleDelete = (todo) => {
        remove(ref(db, `/${todo.uuid}`));
        };

    return(
        <div className='App'>
        <input type={Text} value={todo} onChange={handleTodoChange} ></input>
        {Edit ? (
        <>
            <button onClick={handleSubmitChange}>Submit Change</button>
            <button
            onClick={() => {
                setEdit(false);
                setTodo("");
            }}
            >
            X
            </button>
        </>
        ) : (
            <button onClick={writeToDataBase} >submit</button>
        )}
        {todos.map(todo=>(
            <>
                <h1>{todo.todo}</h1>
                <button onClick={() => handleUpdate(todo)}>Update</button>
                <button onClick={() => handleDelete(todo)}>Delate</button>
            </>
        ))}
        </div>
    )
}

export default App;
