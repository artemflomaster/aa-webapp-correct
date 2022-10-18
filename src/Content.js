import React, { useEffect } from "react";
import getData from "./getData.mjs";

export default function Content() {
    React.useEffect(() => {
        getData()
    }, []);



    return (
        <div className="content">

        </div>
    )
}