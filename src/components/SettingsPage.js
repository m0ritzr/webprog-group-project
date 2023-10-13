import { React, useEffect, useState } from "react";
import { Form, Button, Card, Accordion } from "react-bootstrap";
import { useData } from "../dataContext";
import { useLoaderData } from "react-router";
import { fetchAnimalBreeds } from "../petfinder";


export default function SettingsPage() {
    
  return (
    <div className="p-4">
      <h2>Profile and Filters</h2>
      <SettingsNav/>
      <Outlet/>
    <div></div>
  );
}


function SettingsNav(){

    return(


        
    );

}


