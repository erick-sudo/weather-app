import React from "react";

function Locations() {
    
    return (
        <div className="select-location">
            {
                "erick".repeat(10).split("").map((p, index) => {
                    return (
                        <div className="places">React Router Dom</div>                    )
                })
            }
        </div>
    )
}

export default Locations;