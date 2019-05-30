import { Puzzle, CellIndex, CellDigit, all_digits } from "./Types";

// Two example easy puzzles taken from
// Webservice with sudoku JSON API
// "http://www.cs.utep.edu/cheon/ws/sudoku/";

export function examplePuzzle() : Puzzle {
    return [
        [null, null, null, 2, 6, null, 7, null, 1,],
        [6, 8, null, null, 7, null, null, 9, null,],
        [1, 9, null, null, null, 4, 5, null, null,],
        [8, 2, null, 1, null, null, null, 4, null,],
        [null, null, 4, 6, null, 2, 9, null, null,],
        [null, 5, null, null, null, 3, null, 2, 8,],
        [null, null, 9, 3, null, null, null, 7, 4,],
        [null, 4, null, null, 5, null, null, 3, 6,],
        [7, null, 3, null, 1, 8, null, null, null,],
    ];
}

export function examplePuzzle2() : Puzzle {
    return [
        [1, null, null, 4,8,9, null, null, 6],
        [7,3,null,null,null,null,null,4,null,],
        [null,null,null,null,null,1,2,9,5],
        [null,null,7,1,2,null,6,null,null,],
        [5,null,null,7,null,3,null,null,8,],
        [null,null,6,null,9,5,7,null,null,],
        [9,1,4,6,null,null,null,null,null,],
        [null,2,null,null,null,null,null,3,7,],
        [8,null,null,5,1,2,null,null,4],
    ];
}

/// Checks if the given puzzle is solved
export function isPuzzleSolved(puzzle: Readonly<Puzzle>): boolean {
    const no_nulls = puzzle.every( row =>
        row.every (value => 
            value !== null));
    return no_nulls && validateSudoku(puzzle);
}

/// Checks if the given (perhaps partially solved) puzzle contains
/// no contradictions, ie. all the sudoku conditions are OK
export function validateSudoku (puzzle: Readonly<Puzzle>) : boolean {
    for (let row = 0; row < 9; ++row){
        for (let col = 0; col < 9; ++col){
            const current = puzzle[row][col];
            if (current !== null){
                // check row
                for (let next_col = col+1; next_col < 9; next_col++){
                    if (puzzle[row][next_col] === current) {
                        return false;
                    }
                }
                // check col
                for (let next_row = row+1; next_row < 9; ++next_row){
                    if (puzzle[next_row][col] === current){
                        return false;
                    }
                }
                // check the 3x3 square containing the current cell
                const square_base_row = Math.floor(row/3);
                const square_base_col = Math.floor(col/3);
                for (let dx = 0; dx < 3; ++dx){
                    for (let dy = 0; dy < 3; ++dy){
                        const next_row = 3*square_base_row + dy;
                        const next_col = 3*square_base_col + dx;
                        if (((row !== next_row) || (col !== next_col)) 
                           && puzzle[next_row][next_col] === current){
                            return false;
                        }
                    }
                }
            }
        }
    }
    return true;
}

// Calculates all possible digits that fit in the {row, col} position
// of the given puzzle.
// Precondition: puzzle[row][col] === null
export function findCandidates(puzzle: Puzzle, {row, col}: CellIndex): CellDigit[] {
    const results : CellDigit[] = [];

    console.assert(puzzle[row][col] === null);

    for (let digit of all_digits){
        puzzle[row][col] = digit;
        if (validateSudoku(puzzle)){
            results.push(digit);
        }
        puzzle[row][col] = null;
    } 
    return results;
}