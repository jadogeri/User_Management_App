import { customAlphabet } from 'nanoid';
import { nolookalikes } from 'nanoid-dictionary';


/**
   * Generates a random string of specified length using a set of characters 
   * defined in 'nolookalikes'. This can be used for creating unique identifiers.
   * 
   * @param length - The length of the random string to be generated.
   * @returns A random string of the specified length.
   * @throws Will throw an error if the length is less than 1.
   */
export function generateRandomUUID(length : number) {
    if(length < 0){
      throw new Error("Invalid length");
    }
    // Create a generator using the nolookalikes alphabet
    const nanoid = customAlphabet(nolookalikes, length);

    const result = nanoid();
    
    return result;
  }
  
