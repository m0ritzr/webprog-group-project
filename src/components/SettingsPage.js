import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useData } from "../dataContext";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { fetchAnimalTypes } from "../petfinder";

function SettingsPage() {
  const { settings, setSettings, uid } = useData();

  const { petFilters, setPetFilters } = useState({});

  useEffect(() => {
    if (uid) {
      const docRef = doc(db, 'settings', uid);

      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          setSettings(docSnap.data());
        } else {
          console.log("No settings found for user");
        }
      }).catch((error) => {
        console.log("Error fetching settings:", error);
      });
    }

  }, [uid, setSettings]);


  const handleFormSubmit = (e) => {
    e.preventDefault();
    const selectedPet = e.target.petType.value;

    const docRef = doc(db, 'settings', uid);
    setDoc(docRef, {
      petPreference: selectedPet
    }).then(() => {
      setSettings({ petPreference: selectedPet });
    }).catch((error) => {
      console.error("Error updating settings:", error);
    });
  };

  return (
    <div className="p-4">
      <h2>Filter and Settings</h2>
      <Card className="mt-4">
        <Card.Body>
          <Form onSubmit={handleFormSubmit}>

  
            <SelectButtons
              groupId="petType"
              label="Type of Pet"
              settings={settings}
              options={["Cat", "Dog", "Bird", "Bunny", "Hamster", "Guniea Pig", "Fish"]}
              onChange={e => setPetFilters(
                {
                  ...petFilters,
                  [e.target.itemProp]: { [e.target.name]: (petFilters[e.target.name] ? (!petFilters[e.target.name]) : false) }
                }
              )
              } />
            <SelectButtons
              groupId="gender"
              label="Type of Pet"
              settings={settings}
              options={["Female", "Male"]}
              onChange={e => setPetFilters(
                {
                  ...petFilters,
                  [e.target.itemProp]: { [e.target.name]: e.target.checked }
                }
              )
              } />

            <Form.Group controlId="petType">
              <Form.Label>Type of Pet</Form.Label>
              <Form.Control as="select" defaultValue={settings?.petPreference}>
                <option> Katt</option>
                <option> Hund</option>
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


function SelectButtons({groupId, label, settings, options}) {
  return (
    <div className="row mb-3">
      <label htmlFor={groupId} className="col-sm-2 col-form-label">{label}</label>
        <div className="col-sm-10">

          {options.map(option => 

            <p className="d-inline-flex gap-1" key={groupId + option} role="group" aria-label={"Checkbox for " + groupId}>
              <input type="checkbox" className="btn-check" id={option} name={option} itemProp={groupId} autoComplete="off" defaultChecked={settings[groupId]?.[option] }/>
              <label className="btn btn-outline-primary " htmlFor={option}>{option}</label>
            </p>
          )}
        </div>
      </div>
  );
}



