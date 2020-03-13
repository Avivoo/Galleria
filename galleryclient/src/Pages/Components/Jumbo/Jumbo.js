import React from "react";
import { Jumbotron, Container } from "reactstrap";

const Jumbo = ({ state }, props) => {
  return (
    <div>
      
      <Jumbotron className="bg-muted" fluid>
        <Container>
          <h2 className="display-3 text-success">Student Art Gallery</h2>
          <h3 className="lead text-danger font-weight-bold">
            Sell & Buy art from art students
          </h3>
          <ol style={{display: "block",flexWrap: "nowrap"}}>
           {state.map((state =>{return(<li>{state.artistName}</li>)}))}
          </ol>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Jumbo;
