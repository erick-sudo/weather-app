import React, { useState, useEffect} from "react";

function Time({time : {localtime, epoch}}) {

    const [ctime, setCtime] = useState(localtime)

    return (
        <div className="time">
            <span>{ctime}</span>
            <span>{epoch}</span>
        </div>
    )
}

export default Time;