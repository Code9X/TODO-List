import React from 'react'
import {db} from './firebase-config'
import {uid} from 'uid'
import {set,ref, onValue,remove,update} from 'firebase/database'
import {useState,useEffect} from 'react'
import './App.css'

function App(){
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [Edit, setEdit] = useState(false);
    const [tempUuid, setTempUuid] = useState("");
    const [checked, setChecked] = useState([]);

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
        
    // Add/Remove checked item from list
        const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
        };
    
    
    // Generate string of checked items
        var checkedItems = checked.length
        ? checked.reduce((total, todo) => {
        return total + ", " + todo;
        })
        : "";
    
    return(
        <div className='App'>
            <img className='bg' src={require('./Images/background.jpg')} alt='bg'></img>
            
                <div className='input' >
                    <h1 className='title'><span>TO DO</span></h1> 
                    <input className='search-bar' type={Text} value={todo} onChange={handleTodoChange} placeholder='Add a task' ></input>

                    {Edit ? (
                    <>
                    <button className='Change-button' onClick={handleSubmitChange}>Change</button>
                    <button className= "X-button"onClick={() => {setEdit(false);setTodo("");}} > X </button>
                    </>
                ) : (
                    <button className='submit-button' onClick={writeToDataBase} >submit</button>
                )}
                
                {/* TODO LIST MAPPING */}
                {todos.map((todo, index)=>(
                    <>
                        <div key={index}>
                        <input value={todo.todo} type="checkbox" onChange={handleCheck} className='checkBox' />
                        <h1 className='list'>{todo.todo}</h1>
                        </div>
                        <div className='up-del'>
                            <button className='update-button' onClick={() => handleUpdate(todo)}>Update</button>
                            <button className='delate-button' onClick={() => handleDelete(todo)}>Delate</button>
                        </div>
                    </>
                ))}
                    <div className='itemsChecked'>
                        {`Items checked are: ${checkedItems}`}
                    </div>
                </div>
                <div className='footer1'>
                    <h5><span>??? 2022 Sebin. All Rights Reserved</span></h5>
                </div>
                <span className='footer2'>Powered by Google Firebase</span>
        </div>
            )
        }

export default App;
