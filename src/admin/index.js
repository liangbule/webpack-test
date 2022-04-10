/*
 * @Author: your name
 * @Date: 2022-04-09 13:05:58
 * @LastEditTime: 2022-04-10 00:00:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /code/webpack/src/adminApp.js
 */
import React from "react";
import ReactDOM  from "react-dom";
import {createRoot} from 'react-dom/client'
import logo from '../assets/img/logo.png'
import './admin.less'

class Search extends React.Component{
    render(){
        return <div className="admin">Search DOM
        <span className="lessStyle">我是less</span>
        <img className="imgLogo" src={logo} />
        </div>
    }
}
const container =  document.getElementById('root');
const root = createRoot(container)
root.render(<Search />)
// react 18 已弃用
// ReactDOM.render(
//     <Search />,
//     document.getElementById('root')
// )