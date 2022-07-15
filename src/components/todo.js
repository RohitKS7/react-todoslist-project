import React, { useState, useEffect } from 'react';
import './style.css';

// getting localStorage data to show items
const getLocalData = () => {
  const lists = localStorage.getItem('mytodolist'); // calling the key of keyvaluepair set

  // agar lists me koi data hai tho hi lists ko render krna
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

// Main Component
const Todo = () => {
  const [inputData, setInputData] = useState(''); // input field ki value ko state me store krne ke liye
  const [items, setItems] = useState(getLocalData()); // all items ko store krne ke liye
  const [isEditedItem, setIsEditedItem] = useState(''); //Edited Items ko store krne ke liye
  const [toggleButton, setToggleButton] = useState(false); // plus icon ko toggle krke Edit icon ko show krne ke liye

  // adding items to localStorage
  useEffect(() => {
    localStorage.setItem('mytodolist', JSON.stringify(items)); // always give a key (mytodolist)
  }, [items]); // array me wohi element rakhna jiske baad tumnhe useEffect hook render krwana hai
  // in this case when the value of items changes only than run this hook

  // addItems function
  const addItem = () => {
    // if inputData is empty
    if (!inputData) {
      alert('Plz... mention a task to add');
    } else if (inputData && toggleButton) {
      // agar inputData me koi data hai and toggleButton true hai (matlb koi edit kr rha hai)
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditedItem) {
            // check if curElem.id matches the id of editedItem(available in input field)
            return { ...curElem, data: inputData }; // return previous array + new data
          }
          return curElem;
        })
      );
      setInputData('');
      setIsEditItem(null);
      setToggleButton(false);
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

  // edit the items function
  const editItem = (index) => {
    const editedItem = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(editedItem.data); // editedItem ke data ko input field me show krwane ke liye
    setIsEditedItem(index); // editedItem ki id ko new hook me pass kiya
    setToggleButton(true);
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
            {/* if toggleButton is true than show edit else plus */}
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>

          {/* show our todo items */}
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.data}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElem.id)}
                    ></i>
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
