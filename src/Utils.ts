import { CellDigit, Puzzle } from "./Types";

/// Some helper functions

/// Returns a random integer in the [min, max] interval
function randInt(min: number, max: number) : number {
    console.assert (min < max);
    console.assert (0 <= min);
    console.assert (1 <= max);
    // Proof of correctness
    // let m = Math.random()
    // then 0 <= m < 1
    // then 0 <= (max-min+1)*m < max-min+1
    // min <= min+(max-min+1)*m < max+1
    // Math.floor(min+(max-min+1)m) in [min, max]
    return Math.floor(min + (max-min+1) * Math.random());
}

function randCellDigit(): CellDigit {
    return randInt(1, 9) as CellDigit;
}

// TODO: add unit tests for randInt and randCellDigit

export function generateRandomPuzzle(): Puzzle {
    const puzzle : Puzzle = [];
    for (let row = 0; row < 9; ++row){
        puzzle[row] = [];
        for (let col = 0; col < 9; ++col){
            puzzle[row][col] = randCellDigit();
        }
    }
    return puzzle;
}
