import React from "react";
import ReactDOM  from "react-dom";
import {createRoot} from 'react-dom/client'
import logo from '../assets/images/logo.jpeg'
import './index.css'

class Search extends React.Component{
    render(){
        debugger
        return <div className="admin">Index
        <span className="lessStyle">我是css</span>
        <img className="imgLogo" src={ logo } />
        </div>
    }
}
// react 18 已弃用
ReactDOM.render(
    <Search />,
    document.getElementById('rootOld')
)