import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./Pages/Common/Header";
import Main from "./Pages/Common/Main";
function App() {
  return (
    <div className="App" style={{ textAlign: "center" }}>
      <Header/>
      <Main />
    </div>
  );
}

export default App;
