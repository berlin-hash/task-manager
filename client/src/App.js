import './App.css';
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import CreateTodo from './components/CreateTodo'
import EditTodo from './components/EditTodo'
import NotFound from './components/NotFound';
import UpdateTodo from './components/UpdateTodo'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />

        <Route path="/create" element={<CreateTodo />} />

        <Route path="/edit" element={<EditTodo />} />

        <Route path='/updateTodo' element={<UpdateTodo />} />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  );
}

export default App;
