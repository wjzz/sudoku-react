import React from "react";
import "../App.css";
import { CalculationState } from "../Types";

interface Props {
    handleCalculate(): void;
    readonly puzzleSolved: boolean;
    readonly calculation: CalculationState;
}

const BoardPanel : React.FC<Props> = (props: Props) => {

    const {calculationStarted, indexesDone, indexesTodo} = props.calculation;
    const calculation_info = 
        props.puzzleSolved ? 
        "Puzzle solved!" :
        (calculationStarted ? 
        <div>
            Calculation started <br />
            {indexesTodo.length} todo. <br />
            {indexesDone.length} done. <br />
        </div>
        : 
        "No started calculations");

    return (
        <div id="panel">
            Additional information: <br/><br/>
            <button onClick={props.handleCalculate}>
                Calculate canditates
            </button> <br/><br/>
            {calculation_info}
        </div>
    )
}

export default BoardPanel;