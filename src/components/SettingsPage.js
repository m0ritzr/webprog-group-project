import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useData } from "../dataContext";
import { useLoaderData } from "react-router";

function SettingsPage() {
  const { settings } = useData();

  const animalTypes = useLoaderData();
  console.log(animalTypes);

  console.log(JSON.stringify(settings));
  
  // useEffect(() => {
  //   if (uid) { 
  //     const docRef = doc(db, 'settings', uid); 
      
  //     getDoc(docRef).then((docSnap) => {
  //       if (docSnap.exists()) {
  //         setSettings(docSnap.data());
  //       } else {
  //         console.log("No settings found for user");
  //       }
  //     }).catch((error) => {
  //       console.log("Error fetching settings:", error);
  //     });
  //   }

  // }, [uid, setSettings]);
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const selectedPet = e.target.petType.value;
    
    // const docRef = doc(db, 'settings', uid);
    // setDoc(docRef, {
    //     petPreference: selectedPet
    // }).then(() => {
    //     setSettings({ petPreference: selectedPet });
    // }).catch((error) => {
    //     console.error("Error updating settings:", error);
    // });
  };

  return (
    <div className="p-4">
      <h2>Filter and Settings</h2>
      <Card className="mt-4">
        <Card.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="petType">
              <Form.Label>Type of Pet</Form.Label>
              <Form.Control as="select" defaultValue={settings?.petPreference}>
                <option>Dog</option>
                <option>Cat</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Apply Filters
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SettingsPage;

