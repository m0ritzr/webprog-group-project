import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useData } from "../dataContext";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { propTypes } from "react-bootstrap/esm/Image";
import { fetchAnimalTypes, fetchAnimal } from "../petfinder";

function SettingsPage() {
    const { settings, setSettings, uid } = useData();

    const [petFilters, setPetFilters] = useState({});

    const animalTypes = fetchAnimalTypes();

    const animal = fetchAnimal("59904220");


    console.log((animalTypes));

    console.log(JSON.stringify(animal));

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
                                    ["petType"]: {
                                        ...petFilters["petType"],
                                        [e.target.name]: e.target.checked
                                    }
                                }
                            )
                            } />

                        <SelectButtons
                            groupId="breed"
                            label="Breed"
                            settings={settings}
                            options={["breed1", "breed2"]}
                            onChange={e => setPetFilters(
                                {
                                    ...petFilters,
                                    ["Breed"]: {
                                        ...petFilters["Breed"],
                                        [e.target.name]: e.target.checked
                                    }
                                }
                            )
                            } />


                        <SelectButtons
                            groupId="age"
                            label="age"
                            settings={settings}
                            options={["young", "adult"]}
                            onChange={e => setPetFilters(
                                {
                                    ...petFilters,
                                    ["age"]: {
                                        ...petFilters["age"],
                                        [e.target.name]: e.target.checked
                                    }
                                }
                            )
                            } />

                        <SelectButtons
                            groupId="attributes"
                            label="attributes"
                            settings={settings}
                            options={["spayed_neutered", "house_trained", "special_needs", "shots_current"]}
                            onChange={e => setPetFilters(
                                {
                                    ...petFilters,
                                    ["attributes"]: {
                                        ...petFilters["attributes"],
                                        [e.target.name]: e.target.checked
                                    }
                                }
                            )
                            } />



                        <SelectButtons
                            groupId="enviroment"
                            label="Enviroment"
                            settings={settings}
                            options={["childrens", "dogs", "cats"]}
                            onChange={e => setPetFilters(
                                {
                                    ...petFilters,
                                    ["breed"]: {
                                        ...petFilters["B´breed"],
                                        [e.target.name]: e.target.checked
                                    }
                                }
                            )
                            } />


                        <SelectButtons
                            groupId="tags"
                            label="Tags"
                            settings={settings}
                            options={["Cute", "Intelligent", "Large", "Playful", "Happy", "Affectionate"]}
                            onChange={e => setPetFilters(
                                {
                                    ...petFilters,
                                    ["breed"]: {
                                        ...petFilters["B´breed"],
                                        [e.target.name]: e.target.checked
                                    }
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


function SelectButtons({ groupId, label, settings, options, onChange }) {
    return (
        <div className="row mb-3">
            <label htmlFor={groupId} className="col-sm-2 col-form-label">{label}</label>
            <div className="col-sm-10">

                {options.map(option =>

                    <p className="d-inline-flex gap-1" key={groupId + option} role="group" aria-label={"Checkbox for " + groupId}>
                        <input type="checkbox" className="btn-check" id={option} name={option} autoComplete="off" defaultChecked={settings[groupId]?.[option] ?? false} onChange={onChange} />
                        <label className="btn btn-outline-primary " htmlFor={option}>{option}</label>
                    </p>
                )}
            </div>
        </div>
    );
}



function SelectButtons({ groupId, label, settings, options, onChange }) {


    return (
        <div className="row mb-3">
            <label htmlFor={groupId} className="col-sm-2 col-form-label">{label}</label>
            <div className="col-sm-10">

                {Object.keys(options).map(option =>

                    <p className="d-inline-flex gap-1" key={groupId + option} role="group" aria-label={"Checkbox for " + groupId}>
                        <input type="checkbox" className="btn-check" id={option} name={option} autoComplete="off" defaultChecked={settings[groupId]?.[option] ?? false} onChange={onChange} />
                        <label className="btn btn-outline-primary " htmlFor={option}>{option}</label>
                    </p>


                )}
            </div>
        </div>
    );
}

function SelectType({ groupId, label, settings, options, breeds, onChangeBreed, onChange }) {
    return (
        <>
            {Object.keys(options).map(animalType =>

                <div className="dropdown" >
                    <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="true" data-bs-auto-close="outside">
                        {animalType}
                    </button>

                    <div className="dropdown-menu p-4">
                        <div className="mb-3">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="option-all" />
                                <label className="form-check-label" htmlFor="option-all">
                                    Välj alla
                                </label>
                            </div>
                        </div>
                        <div className="dropdown-divider" />

                        {breeds.map(breed =>
                            <div className="mb-3">
                                <div className="form-check" key={animalType + breed} aria-label={"Checkbox for" + animalType + " - " + breed}>
                                    <input type="checkbox" className="form-check-input" id={animalType + "-" + breed} name={breed} autoComplete="off" defaultChecked={false} onChange={onChangeBreed} />
                                    <label className="form-check-label " htmlFor={breed}>
                                        {breed}
                                    </label>
                                </div>
                            </div>
                        )};

                    </div>
                </div >
            )}
        </>
    );
}

function SelectType2({ groupId, label, settings, options, breeds, onChangeBreed, onChange }) {
    return (
        <>
            {Object.keys(options).map(animalType =>

                <p className="d-inline-flex gap-1">
                    <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse-" + animalType} aria-expanded="false" aria-controls={" collapse-" + animalType}>
                        {animalType}
                    </button>
                </p>
            )};

            {Object.keys(options).map(animalType =>
                <div className="collapse" id={"collapse-" + animalType} >

                    <div class="card-header">
                        {animalType}
                    </div>

                    <div className="card card-body">
                        <div className="col p-1">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="option-all" />
                                <label className="form-check-label" htmlFor="option-all">
                                    Välj alla
                                </label>
                            </div>
                        </div>

                        <div className="row row-cols-3">
                            {breeds.map(breed =>
                                <div className="col p-1" >
                                    <div className="form-check" key={animalType + breed} aria-label={"Checkbox for" + animalType + " - " + breed}>
                                        <input type="checkbox" className="form-check-input" id={animalType + "-" + breed} name={breed} autoComplete="off" defaultChecked={false} onChange={onChangeBreed} />
                                        <label className="form-check-label " htmlFor={breed}>
                                            {breed}
                                        </label>
                                    </div>
                                </div>
                            )};
                        </div>

                    </div >
                </div>
            )};

        </>
    );



    function SelectTypeAccordion({ groupId, options, breeds, onChangeBreed }) {
        return (

            <div className="accordion" key="breed" id={groupId}>
                {Object.keys(options).map(animalType =>
                    <div className="accordion-item" key={animalType}>
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${animalType}-breeds`} aria-expanded="false" aria-controls={`${animalType}-breeds`} >
                                {animalType}
                            </button>
                        </h2>
                        <div id={`${animalType}-breeds`} className="accordion-collapse collapse" data-bs-parent={`#${groupId}`}>
                            <div className="accordion-body">


                                <div className="form-check form-switch form-check-reverse" key={animalType + "all-breeds"} >
                                    <input className="form-check-input" name="all-breeds" type="checkbox" id="all-breeds" onChange={onChangeBreed} />
                                    <label className="form-check-label" htmlFor="all-breeds">
                                        <h6>Select all breeds</h6>
                                    </label>
                                </div>

                                <div className="row row-cols-3">
                                    {breeds.map(breed =>
                                        <div className="col p-1" key={animalType + "-" + breed}>
                                            <div className="form-check" aria-label={"Checkbox for" + animalType + " - " + breed}>
                                                <input type="checkbox" className="form-check-input" id={animalType + "-" + breed} name={breed} autoComplete="off" defaultChecked={false} onChange={onChangeBreed} />
                                                <label className="form-check-label " htmlFor={breed}>
                                                    {breed}
                                                </label>
                                            </div>
                                        </div>
                                    )};
                                </div>

                            </div>
                        </div >
                    </div>
                )};
            </div>

    </>
  );
    }