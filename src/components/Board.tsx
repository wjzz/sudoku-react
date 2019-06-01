import React from "react";
import Square from "./Square";
import "../App.css";
import { CellIndex, Puzzle} from "../Types";

interface Props {
    readonly puzzle: Puzzle;
    readonly currentIndex: CellIndex | null;
    handleCellClick(idx: CellIndex): void;
};

const Board: React.FC<Props> = (props: Props) => {
    const squares : JSX.Element[] = [];

    for (let row = 0; row < 3; ++row){
        for (let col = 0; col < 3; ++col){
            squares.push(<Square 
                key={`${row}${col}`}
                row={row}
                col={col}
                puzzle={props.puzzle}
                currentIndex={props.currentIndex}
                handleCellClick={props.handleCellClick}
            />);
        }
    }

    return (
        <div id="board">
            { squares }
        </div>
    );
}

export default Board;