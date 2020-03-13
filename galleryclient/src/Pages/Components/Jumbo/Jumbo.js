import React from "react";
import { Jumbotron, Container } from "reactstrap";

const Jumbo = () => {
  return (
    <div>
      
      <Jumbotron className="bg-muted" fluid>
        <Container>
          <h2 className="display-3 text-success">Student Art Gallery</h2>
          <h3 className="lead text-danger font-weight-bold">
            Sell & Buy art from art students
          </h3>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Jumbo;
