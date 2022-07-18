import React from 'react'
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Spells from "./components/spells/Spells";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="spells" replace />}/>
                <Route path="spells" element={<Spells/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
