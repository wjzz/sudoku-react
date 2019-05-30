import React from "react";
import "../App.css";

interface Props {
    handleReset(): void;
    handleRandomize(): void;
    handleInitial(n: number): () => void;
    validation: boolean;
}

const Banner : React.FC<Props> = (props: Props) => {
    const validation = props.validation ? "valid" : "invalid";
    return (
        <div id="banner">
            <button onClick={props.handleReset}>Reset</button>
            <button onClick={props.handleRandomize}>Randomize</button>
            <button onClick={props.handleInitial(1)}>Initial game 1</button>
            <button onClick={props.handleInitial(2)}>Initial game 2</button>
            <br />
            Position status: <span id="validation" className={`validation ${validation}`}>{validation}</span>
        </div>
    );
}

export default Banner;