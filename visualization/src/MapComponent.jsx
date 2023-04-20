import React, {useEffect, useState} from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import 'ol/ol.css';
import ImageLayer from "ol/layer/Image";
import {ImageStatic} from "ol/source";
import {fromLonLat} from "ol/proj";
function MapComponent() {
    const [map, setMap] = useState(null);

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

        setMap(map);

        return () => {
            map.setTarget(null);
        }
    }, []);

    return (
        <div id={'map'} style={{height: '960px'}} className={"col-9"}></div>
    );
}

export default MapComponent;