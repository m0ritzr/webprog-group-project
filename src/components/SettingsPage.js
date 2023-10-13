import { useEffect, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useData } from "../dataContext";
import { useLoaderData } from "react-router";
import { fetchAnimalBreeds } from "../petfinder";
import { Outlet, NavLink } from 'react-router-dom';


export default function SettingsPage(){


  return (
    <div className="p-4">
      <h2>Profile and Filters</h2>
      <SettingsNav />
      <Outlet />
        
      </div>
      );
}

function SettingsNav(animalTypes) {

  return (


    <ul className="nav nav-tabs">
      <li className="nav-item">
        <NavLink className="nav-link" to="/compose-salad">
          Komponera sallad
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/view-order">
          Varukorg
        </NavLink>
      </li>
    </ul>
        
    );

}