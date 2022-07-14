import React, { useState } from 'react';
import './style.css';

const Todo = () => {
  const [inputData, setInputData] = useState();
  const [items, setItems] = useState([]);

  // addItems function
  const addItem = () => {
    // if inputData is empty
    if (!inputData) {
      alert('Plz... mention a task to add');
    } else {
      // to get a unique id function (we need a unique id of each element to make delete function)
      const myNewInputData = {
        id: new Date().getTime().toString(),
        data: inputData,
      };
      // spread operator used => means previous data + new data will be added in a array
      setItems([...items, myNewInputData]);
      setInputData('');
    }
  };

  // deleteItem function
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      // when user delete an item, if id of that item, is not equal to the currentElement's id than don't return it. and if id matches then delete that item.
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  // removeAll the items function
  const removeAll = () => {
    setItems([]); // setItem me empty array pass krne se wo sab delete ho jayenge
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              // whatever value user put into this input textarea
              value={inputData}
              // onChange is a react Dom event which will trigger when user change the value of input textarea
              onChange={(e) => setInputData(e.target.value)}
            />
            <i className="fa fa-plus add-btn" onClick={addItem}></i>
          </div>

          {/* show our todo items */}
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.data}</h3>
                  <div className="todo-btn">
                    <i className="far fa-edit add-btn"></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* remove all button */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
