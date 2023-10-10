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

  const [pets, setPets] = useState([]);

  const [currentPage, setCurrentPage] = useState(1) // Needs improvement

  const petPref = settings.petPreference ? settings.petPreference : "Dog";


  function handleLikeClick() {
    addToMatches()
    const newPetList = getUpdatedList()
    fillListWithPets(newPetList)
  }

  function getUpdatedList() {
    return [...pets.slice(1, pets.length)]
  }

  function handleDislikeClick() {
    //const pet = getNewPet()
  }

  function addToMatches() {
    console.log("Add to matches")
  }

  //TODO, needs better implementaion
  async function fillListWithPets(pets) {
    console.log("fill list")

    let tmpArr = [...pets]
    while(tmpArr.length < 15) {
      let animalsWithPhotos = null;
      const animals = await fetchAnimals({type:petPref, page:currentPage})
      setCurrentPage(currentPage + 1)
      animalsWithPhotos = animals.animals.filter((animal) => animal.photos.length !== 0)
      if(animalsWithPhotos.length === 0) {
        console.log(animals)
        throw new Error("AAA")
      }
      tmpArr = [...tmpArr, ...animalsWithPhotos]
      console.log(tmpArr)
    }
    setPets([...tmpArr])
  }

  // TODO, make height fit the screen
  // Stop container from changing size when image is changes
  return (
    <div className="container-sm p-3">
      <h2>Like Pets</h2>
      <Card className="">
        <Card.Img className="object-fit-scale" variant="top" src={pets[0] ? pets[0].photos[0].large : "" /** can break if there are no large photos */} />
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
