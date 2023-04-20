import React, {useState} from "react";

function PropertiesComponent() {
    const [operation, setOperation] = useState('Moving window rectangle');
    const [startX, setStartX] = useState();
    const [startY, setStartY] = useState();
    const [finalX, setFinalX] = useState();
    const [finalY, setFinalY] = useState();
    const [func, setFunc] = useState("Sum");
    const [height, setHeight] = useState();
    const [width, setWidth] = useState();
    const [radius, setRadius] = useState();
    const [innerRadius, setInnerRadius] = useState();
    const [outerRadius, setOuterRadius] = useState();
    const [sectorStart, setSectorStart] = useState();
    const [sectorEnd, setSectorEnd] = useState();
    const handleOperationSelection = (event) => {
        setOperation(event.target.value);
    }

    const handleStartX = (event) => {
        setStartX(event.target.value);
    }

    const handleStartY = (event) => {
        setStartY(event.target.value);
    }

    const handleFinalX = (event) => {
        setFinalX(event.target.value);
    }

    const handleFinalY = (event) => {
        setFinalY(event.target.value);
    }

    const handleFunc = (event) => {
        setFunc(event.target.value);
    }

    const handleHeight = (event) => {
        setHeight(event.target.value);
    }

    const handleWidth = (event) => {
        setWidth(event.target.value);
    }

    const handleRadius = (event) => {
        setRadius(event.target.value);
    }

    const handleInnerRadius = (event) => {
        setInnerRadius(event.target.value);
    }

    const handleOuterRadius = (event) => {
        setOuterRadius(event.target.value);
    }

    const handleSectorStart = (event) => {
        setSectorStart(event.target.value);
    }

    const handleSectorEnd = (event) => {
        setSectorEnd(event.target.value);
    }

    const handleClick = () => {
        if (operation === "Moving window rectangle") {
            fetch("http://localhost:3001/movingwindowrectangle?startx=" + startX + "&starty=" + startY
                + "&finalx=" + finalX + "&finaly=" + finalY + "&func=" + func + "&width=" + width + "&height=" + height).then(res => {
                    console.log(res);
            })
        } else if (operation === "Moving window circle") {

        } else if (operation === "Moving window ring") {

        } else if (operation === "Moving window sector") {

        } else if (operation === "Block operation") {
            fetch("http://localhost:3001/blockoperation?func=" + func + "&blockwidth=" + width + "&blockheight=" + height).then(res => {
                console.log(res);
            });
        }
    }

    return (
        <div className={"col-3"}>
            <select className={"form-select mt-5"} aria-label={"Select"} value={operation}
                    onChange={handleOperationSelection}>
                <option value="Moving window rectangle">Moving window rectangle</option>
                <option value="Moving window circle">Moving window circle</option>
                <option value="Moving window ring">Moving window ring</option>
                <option value="Moving window sector">Moving window sector</option>
                <option value="Block operation">Block operation</option>
            </select>
            {operation === "Moving window rectangle" && <div>
                <div className={"input-group mt-3 mb-3"}>
                    <input type={"text"} className={"form-control"} placeholder={"Start X"} value={startX}
                           onChange={handleStartX}/>
                </div>
                <div className={"input-group mb-3"}>
                    <input type={"text"} className={"form-control"} placeholder={"Start Y"} value={startY}
                           onChange={handleStartY}/>
                </div>
                <div className={"input-group mb-3"}>
                    <input type={"text"} className={"form-control"} placeholder={"Final X"} value={finalX}
                           onChange={handleFinalX}/>
                </div>
                <div className={"input-group mb-3"}>
                    <input type={"text"} className={"form-control"} placeholder={"Final Y"} value={finalY}
                           onChange={handleFinalY}/>
                </div>
                <select className={"form-select"} value={func} onChange={handleFunc}>
                    <option value="Sum">Sum</option>
                    <option value="Product">Product</option>
                </select>
                <div className={"input-group mb-3 mt-3"}>
                    <input type={"text"} className={"form-control"} placeholder={"Width"} value={width}
                           onChange={handleWidth}/>
                </div>
                <div className={"input-group mb-3"}>
                    <input type={"text"} className={"form-control"} placeholder={"Height"} value={height}
                           onChange={handleHeight}/>
                </div>
            </div>}
            {operation === "Moving window circle" && <div>
                <div className={"input-group mt-3 mb-3"}>
                    <input type={"text"} className={"form-control"} placeholder={"Start X"} value={startX}
                           onChange={handleStartX}/>
                </div>
                <div className={"input-group mb-3"}>
                    <input type={"text"} className={"form-control"} placeholder={"Start Y"} value={startY}
                           onChange={handleStartY}/>
                </div>
                <div className={"input-group mb-3"}>
                    <input type={"text"} className={"form-control"} placeholder={"Final X"} value={finalX}
                           onChange={handleFinalX}/>
                </div>
                <div className={"input-group mb-3"}>
                    <input type={"text"} className={"form-control"} placeholder={"Final Y"} value={finalY}
                           onChange={handleFinalY}/>
                </div>
                <select className={"form-select"} value={func} onChange={handleFunc}>
                    <option value="Sum">Sum</option>
                    <option value="Product">Product</option>
                </select>
                <div className={"input-group mb-3 mt-3"}>
                    <input type={"text"} className={"form-control"} placeholder={"Radius"} value={radius}
                           onChange={handleRadius}/>
                </div>
            </div>}
            {operation === "Moving window ring" && <div>
                <div className={"input-group mt-3 mb-3"}>
                    <input type={"text"} className={"form-control"} placeholder={"Start X"} value={startX}
                           onChange={handleStartX}/>
                </div>
                <div className={"input-group mb-3"}>
                    <input type={"text"} className={"form-control"} placeholder={"Start Y"} value={startY}
                           onChange={handleStartY}/>
                </div>
                <div className={"input-group mb-3"}>
                    <input type={"text"} className={"form-control"} placeholder={"Final X"} value={finalX}
                           onChange={handleFinalX}/>
                </div>
                <div className={"input-group mb-3"}>
                    <input type={"text"} className={"form-control"} placeholder={"Final Y"} value={finalY}
                           onChange={handleFinalY}/>
                </div>
                <select className={"form-select"} value={func} onChange={handleFunc}>
                    <option value="Sum">Sum</option>
                    <option value="Product">Product</option>
                </select>
                <div className={"input-group mb-3 mt-3"}>
                    <input type={"text"} className={"form-control"} placeholder={"Inner radius"} value={innerRadius}
                           onChange={handleInnerRadius}/>
                </div>
                <div className={"input-group mb-3"}>
                    <input type={"text"} className={"form-control"} placeholder={"Outer radius"} value={outerRadius}
                           onChange={handleOuterRadius}/>
                </div>
            </div>}
            {operation === "Moving window sector" && <div>
                <div className={"input-group mt-3 mb-3"}>
                    <input type={"text"} className={"form-control"} placeholder={"Start X"} value={startX}
                           onChange={handleStartX}/>
                </div>
                <div className={"input-group mb-3"}>
                    <input type={"text"} className={"form-control"} placeholder={"Start Y"} value={startY}
                           onChange={handleStartY}/>
                </div>
                <div className={"input-group mb-3"}>
                    <input type={"text"} className={"form-control"} placeholder={"Final X"} value={finalX}
                           onChange={handleFinalX}/>
                </div>
                <div className={"input-group mb-3"}>
                    <input type={"text"} className={"form-control"} placeholder={"Final Y"} value={finalY}
                           onChange={handleFinalY}/>
                </div>
                <select className={"form-select"} value={func} onChange={handleFunc}>
                    <option value="Sum">Sum</option>
                    <option value="Product">Product</option>
                </select>
                <div className={"input-group mb-3 mt-3"}>
                    <input type={"text"} className={"form-control"} placeholder={"Radius"} value={radius}
                           onChange={handleRadius}/>
                </div>
                <div className={"input-group mb-3"}>
                    <input type={"text"} className={"form-control"} placeholder={"Sector start"} value={sectorStart}
                           onChange={handleSectorStart}/>
                </div>
                <div className={"input-group mb-3"}>
                    <input type={"text"} className={"form-control"} placeholder={"Sector end"} value={sectorEnd}
                           onChange={handleSectorEnd}/>
                </div>
            </div>}
            {operation === "Block operation" && <div>
                <div className={"input-group mt-3 mb-3"}>
                    <input type={"text"} className={"form-control"} placeholder={"Width"} value={width}
                           onChange={handleWidth}/>
                </div>
                <div className={"input-group mb-3"}>
                    <input type={"text"} className={"form-control"} placeholder={"Height"} value={height}
                           onChange={handleHeight}/>
                </div>
                <select className={"form-select mb-3"} value={func} onChange={handleFunc}>
                    <option value="Sum">Sum</option>
                    <option value="Product">Product</option>
                </select>
            </div>}
            <button className={"btn btn-primary"} type={"button"} onClick={handleClick}>Apply</button>
        </div>

    );
}

export default PropertiesComponent;