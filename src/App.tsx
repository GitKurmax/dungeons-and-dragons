import React, {useEffect} from 'react'
import './App.css';
import { useNavigate } from 'react-router-dom'

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/spells')
    }, [])

    return null
}

export default App;
