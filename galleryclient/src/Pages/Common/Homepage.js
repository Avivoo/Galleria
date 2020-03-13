import React, { useState, useLayoutEffect } from "react";
import Jumbo from "../Components/Jumbo/Jumbo";
import Artcards from "../Components/ArtCards/Artcards";
import Pagination from "../Components//Pagination/Pagination";
import Carousel from "../Components/Carousel/Carousel";
import List from "../Components/Lists/List"
import {
  Form,
  FormGroup,
  Spinner,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { BrowserRouter as Router } from "react-router-dom";
import { apiHost } from "./config";

const Homepage = props => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [currentPage, setCurrnetPage] = useState(1);
  const [cardsPerPage, setcardsPerPage] = useState(6);

  useLayoutEffect(() => {
    const fetchArt = async () => {
      setLoading(true);
      fetch(`${apiHost}onloadpage`).then(response =>
        response.json().then(response => {
          if (response) {
            setState(response);
            setLoading(false);
          } else {
            alert("whoops");
          }
        })
      );
    };
    fetchArt().catch(console.error);
  }, []);

  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  );
  const [artistName, setArtistName] = useState("");
  const [artName, setArtName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [source, setSource] = useState("");

  let data = { artistName, artName, email, description, price, source };

  const addArt = e => {
    setModal(!modal);
    e.preventDefault();

    console.log(data);
    fetch(`${apiHost}uploadArt`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response.valid) {
          return setTimeout(() => window.location.reload(true), 4000);
        } else {
          alert("Something went wrong");
        }
      })
      .catch(error => console.error("Error:", error));
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = state.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = pageNumber => setCurrnetPage(pageNumber);

  const getval = e => {
    let val = e.target.value;
    setcardsPerPage(val);
  };

  const uploadImage = async e => {
    setSpinner(true);
    const files = e.target.files;
    const imgdata = new FormData();
    imgdata.append("file", files[0]);
    imgdata.append("upload_preset", "t5ty4wou");
    const uploadres = await fetch(
      "	https://api.cloudinary.com/v1_1/dr2qkf4kj/image/upload",
      {
        method: "post",
        body: imgdata
      }
    );
    const file = await uploadres.json();
    setSource(file.secure_url);
    setSpinner(false);
  };

  return (
    <Router>
      <div>
        <Jumbo />
        <List state={state} />
        <Carousel />
        <Button color="warning" onClick={toggle}>
          {buttonLabel} Add your Art
        </Button>
        <div>
          <Label
            for="Select"
            className="font-weight-bold float-left mt-1 pl-1 pr-2"
          >
            Select Art per page :
          </Label>
          <Input
            onChange={getval}
            type="select"
            name="select"
            id="select"
            style={{ width: "10%", background: "grey", color: "white" }}
          >
            <option value="6">default(6)</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="8">8</option>
          </Input>
        </div>
        <Artcards state={currentCards} loading={loading} />
        <Pagination
          size="lg"
          cardsPerPage={cardsPerPage}
          totalCards={state.length}
          paginate={paginate}
        />
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle} close={closeBtn}>
            Add your Art
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={addArt}>
              <FormGroup>
                <Input
                  placeholder="Artist name"
                  type="text"
                  id="artistName"
                  onChange={e => setArtistName(e.target.value)}
                  required
                />
                <br></br>
                <Input
                  placeholder="Art name"
                  type="text"
                  id="artName"
                  onChange={e => setArtName(e.target.value)}
                  required
                />
                <br></br>
                <Input
                  placeholder="Email Adress"
                  type="email"
                  id="email"
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <br></br>
                <Input
                  placeholder="Description"
                  maxLength="150"
                  type="text"
                  id="description"
                  onChange={e => setDescription(e.target.value)}
                  required
                />
                <br></br>
                <Input
                  placeholder="Price(NIS)"
                  type="number"
                  name="price"
                  id="price"
                  onChange={e => setPrice(e.target.value)}
                  required
                />
                <br></br>
                <Input
                  type="file"
                  name="file"
                  id="file"
                  placeholder="Upload an image"
                  onChange={uploadImage}
                  required
                />
              </FormGroup>
              <Button type="submit" color="primary">
                Submit
              </Button>{" "}
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </Form>
          </ModalBody>
          <ModalFooter>
            {spinner ? (
              <div className="d-inline-flex p-2 bd-highlight font">
                <Spinner type="grow" color="danger" />
                <Spinner type="grow" color="secondary" />
                <Spinner type="grow" color="primary" />
                <Spinner type="grow" color="warning" />
                <Spinner type="grow" color="success" />
                <Spinner type="grow" color="info" />
                <Spinner type="grow" color="dark" />
                <h6 className="m-1">Uploading</h6>
              </div>
            ) : null}
          </ModalFooter>
        </Modal>
      </div>
    </Router>
  );
};
export default Homepage;
