import React from "react";
import "./List.css";
import { Table } from "reactstrap";

const List = ({ state }, props) => {
  console.log(state);
  let i = 1;
  return (
    <Table responsive className="artTable">
      <thead>
        <tr className="three">
          <th>#</th>
          <th>Artist Name</th>
          <th> Art Name</th>
        </tr>
      </thead>
      <tbody>
        {state.map(state => {
          return (
            <tr key={state._id}>
              {" "}
              <th scope="row">{i++}</th>
              <td>{state.artistName}</td>
              <td>{state.artName}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default List;
