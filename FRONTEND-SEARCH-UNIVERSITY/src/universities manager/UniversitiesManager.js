import React, { useState, useEffect, useRef, useContext, Fragment } from "react";
import { nanoid } from "nanoid";
import "./UniversitiesManager.css";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import {getUniToAddDeleteUpdate} from './universitiesFilter';
import {Redirect} from "react-router-dom";
import Context from '../Context.js';

const GlobalVariables = require('../GlobalVariables.js');

const UniversitiesManager = () => {
  const context = useContext(Context)

  const [universities, setuniversities] = useState([]);

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
    user: "",
  });

  const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    country: "",
    user: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const isMounted = useRef(false)

  useEffect(() => {
    fetch(GlobalVariables.URL_BE + GlobalVariables.UNIVERSITY_RESOURCE + (context.id !== ''?'/?user=' + context.id:''), 
      { 
        method: 'GET',
        headers: new Headers({
                              Authorization: "Bearer " + context.userToken
                             })
      })
      .then(response => ({status: response.status, json: response.json()}))
      .then((response) => {
        if(response.status >= 200 && response.status < 300){
             return response.json
        }
        return null
      })
      .then((responseJson) => {
        if(responseJson !== null){
          setuniversities(responseJson);
          console.log(responseJson)
          universitiesBeforeSave.current = [...responseJson];
        }else{
          console.error('Something went wrong')
        }
      })
  }, [])

  //If this useEffect is executed for the first time then don't call the 
  // function "fetch"
  useEffect(() => {
    if (isMounted.current) {
      if(uniToPostDeleteUpdate.current.post.length > 0){ 
      console.log('POST----------')
        fetch(GlobalVariables.URL_BE + GlobalVariables.UNIVERSITY_RESOURCE, {
          method: 'POST',
          body: JSON.stringify(uniToPostDeleteUpdate.current.post),
          headers: new Headers({
                                Authorization: "Bearer " + context.userToken,
                                Accept: 'application/json',
                              })
          })
          .then(response => {
            response.json()
            uniToPostDeleteUpdate.current.post = [];
          })
          .catch( (e) => {
            console.error(e)
          })
      }

      if(uniToPostDeleteUpdate.current.delete.length > 0){
        fetch(GlobalVariables.URL_BE + GlobalVariables.UNIVERSITY_RESOURCE, {
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
          console.error(e)
       })
      }

      if(uniToPostDeleteUpdate.current.update.length > 0){
        fetch(GlobalVariables.URL_BE + GlobalVariables.UNIVERSITY_RESOURCE, {
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
          console.error(e)
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

    const newUniversity = {
      id: nanoid(),
      name: addFormData.name,
      country: addFormData.country,
      user: context.id
    };

    const newuniversities = [...universities, newUniversity];
    setuniversities(newuniversities);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editFormData.id,
      name: editFormData.name,
      country: editFormData.country,
      user: context.id
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
      user: context.id
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
    getUniToAddDeleteUpdate(universitiesBeforeSave.current, universities, uniToPostDeleteUpdate.current);
    universitiesBeforeSave.current = universities
  
    if(uniToPostDeleteUpdate.current.post.length > 0 || 
       uniToPostDeleteUpdate.current.delete.length > 0 || 
       uniToPostDeleteUpdate.current.update.length > 0){
       setTriggerSave(nanoid);
    }
  }

  return (
      context.userToken!== ''?
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
      :
      <Redirect to='/login'/>
  );
};

export default UniversitiesManager;