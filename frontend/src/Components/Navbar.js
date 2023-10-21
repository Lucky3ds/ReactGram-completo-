import React from 'react'
import "./Navbar.css"
//components
import { NavLink,Link, Navigate } from 'react-router-dom';
import {BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill, BsCameraFill} from "react-icons/bs"

//hooks
import {useState} from "react"
import { useAuth } from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//Redux
import {logout,reset} from "../slices/authSlice"

export const Navbar = () => {
  const {auth} = useAuth()
  const {user} = useSelector((state) => state.auth);

  //search state
  const [query,setQuery] = useState("")


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handelLogout = () =>{
    dispatch(logout())
    dispatch(reset())

    navigate("/login")
  }
  const handleSearch = (e) =>{
    e.preventDefault()

    if(query){
      return navigate(`/search?q=${query}`);
    }

  }

return <nav id="nav">
  <div className="logo"><Link to="/"><span>ReactGram</span></Link></div>
    
    <form id='search-form' onSubmit={handleSearch} >
        <BsSearch />
        <input type="text" placeholder='Pesquisar' onChange={(e)=>setQuery(e.target.value)}/>
    </form>
    <ul id="nav-links">
       {auth ?(
        <>
         <li>
        <NavLink to="/">
            <BsHouseDoorFill />
        </NavLink>
        </li>
        {user && (
          <li>
            <NavLink to={`/users/${user._id}`}>
              <BsFillCameraFill />
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to="/profile">
            <BsFillPersonFill />
          </NavLink>
        </li>
        <li>
          <span onClick={handelLogout}>Sair</span>
        </li>
        </>
       ):(
        <>
            <li>
       <NavLink to="/login">
            Entrar
        </NavLink>
       </li>
       <li>
       <NavLink to="register" >
            Cadastrar
        </NavLink>
       </li>
        </>
       )}
   
    </ul>
  </nav>
}
export default Navbar;