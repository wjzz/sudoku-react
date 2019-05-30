export type CellDigit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export const all_digits : CellDigit[] = [1,2,3,4,5,6,7,8,9];

export type CellContent = CellDigit | null;

export type Puzzle = CellContent[][];

export interface CellIndex {
    row: number;
    col: number;
}

export interface CalculationState {
    readonly currentIndex: CellIndex | null;
    readonly calculationStarted: boolean;
    readonly indexesDone: CellIndex[];
    readonly indexesTodo: CellIndex[];
}
