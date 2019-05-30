import React from "react";
import Cell from "./Cell";
import "../App.css";
import { CellIndex, CellContent } from "../Types";

export interface CalculationState {
    readonly currentIndex: CellIndex | null;
    readonly calculationStarted: boolean;
    readonly indexesDone: CellIndex[];
    readonly indexesTodo: CellIndex[];
}

interface Props {
    readonly puzzle: CellContent[][];
    handleCellClick(idx: CellIndex): void;
    handleCalculate(): void;
    readonly calculation: CalculationState;
};

const Board: React.FC<Props> = (props: Props) => {
    const squares : JSX.Element[] = [];

    for (let row = 0; row < 3; ++row){
        for (let col = 0; col < 3; ++col){
            const cells = [];
            for (let i = 0; i < 3; ++i){
                for (let j = 0; j < 3; ++j){
                    const cell_row = 3*row + i;
                    const cell_col = 3*col + j;
                    const value = props.puzzle[cell_row][cell_col];
                    const idx = {row: cell_row, col: cell_col};
                    let isCurrent = false;
                    if (props.calculation.currentIndex){
                        const {row: curr_row, col: curr_col} = props.calculation.currentIndex;
                        if ((curr_row === cell_row) && (curr_col === cell_col)){
                            isCurrent = true;
                        }
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
            squares.push(<div className="square" key={`${row}${col}`}>
                {cells}
            </div>);
        }
    }

    const {calculationStarted, indexesDone, indexesTodo} = props.calculation;
    const calculation_info = 
        calculationStarted ? 
        <div>
            Calculation started <br />
            {indexesTodo.length} todo. <br />
            {indexesDone.length} done. <br />
        </div>
        : 
        "No started calculations";

    return (
        <div id="board-container">
            <div id="board">
                { squares }
            </div>
            <div id="panel">
                Additional information: <br/><br/>
                <button onClick={props.handleCalculate}>
                    Calculate canditates
                </button> <br/><br/>
                {calculation_info}
            </div>
        </div>
    );
}

export default Board;