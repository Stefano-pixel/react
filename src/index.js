import React from 'react';
import ReactDOM from 'react-dom/client';
import Table from './Table';
const search = document.querySelector('input')
const universityForm = document.querySelector('form')

const root = ReactDOM.createRoot(document.getElementById('table'));

root.render(<Table />);





