import { InvestmntClass } from './../investmnt/investmnt.class';

export class WagerClass extends InvestmntClass {

  constructor() {
    super();
  }



/**
 * Rounds a number to one decimal place.
 * @param value The number to round.
 * @returns The value rounded to one decimal place.
 */
private roundToOneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}




/**
 * Calculates the implied probability based on a given odd value.
 * @param oddValue The betting odd value.
 * @returns The rounded implied probability, or 0 if the odd value is invalid.
 */
protected impliedProbability(oddValue: number): number {
  const parsedOdd = Number(oddValue);
  
  // Guard clause: ensure the input is valid (non-zero, positive)
  if (!parsedOdd || parsedOdd <= 0) {
    return 0;
  }

  const oddIP = (1 / parsedOdd) * 100;
  
  // Return the rounded probability if the result is finite, else return 0.
  return isFinite(oddIP) ? this.roundToOneDecimal(oddIP) : 0;
}



/**
 * Determines the progress bar width class based on the implied probability of an odd.
 * @param odd The betting odd.
 * @returns An object with a width class key, e.g. { 'w-25': true }.
 */
protected setProgressWidth(odd: number): object {
  const ip = this.impliedProbability(odd);

  // Guard clause: if ip is out of expected range, return an empty object (or handle as needed)
  if (ip < 1 || ip > 100) {
    return {};
  }

  if (ip <= 25) {
    return { 'w-25': true };
  } else if (ip <= 50) {
    return { 'w-50': true };
  } else if (ip <= 75) {
    return { 'w-75': true };
  } else {
    return { 'w-100': true };
  }
}



/**
 * Determines the strength grade based on the implied probability of an odd.
 * @param odd The betting odd.
 * @returns A string representing the grade: 'Lower', 'Low', 'Normal', or 'High'.
 */
protected setOddStrength(odd: number): string {
  const ip = this.impliedProbability(odd);

  // Guard clause for invalid probability values (out of expected range)
  if (ip < 1 || ip > 100) {
    return 'Invalid';
  }

  if (ip <= 25) {
    return 'Lower';
  } else if (ip <= 50) {
    return 'Low';
  } else if (ip <= 75) {
    return 'Normal';
  } else { // ip is between 75 and 100
    return 'High';
  }
}



/**
 * Checks if the wager's games array contains a 'lose' status.
 * @param wager An object containing game information.
 * @returns True if a losing game is found; otherwise, false.
 */
public isLosed(wager: any): boolean {
  return super.isInArray(wager.games.game, 'lose');
}



 /**
 * Determines if the game is currently running.
 * Returns true if neither a 'lose' nor 'win' status is found in the wager's games.
 * @param wager An object containing game information.
 * @returns True if the game is running; otherwise, false.
 */
public isRunning(wager: any): boolean {
  return !(super.isInArray(wager.games.game, 'lose') || super.isInArray(wager.games.game, 'win'));
}


}
