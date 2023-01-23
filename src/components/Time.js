import React, { useState, useEffect} from "react";

function Time({time}) {

    const [ctime, setCtime] = useState(time)

    return (
        <div className="time">
            {ctime}
        </div>
    )
}

export default Time;