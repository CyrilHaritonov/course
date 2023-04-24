import React, {useEffect, useState} from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import 'ol/ol.css';
import ImageLayer from "ol/layer/Image";
import {ImageStatic} from "ol/source";
import {fromLonLat} from "ol/proj";

function MapComponent(props) {
    const [map, setMap] = useState(null);
    const [originalMap, setOriginalMap] = useState(null);
    const [showOriginalMap, setShowOriginalMap] = useState(true);

    const handleReload = (event) => {
        props.setReload(!props.reload);
    }

    const handleSwitchMap = (event) => {
        setShowOriginalMap(!showOriginalMap);
    }

    useEffect(() => {

        const map = new Map({
            target: 'map',
            layers: [new ImageLayer({
                source: new ImageStatic({
                    url: 'http://localhost:3001/generatepng',
                    imageExtent: [-180, -90, 180, 90],
                    projection: 'EPSG:4326'
                })
            })],
            view: new View({
                center: fromLonLat([0, 0]),
                zoom: 2,
            }),
        });

        const originalMap = new Map({
            target: 'original-map',
            layers: [new ImageLayer({
                source: new ImageStatic({
                    url: 'http://localhost:3001/getpng',
                    imageExtent: [-180, -90, 180, 90],
                    projection: 'EPSG:4326'
                })
            })],
            view: new View({
                center: fromLonLat([0, 0]),
                zoom: 2,
            }),
        });

        setMap(map);
        setOriginalMap(originalMap);
        return () => {
            map.setTarget(null);
            originalMap.setTarget(null);
        }
    }, [props.reload, showOriginalMap]);

    return (
        <>
            {!showOriginalMap && <div id={'map'} style={{height: '960px'}} className={"col-8"}></div>}
            {showOriginalMap && <div id={'original-map'} style={{height: '960px'}} className={"col-8"}></div>}
            <div className={"col-1"}>
                <button className={"btn btn-primary mt-2"} type={"button"} onClick={handleReload}>Reload</button>
                <button className={"btn btn-primary mt-2"} type={"button"} onClick={handleSwitchMap}>Switch map</button>
            </div>
        </>
    );
}

export default MapComponent;
