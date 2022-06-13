import React, { useState, useEffect, useRef, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import viewUni from "./viewUniversities";
import {getUniToAddDeleteUpdate} from './universitiesFilter';

const App = () => {
  const URL_BE = 'http://localhost:3001/university';

  const [universities, setuniversities] = useState([]);
  
  // const universitiesToSave = useRef([]);
  // const [universitiesToUpdate, setUniversitiesToUpdate] = useState([]);
  // const [universitiesToDelete, setUniversitiesToDelete] = useState([]);
  const universitiesBeforeSave = useRef([]);
  const uniToPostDeleteUpdate = useRef({
                                        post: [],
                                        delete: [],
                                        update: []
                                       })

  const [triggerSave, setTriggerSave] = useState(0)
  const [addFormData, setAddFormData] = useState({
    id: "",
    name: "",
    country: "",
  });

  const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    country: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const isMounted = useRef(false)

  useEffect(() => {
    fetch(URL_BE, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        console.log('---------')
        console.log(data)
        setuniversities(data);
        universitiesBeforeSave.current = [...data];
      });
  }, [])

  useEffect(() => {
    //If this useEffect is executed for the first time then don't call the 
    // function "fetch"
    if (isMounted.current) {
      if(uniToPostDeleteUpdate.current.post.length > 0){ 
      console.log('POST----------')
        fetch(URL_BE, {
          method: 'POST',
          body: JSON.stringify(uniToPostDeleteUpdate.current.post),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          response.json()
          uniToPostDeleteUpdate.current.post = [];
        })
        .catch( (e) => {
           console.log(e)
        })
      }

      if(uniToPostDeleteUpdate.current.delete.length > 0){
        console.log('DELETE----------')
        fetch(URL_BE, {
          method: 'DELETE',
          body: JSON.stringify(uniToPostDeleteUpdate.current.delete),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          response.json()
          uniToPostDeleteUpdate.current.delete = [];
        })
        .catch( (e) => {
          console.log(e)
       })
      }

      if(uniToPostDeleteUpdate.current.update.length > 0){
        console.log('UPDATE----------')
        fetch(URL_BE, {
          method: 'PATCH',
          body: JSON.stringify(uniToPostDeleteUpdate.current.update),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          response.json()
          uniToPostDeleteUpdate.current.update = [];
        })
        .catch( (e) => {
          console.log(e)
       })
      }

    } else {
      isMounted.current = true;
    }
  }, [triggerSave])

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      name: addFormData.name,
      country: addFormData.country,
    };

    const newuniversities = [...universities, newContact];
    setuniversities(newuniversities);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editFormData.id,
      name: editFormData.name,
      country: editFormData.country,
    };

    const newuniversities = [...universities];

    const index = universities.findIndex((contact) => contact.id === editContactId);

    newuniversities[index] = editedContact;

    setuniversities(newuniversities);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      id: contact.id,
      name: contact.name,
      country: contact.country,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (universityId) => {
    const newuniversities = [...universities];
    const index = universities.findIndex((university) => university.id === universityId);
    newuniversities.splice(index, 1);
    setuniversities(newuniversities);
  };

  //Handle the behavior of the save button 
  const handleSaveUniversities = () => {
    console.log('handleSaveUniversities')
    getUniToAddDeleteUpdate(universitiesBeforeSave.current, universities, uniToPostDeleteUpdate.current);
    universitiesBeforeSave.current = universities
  
    if(uniToPostDeleteUpdate.current.post.length > 0 || 
       uniToPostDeleteUpdate.current.delete.length > 0 || 
       uniToPostDeleteUpdate.current.update.length > 0){
       setTriggerSave(nanoid());
    }
  }

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {universities.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add an university</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="name"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="country"
          required="required"
          placeholder="Enter a country..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
      <button onClick={handleSaveUniversities}>Save</button>
    </div>
  );
};

export default App;