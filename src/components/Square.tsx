import React from "react";
import Cell from "./Cell";
import "../App.css";
import { CellIndex, Puzzle } from "../Types";

interface Props {
    row: number;
    col: number;
    puzzle: Puzzle;
    currentIndex: CellIndex | null;
    handleCellClick(idx: CellIndex): void;
}

const Square : React.FC<Props> = (props: Props) => {
    const {row, col, puzzle, currentIndex} = props;

    const cells = [];
    for (let i = 0; i < 3; ++i){
        for (let j = 0; j < 3; ++j){
            const cell_row = 3*row + i;
            const cell_col = 3*col + j;
            const value = puzzle[cell_row][cell_col];
            const idx = {row: cell_row, col: cell_col};

            let isCurrent = false;
            if (currentIndex &&
                currentIndex.row === cell_row &&
                currentIndex.col === cell_col){
                    isCurrent = true;
            }
            cells.push(<Cell 
                current = {isCurrent}
                idx = {idx}
                value = {value}
                key = {`${cell_row}${cell_col}`}
                clickHandler = {props.handleCellClick}
            />);
        }
    }
    return (
        <div className="square" key={`${row}${col}`}>
            {cells}
        </div>
    );
}

export default Square;