import React, { useState } from "react";
import "./Artcards.css";
import {
  Card,
  Button,
  CardImg,
  CardGroup,
  CardTitle,
  Badge,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from "reactstrap";
const Artcards = ({ state, loading }, props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);
  const [modalState, setModalState] = useState({});

  const toggleWithId = id => {
    let cardDetails = state.find(card => card._id === id);
    console.log("cardDetails", cardDetails);
    setModalState(cardDetails);
    setModal(!modal);
  };
  const toggle = () => {
    setModal(!modal);
  };


  if (loading) {
    return <h2>Loading</h2>;
  }

  return (
    <CardGroup className="CardGroup">
      {state.map(state => {
        return (
          <div className="blabla">
            <Card
              className="Card"
              style={{ padding: "0", height: "30rem" }}
              key={state._id}
            >
              <CardBody className="pt-0" style={{ flex: "none" }}>
                <CardTitle className="CardTitle">
                  <h5 className="CardParagraph">"{state.artName}"</h5>
                  <h6> By {state.artistName}</h6>
                </CardTitle>
                <CardImg
                  className="CardImg"
                  top
                  width="250px"
                  height="250px"
                  src={state.source}
                  alt={state.artName}
                />
              </CardBody>
              <CardBody style={{ flex: "none" }}>
                <Button
                  size="sm"
                  outline
                  color="danger"
                  className=" m-1"
                >
                  Buy
                </Button>
                <br></br>
                <Button
                  outline
                  color="success"
                  onClick={e => toggleWithId(state._id)}
                >
                  More Details
                </Button>
              </CardBody>
            </Card>
          </div>
        );
      })}
      <Modal
        centered={true}
        size="lg"
        isOpen={modal}
        fade={false}
        toggle={toggle}
        className={className}
      >
        <ModalHeader className="bg-dark text-primary" toggle={toggle}>
          Artist: {modalState.artistName}
        </ModalHeader>
        <ModalBody className="modalBody">
          <div className="picSide">
            <img
              src={modalState.source}
              style={{ width: "600px", height: "400px" }}
            ></img>
            <Badge href={modalState.source} target="_blank">
              Click for full Size
            </Badge>
          </div>
          <div className="rightSide">
            <p>Art Name:{modalState.artName}</p>
            <p>Artist Name:{modalState.artistName}</p>
            <p>Description:{modalState.description}</p>
            <p>Price:{modalState.price}</p>
          </div>
          <div className="footSide">
            <textarea
              style={{ overflow: "auto", resize: "none" }}
              rows="5"
              cols="82"
              placeholder="Write your message"
            ></textarea>
            <Input
              type="text"
              placeholder="Write Email or Tel number for response"
            ></Input>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Send message
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </CardGroup>
  );
};

export default Artcards;
