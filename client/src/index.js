import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {BrowserRouter} from 'react-router-dom'
import {store} from './espace_agents/store/store';
import { Provider } from 'react-redux' ; 




const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  
 <BrowserRouter>
    <Provider store={store}>
       <App/>
    </Provider>
  
 </BrowserRouter>
)