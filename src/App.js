import React, { useState, useEffect, useRef, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import viewUni from "./viewUniversities";
import {getUniversitiesToDelete} from './universitiesFilter';

const App = () => {
  const URL_BE = 'http://localhost:3001/university';

  const [universities, setuniversities] = useState([]);
  const [universitiesBeforeSave, setUniversitiesBeforeSave] = useState([]);
  const [universitiesToSave, setUniversitiesToSave] = useState([]);
  const [universitiesToUpdate, setUniversitiesToUpdate] = useState([]);
  const [universitiesToDelete, setUniversitiesToDelete] = useState([]);

  const [addFormData, setAddFormData] = useState({
    name: "",
    country: "",
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    country: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const isMounted = useRef(false)

  useEffect(() => {
    fetch(URL_BE, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        setuniversities(data);
        setUniversitiesBeforeSave([...data]);
      });
  }, [])

  useEffect(() => {
    //If this useEffect is executed for the first time then don't call the 
    // function "fetch"
    if (isMounted.current) {

      if (universitiesToSave.length > 0) {
        fetch(URL_BE, {
          method: 'POST',
          body: JSON.stringify(universitiesToSave),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            response.json();
          })
          .catch(err => {
            console.log(err);
          });
      }
      if (universitiesToDelete.length > 0) {

      }

      if (universitiesToUpdate.length > 0) {

      }

    } else {
      isMounted.current = true;
    }
  }, [universitiesToSave])

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
      id: editContactId,
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
      name: contact.name,
      country: contact.country,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newuniversities = [...universities];
    const index = universities.findIndex((contact) => contact.id === contactId);
    newuniversities.splice(index, 1);
    setuniversities(newuniversities);
  };

  //Handle the behavior of the save button 
  const handleSaveUniversities = () => {
    console.log('handleSaveUniversities')
    var newUniversity = [...universities].splice(universitiesBeforeSave.length, universities.length);   
    
    setUniversitiesToSave(newUniversity);
    // const difference = universitiesFilter.getUniversitiesToDelete(universitiesBeforeSave, universities);
    getUniversitiesToDelete(universitiesBeforeSave, universities);
    // viewUni(difference);
    // setUniversitiesToDelete(difference)

    setUniversitiesBeforeSave([...universities])
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