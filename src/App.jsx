// App.jsx
import React from "react";
import Overlay from "./components/Overlay.jsx";
import Navigation from "./components/Navigation.jsx";

function App() {
  return (
    <Overlay>
        <Navigation />
    </Overlay>
  );
}

export default App;
