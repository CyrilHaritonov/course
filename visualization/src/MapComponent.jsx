import React, {useEffect, useState} from 'react';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
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

        return () => {
            map.setTarget(null);
        }
    }, []);

    return (
        <div id={'map'} style={{width: '100%', height: '400px'}}></div>
    );
}

export default MapComponent;