import React, {useState} from 'react';
import MapComponent from './MapComponent.jsx';
import PropertiesComponent from "./PropertiesComponent";

function App() {

    const [reload, setReload] = useState(false);

    return (
        <>
            <div className="container">
                <div className="row">
                    <PropertiesComponent reload={reload} setReload={setReload}/>
                    <MapComponent reload={reload} setReload={setReload}/>
                </div>
            </div>

        </>
    );
}

export default App;