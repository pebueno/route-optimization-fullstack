import React, { Fragment } from "react";

import InputClient from "./components/InputClient";
import ListClient from "./components/ListClient";

const App = () => {
    return (
        <Fragment>
            <div className="container">
                <InputClient />
                <ListClient />
            </div>
        </Fragment>
    );
};

export default App;