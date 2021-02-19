import React, { useState, useEffect } from "react";
import api from './services/api';

import './App.css';

import Header from "./components/Header";

export default function App(){

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {

    setProjects([...projects, `Novo projeto ${Date.now()}`]);


    const response = await api.post('/repositories',{
      curso: 'PHP',
      nome: 'Tobias'
    });
    
    setProjects([...projects, response.data]);

  }

  return (
    <>
      <Header title="React"/>
      <ul>
        {projects.map(project => <li key={project.id}>{project.curso} - {project.nome}</li>)}
      </ul>
      <button type="button" onClick={handleAddProject}>Clicar</button>
    </>
  );
}