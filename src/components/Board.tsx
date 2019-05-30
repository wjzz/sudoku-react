import React from "react";
import Square from "./Square";
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
            squares.push(<Square 
                row={row}
                col={col}
                puzzle={props.puzzle}
                currentIndex={props.calculation.currentIndex}
                handleCellClick={props.handleCellClick}
                />);
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