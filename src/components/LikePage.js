import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useData } from "../dataContext";
import { fetchAnimalTypes, fetchAnimals } from "../petfinder";

// TODO
// Get several pets at the same time, add to a list, add/remove from list on like/dislike (makes 'swiping' instantaneous and api calls happen in the background)
// (make the calls to construct the list as soon as the settings are saved?)

// Save a list of all liked/disliked pets, make sure the same pet isnt showed again

// Many pets dont have photos, add stuff do deal with this


function LikePage() {
  // eslint-disable-next-line no-unused-vars
  const { settings, setSettings, matches, setMatches } = useData();
  const [petImg, setPetImg] = useState(""); 

  const [currentPage, setCurrentPage] = useState(1) // Needs improvement

  const petPref = settings.petPreference ? settings.petPreference : "Dog";


  async function handleLikeClick() {
    addToMatches()
    const pet = getNewPet()
  }

  function handleDislikeClick() {
    const pet = getNewPet()
  }

  function addToMatches() {
    console.log("Add to matches")
  }

  //TODO
  /*
  function fillListWithPets() {

    let p = 10;
    while(p < 15) {
      const animals = await fetchAnimals({type:"Dog", page:p})
      let animalsWithPhotos = animals.animals.filter((animal) => animal.photos.length !== 0)
      setPetImgs([...petImgs, ...animalsWithPhotos])
      console.log([...petImgs, ...animalsWithPhotos])
      p += 1;
    }
  }
  */

  async function getNewPet() {
    // Only changes photo at the moment 
    // Fetches a page of animals, filters out those without photos, displays the first one with a photo
    // Doesnt display others on the page, just goes to next page, needs fix
    // Doesnt save page
    let animalsWithPhotos = [];
    let img;
    let p = currentPage;
    while(animalsWithPhotos.length === 0) {
      const animals = await fetchAnimals({type:petPref, page:p})
      animalsWithPhotos = animals.animals.filter((animal) => animal.photos.length !== 0)
      p += 1;
    }
    setCurrentPage(p)
    img = animalsWithPhotos[0].photos[0].large // This might break
    setPetImg(img)
    return null
  }

  // TODO, make height fit the screen
  // Stop container from changing size when image is changes
  return (
    <div className="container-sm p-3">
      <h2>Like Pets</h2>
      <Card className="">
        <Card.Img className="object-fit-scale" variant="top" src={petImg} />
        <Card.Body>
          <Card.Title>Pet Name</Card.Title>
          <Card.Text>Pet Details</Card.Text>
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
