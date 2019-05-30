import React, { Component } from "react";
import Banner from "./Banner";
import Board, { CalculationState } from "./Board";

import "../App.css";

import { CellContent, CellIndex, Puzzle } from "../Types";
import { generateRandomValues } from "../Utils";
import { examplePuzzle, examplePuzzle2, validateSudoku, findCandidates } from "../Sudoku";

interface Props {}

interface State {
    readonly values: Puzzle;
    readonly calculation: CalculationState;
}

const initialCalculation : CalculationState = {
    calculationStarted: false,
    currentIndex: null,
    indexesDone: [],
    indexesTodo: [],
}

class Game extends Component<Props, State>{
    constructor(props: Props){
        super(props);

        const values: Puzzle = examplePuzzle();
        this.state = { values, calculation: initialCalculation };
    }

    handleReset = () => {
        this.setState({values: examplePuzzle(), calculation: initialCalculation});
    }

    handleRandomize = () => {
        const values = generateRandomValues();
        this.setState({values, calculation: initialCalculation});
    }

    handleInitial = (n: number) => () => {
        let values = (n === 1) ? examplePuzzle() : examplePuzzle2();
        this.setState({values, calculation: initialCalculation});
    }

    handleCellClick = (idx: CellIndex) => {
        const {row, col} = idx;
        const values = this.state.values.slice();
        const value = values[row][col];
        const newValue = (!value || value === 9) ? 1 : value + 1;
        values[row][col] = newValue as CellContent;
        this.setState({values});
    }

    nextCandidate = () => {
        const {calculationStarted, indexesDone, indexesTodo} = this.state.calculation;
        if (calculationStarted){
            if (indexesTodo.length === 0){
                const calculation = Object.assign({}, this.state.calculation, {calculatatioStarted: false});
                this.setState({calculation});
            } else {
                // start state update
                const newIndexesTodo = indexesTodo.slice();
                const currentIndex = newIndexesTodo.pop() as CellIndex;

                // do the actual calculation
                const {row, col} = currentIndex;
                const candidates = findCandidates(this.state.values, currentIndex);

                // finish state update
                const newIndexesDone = [...indexesDone, currentIndex];
                const calculation = {
                    calculationStarted: true,
                    currentIndex,
                    indexesTodo: newIndexesTodo,
                    indexesDone: newIndexesDone,
                };
                this.setState({calculation});
                if (candidates.length === 0){
                    console.log("PROBLEM: no possible solutions!!")
                } else {
                    if (candidates.length === 1){
                        const values = this.state.values.slice();
                        values[row][col] = candidates[0];
                        this.setState({values});
                    }
                    window.setTimeout(this.nextCandidate, 100);
                }                 
            }
        }
    }

    handleCalculate = () => {
        const values = this.state.values;
        let indexes : CellIndex[] = [];
        for (let row = 0; row < 9; ++row){
            for (let col = 0; col < 9; ++col){
                if (values[row][col] === null){
                    indexes.push({row, col});
                }
            }
        }

        const calculation = {
            calculationStarted: true, 
            indexesTodo: indexes,
            indexesDone: [], 
            currentIndex: null};
        this.setState({calculation});
        window.setTimeout(this.nextCandidate, 100);
    }

    render(){
        return (
            <div id="game">
                <Banner 
                    handleReset={this.handleReset}
                    handleRandomize={this.handleRandomize}
                    handleInitial={this.handleInitial}
                    validation={validateSudoku(this.state.values)}
                />
                <Board 
                    values={this.state.values} 
                    handleCellClick={idx => 1}
                    handleCalculate={this.handleCalculate}
                    calculation={this.state.calculation}
                    //handleCellClick={this.handleCellClick} 
                />
            </div>
        );
    }
}

export default Game;
