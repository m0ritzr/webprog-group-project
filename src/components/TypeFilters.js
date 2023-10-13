function Filters({ animalTypesDict }) {
    return (
      <Accordion defaultActiveKey="">
  
        {Object.keys(animalTypesDict).map(animalType =>
          <div key={animalType}>
            <Accordion.Item eventKey={animalType}>
              <Accordion.Header>{animalType}</Accordion.Header>
              <Accordion.Body>
                <Form>
                  {/* select for breeds */}
                  <Form.Group controlId={type + '-breed'}>
                    <Form.Check
                      type="switch"
                      id={animalType + '-all-breeds'}
                      label="Select all breeds"
                      reverse
                      onChange={(e) => { selectAllBreedsHandler(e, animalType) }}
                    />
  
                    <Row md={4}>
                      {animalType.breeds.map(breed =>
                        <Col>
                          <Form.Check
                            type="checkbox"
                            id={animalType + '-' + breed}
                            label={breed}
                            onChange={handleCheckboxChange}
                          />
                        </Col>
                      )};
                    </Row>
                  </Form.Group>
  
                  {/* select for sizes */}
                  <Form.Group>
                    <Form.Label>Sizes</Form.Label>
                    {["small", "medium", "large", "xlarge"].map((size) => (
                      <Form.Check
                        type="checkbox"
                        label={toTitleCase(size.replace("_", " "))}
                        name="size"
                        value={size}
                        defaultChecked={selectedSizes.includes(size)}
                        onChange={handleCheckboxChange}
                      />
                    ))}
                  </Form.Group>
  
                  {/* select for gender */}
                  <Form.Group>
                    <Form.Label>Genders</Form.Label>
                    {animalTypeDict[selectedType].genders.map((gender) => (
                      <Form.Check
                        type="checkbox"
                        label={toTitleCase(gender.replace("_", " "))}
                        name="gender"
                        value={gender}
                        defaultChecked={selectedGenders.includes(gender)}
                        onChange={handleCheckboxChange}
                      />
                    ))}
                  </Form.Group>
  
                  {/* select for age */}
                  <Form.Group>
                    <Form.Label>Ages</Form.Label>
                    {["baby", "young", "adult", "senior"].map((age) => (
                      <Form.Check
                        type="checkbox"
                        label={toTitleCase(age.replace("_", " "))}
                        name="age"
                        value={age}
                        defaultChecked={selectedAges.includes(age)}
                        onChange={handleCheckboxChange}
                      />
                    ))}
                  </Form.Group>
  
                  {/* select for color */}
                  <Form.Group>
                    <Form.Label>Colors</Form.Label>
                    {animalTypeDict[selectedType].colors.map((color) => (
                      <Form.Check
                        type="checkbox"
                        label={toTitleCase(color.replace("_", " "))}
                        name="color"
                        value={color}
                        defaultChecked={selectedColors.includes(color)}
                        onChange={handleCheckboxChange}
                      />
                    ))}
                  </Form.Group>
  
                  {/* select for coat */}
                  <Form.Group>
                    <Form.Label>Coats</Form.Label>
                    {animalTypeDict[selectedType].coats.map((coat) => (
                      <Form.Check
                        type="checkbox"
                        label={toTitleCase(coat.replace("_", " "))}
                        name="coat"
                        value={coat}
                        defaultChecked={selectedCoats.includes(coat)}
                        onChange={handleCheckboxChange}
                      />
                    ))}
                  </Form.Group>
  
                  {/* select for attributes */}
                  <Form.Group>
                    <Form.Label>Attributes</Form.Label>
                    {["spayed_neutered", "house_trained", "special_needs"].map(
                      (attribute) => (
                        <Form.Check
                          type="checkbox"
                          label={toTitleCase(attribute.replace("_", " "))}
                          name="attributes"
                          value={attribute}
                          defaultChecked={selectedAttributes.includes(attribute)}
                          onChange={handleCheckboxChange}
                        />
                      ),
                    )}
                  </Form.Group>
  
                  <Form.Group>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      placeholder="Enter US postal code"
                      defaultValue={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      pattern="^\d{5}$" // A basic regex pattern for 5-digit US postal code
                    />
                  </Form.Group>
  
                  <Form.Group>
                    <Form.Label>Distance: max {selectedDistance} miles</Form.Label>
                    <Form.Control
                      type="range"
                      min="0"
                      max="500"
                      step="10"
                      name="distance"
                      value={selectedDistance}
                      onChange={(e) => setSelectedDistance(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                      Slide to adjust the distadnce range.
                    </Form.Text>
                  </Form.Group>
  
                  <Button variant="primary" type="submit" className="mt-3">
                    Apply Filters
                  </Button>
  
                </Form>
  
              </Accordion.Body>
            </Accordion.Item>
  
          </div>
  
        )};
  
      </Accordion>
  
    );
  }
  
  function oldBreedFilter(animalTypesDict, onChangeBreed) {
  
    return (
      <Accordion defaultActiveKey="">
  
        {Object.keys(animalTypesDict).map(animalType =>
          <div key={animalType}>
            <Accordion.Item eventKey={animalType}>
              <Accordion.Header>{animalType}</Accordion.Header>
              <Accordion.Body>
  
                <div className="form-check form-switch form-check-reverse" key="all-breeds">
                  <input className="form-check-input" name="all-breeds" type="checkbox" id="all-breeds" onChange={onChangeBreed} />
                  <label className="form-check-label" htmlFor="all-breeds">
                    <h6>Select all breeds</h6>
                  </label>
                </div>
  
                <div className="row row-cols-3">
                  {breeds.map(breed =>
                    <div className="col p-1" key={breed}>
  
                      <Form.Check // prettier-ignore
                        type={breed}
                        id={`${breed}`}
                        name={animalType + "/" + breed}
                        label={` ${breed}`}
                        onChange={onChangeBreed}
                      />
                    </div>
                  )};
                </div>
              </Accordion.Body>
            </Accordion.Item>
  
          </div>
  
        )};
  
      </Accordion>
    );
  
  }