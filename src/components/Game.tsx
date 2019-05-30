import React, { Component } from "react";
import Banner from "./Banner";
import Board, { CalculationState } from "./Board";

import "../App.css";

import { CellContent, CellIndex, Puzzle, CellDigit } from "../Types";
import { generateRandomPuzzle } from "../Utils";
import { examplePuzzle, examplePuzzle2, validateSudoku, findCandidates } from "../Sudoku";

interface Props {}

interface State {
    readonly puzzle: Puzzle;
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

        const puzzle: Puzzle = examplePuzzle();
        this.state = { puzzle, calculation: initialCalculation };
    }

    handleReset = () => {
        this.setState({puzzle: examplePuzzle(), calculation: initialCalculation});
    }

    handleRandomize = () => {
        const puzzle = generateRandomPuzzle();
        this.setState({puzzle, calculation: initialCalculation});
    }

    handleInitial = (n: number) => () => {
        let puzzle = (n === 1) ? examplePuzzle() : examplePuzzle2();
        this.setState({puzzle, calculation: initialCalculation});
    }

    handleCellClick = (idx: CellIndex) => {
        const {row, col} = idx;
        const puzzle = this.state.puzzle.slice();
        const value = puzzle[row][col];
        const newValue = (!value || value === 9) ? 1 : value + 1;
        puzzle[row][col] = newValue as CellContent;
        this.setState({puzzle});
    }

    private processNextCell(indexesTodo: CellIndex[], indexesDone: CellIndex[]) {
        // start state update
        const newIndexesTodo = indexesTodo.slice();
        const currentIndex = newIndexesTodo.pop() as CellIndex;

        // do the actual calculation
        const candidates = findCandidates(this.state.puzzle, currentIndex);

        // finish state update
        const newIndexesDone = [...indexesDone, currentIndex];
        const calculation = {
            calculationStarted: true,
            currentIndex,
            indexesTodo: newIndexesTodo,
            indexesDone: newIndexesDone,
        };
        this.setState({ calculation });

        return { candidates, currentIndex };
    }

    private markCellAsSolved(currentIndex: CellIndex, candidates: CellDigit[]) {
        const puzzle = this.state.puzzle.slice();
        const { row, col } = currentIndex;
        puzzle[row][col] = candidates[0];
        this.setState({ puzzle });
    }

    nextCandidate = () => {
        const {calculationStarted, indexesDone, indexesTodo} = this.state.calculation;
        if (calculationStarted){
            if (indexesTodo.length === 0){
                const calculation = Object.assign({}, this.state.calculation, {calculationStarted: false});
                this.setState({calculation});
            } else {
                const { candidates, currentIndex } = this.processNextCell(indexesTodo, indexesDone);               

                if (candidates.length > 0){
                    if (candidates.length === 1){
                        this.markCellAsSolved(currentIndex, candidates);
                    }
                    window.setTimeout(this.nextCandidate, 100);
                } else {
                    console.log("PROBLEM: no possible solutions!!");
                }
            }
        }
    }

    handleCalculate = () => {
        const puzzle = this.state.puzzle;
        let indexes : CellIndex[] = [];
        for (let row = 0; row < 9; ++row){
            for (let col = 0; col < 9; ++col){
                if (puzzle[row][col] === null){
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
                    validation={validateSudoku(this.state.puzzle)}
                />
                <Board 
                    puzzle={this.state.puzzle} 
                    handleCellClick={idx => 1}
                    //handleCellClick={this.handleCellClick} 
                    handleCalculate={this.handleCalculate}
                    calculation={this.state.calculation}
                />
            </div>
        );
    }
}

export default Game;
