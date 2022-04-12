import React from "react";
import ReactDOM  from "react-dom";
import '../../common';
import {createRoot} from 'react-dom/client'
import logo from '../assets/images/logo.jpeg'
import './admin.less'

class Search extends React.Component{
    render(){
        return <div className="admin">Search DOM
        <span className="lessStyle">我是less</span>
        <img className="imgLogo" src={ logo } />
        </div>
    }
}
const container =  document.getElementById('root');
const root = createRoot(container)
root.render(<Search />)
