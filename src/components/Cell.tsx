import React from "react";
import "../App.css";
import { CellContent, CellIndex } from "../Types";

interface CellProps {
    idx: CellIndex;
    value: CellContent;
    current: boolean;
    clickHandler(idx: CellIndex): void;
}

const Cell = (props: CellProps) => {
    const {value, clickHandler, idx} = props;

    const prettyValue = value != null ? value : "-";
    const class_name = props.current ? "cell current-index" : "cell";
    return (
        <div className={class_name} onMouseDown={() => clickHandler(idx)}>
            <span className="cell-digit">{prettyValue}</span>
        </div>
    );
}

export default Cell;