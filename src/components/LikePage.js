import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useData } from "../dataContext";

// TODO
// Get several pets at the same time, add to a list, add/remove from list on like/dislike (makes 'swiping' instantaneous and api calls happen in the background)
// (make the calls to construct the list as soon as the settings are saved?)

// Save a list of all liked/disliked pets, make sure the same pet isnt showed again



function LikePage() {
  // eslint-disable-next-line no-unused-vars
  const { settings, setSettings, matches, setMatches } = useData();
  const [pet, setPet] = useState({petName: "Pet Name", petImg: "cat1.jpg", petDetails: "Details about pet"})

  //tmp
  const imgs = ["cat1.jpg", "cat2.webp", "dog1.jpg", "dog2.webp"]

  function handleLikeClick() {
    const pet = getNewPet()
    setPet(pet)
    addToMatches()
  }

  function handleDislikeClick() {
    const pet = getNewPet()
  }

  function addToMatches() {
    console.log("Add to matches")
  }

  function getNewPet() {
    // Get a pet that matches settings

    //tmp
    const img = imgs[Math.floor(Math.random() * 4)]
    return {petName: "Pet Name", petImg: img, petDetails: "Details about pet"}
  }

  // TODO, make height fit the screen
  // Stop container from changing size when image is changes
  return (
    <div className="container-sm p-3">
      <h2>Like Pets</h2>
      <Card className="">
        <Card.Img className="object-fit-scale" variant="top" src={`./tmpimgs/${pet.petImg}`} />
        <Card.Body>
          <Card.Title>{pet.petName}</Card.Title>
          <Card.Text>{pet.petDetails}</Card.Text>
          <div className="col">          
            <button type="button" className="btn btn-success btn-lg" onClick={handleLikeClick}>
              Like
            </button>
            <button type="button" className="btn btn-danger btn-lg" onClick={handleDislikeClick}>
              Dislike
            </button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}


export default LikePage;
