import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './reducer/store.js'
import { BrowserRouter } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';


import "@fortawesome/fontawesome-free/css/all.min.css";
// import 'mdb-react-ui-kit/dist/css/mdb.buttons.min.css'; // for buttons
// import 'mdb-react-ui-kit/dist/css/mdb.cards.min.css'; 
import { AuthProvider } from './Auth/AuthContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    
    <Provider store={store}>
      <BrowserRouter>
      <AuthProvider>
      <App />
    </AuthProvider>
    </BrowserRouter>
    </Provider>


)
