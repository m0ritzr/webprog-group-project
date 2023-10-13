import { React, useEffect, useState } from "react";
import { Button, Card,  } from "react-bootstrap";
import { useData } from "../dataContext";
import { fetchAnimal } from "../petfinder";
import {Toast} from "bootstrap";


function MatchesPage() {
  // eslint-disable-next-line no-unused-vars
  const { matches } = useData();
  const [loadedPetsData, setLoadedPetsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const loadPets = async () => {
      const loadedPetsObj = {};

      const promises = matches.map(async (match) => {
        if (!loadedPetsObj[match]) {
          const result = await fetchAnimal(match);
          loadedPetsObj[match] = result.animal;
        }
      });

      await Promise.all(promises);

      console.log(loadedPetsObj);
      setLoadedPetsData(loadedPetsObj);
      setIsLoading(false);
    };

    loadPets();
  }, [matches]);

  function handleUnmatch(){
   // setLoadedPetsData( !loadedPetsData[id]);
    const toastUnmatch = document.getElementById('liveToast');
    const toast = Toast.getOrCreateInstance(toastUnmatch);
    toast.show();
  
}
    
  

  return (
    <div className="p-4">
      <h2>My Matches</h2>
      {isLoading ? (
        <h3>Loading</h3>
      ) : (
        matches.map((match) => (
          <Card className="mt-4 vh-10 vw-75" style={{ flexDirection: "row" }}>
            <Card.Img
              variant="top"
              className="w-25 mh-100 object-fit-cover"
              src={loadedPetsData[match].photos[0].medium}
            />
            <Card.Body>
              <Card.Title>{loadedPetsData[match].name}</Card.Title>
              <Card.Text>{loadedPetsData[match].description}</Card.Text>
              <Button id="Unmatch" onclick={handleUnmatch} >
                Unmatch
              </Button>
              <div class="toast-container position-fixed bottom-0 end-0 p-3">
                 <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                  <div class="toast-header">
                    <strong class="me-auto">Unmatched</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                      You have unmatched with {loadedPetsData[match].name}
                      </div>
                      </div>
                      </div>
            

              
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}

export default MatchesPage;
