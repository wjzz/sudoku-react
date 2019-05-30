import React from "react";
import Board from "./Board";
import BoardPanel from "./BoardPanel";
import "../App.css";
import { CellIndex, Puzzle, CalculationState } from "../Types";
import { isPuzzleSolved } from "../Sudoku";

interface Props {
    readonly puzzle: Puzzle;
    handleCellClick(idx: CellIndex): void;
    handleCalculate(): void;
    readonly calculation: CalculationState;
};

const BoardContainer: React.FC<Props> = (props: Props) => {
    return (
        <div id="board-container">
            <Board
                puzzle={props.puzzle}
                currentIndex={props.calculation.currentIndex}
                handleCellClick={props.handleCellClick}
            />
            <BoardPanel 
                handleCalculate={props.handleCalculate}
                calculation={props.calculation}
                puzzleSolved={isPuzzleSolved(props.puzzle)}
            />
        </div>
    );
}

export default BoardContainer;