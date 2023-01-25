import React from "react";

function QueryForm({resetCoordinates}) {
    return (
        <form className="query-form" onSubmit={(event) => {
            event.preventDefault();
            resetCoordinates({lat: event.target.lat.value, lon: event.target.lon.value});
        }}>
            <label>Latitude</label>
            <input type="number" name="lat" />
            <label>Longitude</label>
            <input type="number" name="lon" />
            <button type="submit">Submit</button>
        </form>
    )
}

export default QueryForm;