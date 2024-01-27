import React, { Fragment } from "react";

import InputClient from "./components/InputClient";
import ListClient from "./components/ListClient";

const App = () => {
    return (
        <Fragment>
            <div className="container">
                <InputClient />
                <hr className="my-4 border border-secondary-emphasis border-3 opacity-75" />
                <ListClient />
            </div>
        </Fragment>
    );
};

export default App;