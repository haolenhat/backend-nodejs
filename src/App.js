import React, { useState } from 'react';
import './App.css';
import Form from './components/Form/Form.js';
import BodyMain from './components/BodyMain/Bodymain.js';
import Admin from './components/admin/admin.js';
import AddMovieForm from './components/add/add.js';
import Cart from './components/Cart/Cart.js';

function App() {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [showAdmin, setShowAdmin] = useState(false);

    const handleLoginSuccess = (user) => {
        setLoggedInUser(user);
        setShowAdmin(false);
    };

    return (
        <div className="App">
           <BodyMain></BodyMain>
          
        </div>
        
    );
}

export default App;
