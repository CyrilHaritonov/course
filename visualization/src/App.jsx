import React from 'react';
import MapComponent from './MapComponent.jsx';
import PropertiesComponent from "./PropertiesComponent";

function App() {
    return (
        <>
            <div className="container">
                <div className="row">
                    <PropertiesComponent/>
                    <MapComponent/>
                </div>
            </div>

        </>
    );
}

export default App;