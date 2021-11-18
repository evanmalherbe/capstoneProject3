import React from 'react';

// Import React bootstrap Button
import Button from "react-bootstrap/Button";

// Import images
import Flag from '../redFlag.png';
import Mine from '../mineImg.png';
import Number1 from '../number1.png';
import Number2 from '../number2.png';

// Import child components
import Scoreboard from './Scoreboard';
import WonOrLost from './WonOrLost';

/* The following websites really helped me with this task:

Working with objects: 
https://www.freecodecamp.org/news/javascript-array-of-objects-tutorial-how-to-create-update-and-loop-through-objects-using-js-array-methods/

Looping through an object:
https://tippingpoint.dev/loop-through-an-object-in-javascript

Adding to state Arrays correctly, and displaying them using the map() method:
https://www.robinwieruch.de/react-state-array-add-update-remove

I found that each of my functions was being called twice (saw in console.log), so I implimented the fix described
here:
https://stackoverflow.com/questions/50819162/why-is-my-function-being-called-twice-in-react

5 ways to loop through an array:
https://levelup.gitconnected.com/five-ways-to-loop-through-a-javascript-array-3325f4673334

*/

// Create function to display game board
class Gameboard extends React.Component {

    constructor(props) {
        super(props);

        // Define initial state variables
        this.state = {
            sizeOfBoard: 0,
            numOfFlags: 0,
            numOfMines: 0,
            scoreArray: 0,
            wonOrLostMsg: 0,
            arrayCreated: false,

            /* blockArray is an array of objects. Each object represents a block on the board, and contains the status 
            of that block. Specifically, the id or index, blockStatus (normal or exposed), mineStatus (is there a mine
             under the block or not - boolean), flagStatus (has user placed a flag on this block or not - boolean),
             numberHint (number from 1 to 4 to give the user a hint of where the mines are) */
            blockArray: [{
                id: 0,
                blockStatus: "normal",
                mineStatus: false,
                flagStatus: false,
                numberHint: 0,
                emptyBlockSection: 0
            }],

            /* divArray is an array that contains the code for each div (block) on the game board.
            e.g. <div className="block" id={element} onClick={() => this.exposeBlock(element)} onContextMenu={(e) => 
            {e.preventDefault(); this.placeFlag(element)}}>{element}</div> */
            divArray: []
        };
          // Binding for each function so that "this" works correctly
          this.exposeBlock = this.exposeBlock.bind(this);
          this.placeFlag = this.placeFlag.bind(this);
          this.createArray = this.createArray.bind(this);
          this.displayBoard = this.displayBoard.bind(this);
          this.getScore = this.getScore.bind(this);
          this.resetGame = this.resetGame.bind(this);
          this.isNumberHint1 = this.isNumberHint1.bind(this);
          this.isNumberHint2 = this.isNumberHint2.bind(this);
          this.isMine = this.isMine.bind(this);
          this.hasWon = this.hasWon.bind(this);
          this.arraysEqual = this.arraysEqual.bind(this);
    }

    // Else if there is a mine under the block, show the mine.
    isMine(index, newArray, tempArray) {
        // Set block status of block that was clicked on to "exposed"/uncovered in temp array
        newArray[index].blockStatus = "exposed";

        // Update cloned array at the index the user clicked on with mine/bomb image
        tempArray[index] = 
        <div className="block exposedBlock" 
            id={index} 
            onClick={() => this.exposeBlock(index)} 
            onContextMenu={(e) => {e.preventDefault(); this.placeFlag(index)}}>
                <img className="mineImg" src={Mine} alt="Mine / bomb" />
        </div>;
        
        // create "Game over" message to be used by "WonOrLost" component
        let winOrLose = "Game Over!";

        // Update real blockarray and divArray with updated temp cloned array and won or lost message
        this.setState(
            {blockArray: newArray, 
            divArray: tempArray, 
            wonOrLostMsg: winOrLose}, 
            () => {console.log("divArray and blockarray item index '" + index + "' updated with mine");
        
        }); 

    // End of isMine function
    }

    // If there is a number hint of "2" under the block, show the number hint
    isNumberHint2(index, newArray, tempArray) {
    
        // Set block status of block that was clicked on to "exposed" (uncovered) in temp array
        newArray[index].blockStatus = "exposed";

        // Update temporary cloned array at the index the user clicked on with image of a "2"
        tempArray[index] = 
        <div className="block exposedBlock" 
        id={index} 
        onClick={() => this.exposeBlock(index)} 
        onContextMenu={(e) => {e.preventDefault(); this.placeFlag(index)}}>
            {<img className="number2Img" src={Number2} alt="number 2" />}
        </div>;
            
        // Update real blockArray and divArray with updated cloned arrays
        this.setState(
            {divArray: tempArray, 
            blockArray: newArray}, 
            () => console.log("divArray and blockarray item index '" + index + "' updated")); 
    
    // End of isNumberHint2 function
    }

    // If there is a number hint of "1" under the block, show the number "1"
    isNumberHint1(index, newArray, tempArray) {

        // Set block status of block that was clicked on to "exposed"
        newArray[index].blockStatus = "exposed";

        // Update cloned array at the index the user clicked on with image of a "1"
        tempArray[index] = 
        <div className="block exposedBlock" 
            id={index} 
            onClick={() => this.exposeBlock(index)} 
            onContextMenu={(e) => {e.preventDefault(); this.placeFlag(index)}}>
            {<img className="number1Img" src={Number1} alt="number 1" />}
        </div>;
            
        // Update divArray with temp cloned array and blockArray with new "exposed" value
        this.setState({
            divArray: tempArray, 
            blockArray: newArray}, 
            () => console.log("divArray item index '" + index + "' updated with number hint")
        );  

    // End of isNumberhint1 function
    }

    // Else if there are no number hints for this block, just show blank space on board.
    isEmptyBlock(index, newArray, tempArray) {
        // Set block status of block that was clicked on to "exposed"/uncovered in temp array
        newArray[index].blockStatus = "exposed";

        // Update cloned array at the index the user clicked on with empty blocl
        tempArray[index] = 
        <div className="block exposedBlock" 
            id={index} 
            onClick={() => this.exposeBlock(index)} 
            onContextMenu={(e) => {e.preventDefault(); this.placeFlag(index)}}>
                &nbsp;
        </div>;

        // Update real blockArray and divArray with updated cloned arrays
        this.setState(
            {divArray: tempArray,
            blockArray: newArray}, 
            () => console.log("divArray item index '" + index + "' updated")
        ); 

    // End of isEmptyBlock function
    }

    /* This function is called when the user clicks on a block to expose what is underneath it. It takes the index of 
    the block the user clicked on and changes just that block according to what the status of the block is (empty
    underneath, contains number hint or contains mine. It just changes the background colour to make it look like the block has been removed. If there is a mine under the block, it shows the mine. If there is a number hint under 
    the block, it shows the number hint */
    exposeBlock(index) {

        // If statement to block clicks if the game has already been won or lost.
        if (this.state.wonOrLostMsg === 0) {
            // use slice() to create temporary clone of blockArray (array with all info about each block) to 
            // work on
            let newArray = this.state.blockArray.slice();

            // Use slice() to create temporary clone of divArray (array that has code for each div/block on
            // board) to work on
            let tempArray = this.state.divArray.slice();

            // Check if there is a mine under the block the user clicked on (if not, continue)
            if (!this.state.blockArray[index].mineStatus) {

                // If there is a number hint of "1" under the block, show the number "1"
                if (this.state.blockArray[index].numberHint === 1) {

                    this.isNumberHint1(index, newArray, tempArray);
                  
                } else {
                    
                    // Else if there is a number hint of "2" under the block, show the number hint
                    if (this.state.blockArray[index].numberHint === 2) {

                        this.isNumberHint2(index, newArray, tempArray);

                    // Else there are no number hints for this block, so just show blank space on board.
                    } else {

                        this.isEmptyBlock(index, newArray, tempArray); 

                    // End of if statement that decided what to do if there was a number 2 under the block or nothing
                    } 
                
                // End of outer if statement that decided if there was a number 1 under the block or else it starts the 
                // nested if statement that check if there is a number 2 or nothing under the block
                }
            
              // Else if there is a mine under the block, show the mine.
            } else {

                this.isMine(index, newArray, tempArray);

            // End of main if statement
            }
        
        /* Check if user has won the game, if so, change "won or lost message" to "You won the game!" (to be used by
        WonOrLost component) */
        this.hasWon();

        // end of if statement to block clicks if game has already been won or lost
        }
    
    // End of exposeBlock function
    }

    /* This function checks if the 2 arrays that are passed to it as parameters are equal (have all identical values).
    I learned this here:
    https://gomakethings.com/how-to-check-if-two-arrays-are-equal-with-vanilla-js/  */
    arraysEqual(array1, array2) {

        // Check each item and return "false" if even one item is not equal
        for (let i = 0; i < array2.length; i++) {
            if (array1[i] !== array2[i]) return false;
        }

        // Otherwise, return true
        return true;
    };

    /* Function to decide if user has won the game yet. Compares an array of the exposed blocks on the board (i.e. 
        those the user has clicked on to uncover) with a template of what a winning board would look like (i.e. 
        all blocks exposed, except for those 10 with mines under them). If both arrays are equal, the user has 
        won the game, so it changes the "won or lost message" value to "You Won! */
    hasWon() {

        // create shorter name for blockarray
        let blockArray = this.state.blockArray;

        // Create array with id's of the 10 mines on the board
        let arrayOfMines = [4, 9, 14, 19, 24, 29, 34, 39, 44, 49];

        // Create array of only the id's of the all items in blockArray (the array of objects that represents each 
        // block on the game board)
        let array = blockArray.map(item => 
                {return item.id}  
        );

        /* Learned to subtract one array from another here:
        https://stackoverflow.com/questions/45342155/how-to-subtract-one-array-from-another-element-wise-in-javascript */

        // Create array with only the id's of blocks that *do not* have mines hidden underneath them
        let winningArrayTemplate = array.filter(item => !arrayOfMines.includes(item));
    
        /* remove last element of array - learned about pop() here:
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop */
        winningArrayTemplate.pop();

        // Create array of blocks on the board that have been "exposed"/uncovered by user clicks in the current game
        let exposedBlocksArray = blockArray.filter((item) => 
                {return item.blockStatus === "exposed"}
            );
        
        // Refine the array so it only contains the id's of the blocks that have been exposed/uncovered
        let exposedBlockIdArray = exposedBlocksArray.map((item) => item.id);
        
        /* Use "arraysEqual" function to compare the array of exposed blocks to a template of what a winning array 
        of blocks should look like (i.e. all blocks exposed, except the 10 with mines under them). If they are 
        equal, return "true" */
        
        let result = false;
        result = this.arraysEqual(exposedBlockIdArray, winningArrayTemplate);

        console.log("result of comparison is: " + result);

        // If array of exposed blocks equals winning array template, change won or lost message to "You Won!"
        if (result === true) { 
            let msg = "You Won the Game!"; 

            this.setState(
                {wonOrLostMsg: msg}, 
                () => {console.log("Won or lost msg updated to: " + this.state.wonOrLostMsg);
                
            }); 
        } 

    }

    /* This function takes the index of the array item as an argument from the onClick event. It then uses that
     to update only the specific item the user clicked on with a flag. */
    placeFlag(index) {

        // Only allow clicks if game is still in play (has not already been won or lost)
        if (this.state.wonOrLostMsg === 0) {

            // use slice() to create temporary clone of blockArray to work on
            let newArray = this.state.blockArray.slice();

            // Set flag status of block that was right clicked on to "true"
            newArray[index].flagStatus = true;
            
            // Use slice() to create temp clone of divArray to work on
            let tempArray = this.state.divArray.slice();

            // Update cloned array at the index the user clicked on with flag image
            tempArray[index] = 
                <div className="block normalBlock" 
                    id={index} 
                    onClick={() => this.exposeBlock(index)} 
                    onContextMenu={(e) => {e.preventDefault(); this.placeFlag(index)}}>
                        <img className="flagImg" src={Flag} alt="red flag"/>
            </div>;
                
            /* Update divArray with cloned array and update blockArray with updated array. Looked at this website for
            help to use callback function with setState:
            https://stackoverflow.com/questions/42038590/when-to-use-react-setstate-callback  */
            this.setState(
                {blockArray: newArray, 
                divArray: tempArray}, 
                () => {console.log("divArray item index '" + index + "' updated with flag and blockArray updated.");
                this.getScore();
            }); 

        // End of if statement to block clicks if game has already been won or lost
        }

    // End of placeFlag function
    }   

    /* Function to create array that stores the values of each block on the board. For example, whether the block 
    has a mine under it, or a number hint or nothing at all. It takes an argument of the number of blocks on a side 
    (e.g. 9). It then multiplies that by iteself, so you have, for example, a board of 9 X 9 = 81 blocks. */
    createArray(side) {
        /* Had to add this if statement, as I was getting an error that said: 
        "Error: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate". Now it only creates the array once, not over and over. 

        This website helped me figure out the solution:
        https://stackoverflow.com/questions/50445512/react-native-invariant-violation-maximum-update-depth-exceeded
        */
        
        if (this.state.arrayCreated === false) {

            // Multiply argument of "side" by itself. So, for example, side of 9, results in board of 9 x 9 = 81 blocks
            let size = side * side;

            // Create empty array
            let array;

            // Make temporary clone of blockArray to work on
            array = this.state.blockArray.slice();

            // create empty object
            let object = {};

            /* For loop to populate each object (which represents a block on the board) with values such as whether it contains a
            mine, flag or number hint, then push each object to array of objects */
            for (let i = 1; i <= size; i++) {

                // Update numberHint to "1" for these blocks (i.e. add number hints)
                if (i === 0 || i === 1 || i === 3 || i === 6 || i === 11 || i === 12 || i === 16 || i === 21 
                    || i === 22 || i === 26 || i === 27 || i === 31 || i === 32 || i === 37 || i === 41 || 
                    i === 42 || i === 47 || i === 50 || i === 52 || i === 53 || i === 57 || i === 58 || i === 59) {
                    object = {id: i, blockStatus: "normal", mineStatus: false, flagStatus: false, numberHint: 1,
                    emptyBlockSection: 0};
                    array.push(object);

                // Update numberHint to "2" for these blocks (i.e. add number hints)  
                } else if (i === 5 || i === 10 || i === 13 || i === 15 || i === 18 || i === 20 || i === 23 ||
                    i === 25 || i === 28 || i === 30 || i === 33 || i === 35 || i === 38 || i === 40 || 
                    i === 43 || i === 48) {
                    object = {id: i, blockStatus: "normal", mineStatus: false, flagStatus: false, numberHint: 2,
                    emptyBlockSection: 0};
                    array.push(object);

                // else add mines and empty blocks     
                } else {

                    // Update mineStatus to true for these blocks (i.e. add 10 mines)
                    if (i === 4 || i === 9 || i === 14 || i === 19 || i === 24 || i === 29 || i === 34 || i === 39
                        || i === 44 || i === 49) {
                    
                        object = {id: i, blockStatus: "normal", mineStatus: true, flagStatus: false, numberHint: 0,
                        emptyBlockSection: 0};
                        array.push(object);

                    // Else if the blocks should not have mines or number hints, just create normal empty blocks
                    }  else {

                        // *if empty blocks are one of these 3, identify them as "emptyblocksection 1"
                        if (i === 7 || i === 8 || i === 17) {
                            object = {id: i, blockStatus: "normal", mineStatus: false, flagStatus: false, 
                            numberHint: 0, emptyBlockSection: 1};
                            array.push(object);
                            
                        // *Else make the rest of the empty blocks part of "emptyblocksection 2"
                        } else {
                            object = {id: i, blockStatus: "normal", mineStatus: false, flagStatus: false, 
                            numberHint: 0, emptyBlockSection: 2};
                            array.push(object);
                        }

                        // * emptyblocksection 1 and 2 were created so that when someone clicks on an empty block, the
                        // whole nearby section of empty blocks are exposed/uncovered. There are 2 such sections on this
                        // game board
                        
                    // End of if statement    
                    }

                // End of if statement
                }

            // End of for loop to add mines and number hints to each object in array of objects (each object represents
            // a block on the game board)
            } 

            // Create variable and assign value true. To be used to change value of "arrayCreated" state variable below.
            let state = true;

            // Create variable to update wonorlost message below
            let msg = 0;

            // Update state variables blockArray with objects, arrayCreated and sizeOfBoard variables 
            this.setState({
                blockArray: array, 
                arrayCreated: state, 
                sizeOfBoard: size,
                wonOrLostMsg: msg
            }, () => {
                console.log("createArray function has run.");
                
            }); 

        // end of if statement to see if blockArray is empty or not (so it doesn't repeat over and over)
        }
        
    // End of createArray function 
    }

    /* Function to take array values and create a div block for the game board with each value. Adds a unique id to each
    div and passes the index of each block to the "placeFlag" function to be used when the user clicks on a block. */
    displayBoard(side) {
        /* Call function to populate "blockArray" with status of each block (blockArray is an array of objects. Each object in the array represents on block on the game board) */
        
        if (this.state.divArray.length === 0 || this.state.divArray === null || this.state.wonOrLostMsg === "new") {
            // Use slice() to clone divArray to work on
            let tempArray = [];

            /* "side" was passed to this function when it was called and represents the number of blocks on each side of the game board. "size" is side x side. For example, 9 x 9 = 81 blocks on the board. */
            let size = side * side;
            
            // Create array with numbers 1 to "size"
            for (let j = 0; j <= size - 1; j++) {
                tempArray.push(j);
            }

            // Use map to iterate through each element in array and add the div for each block on the board to the "board"
            //array. Adds an "id" to each div as a key.
            let board = tempArray.map((element) => 
                /* Learned to prevent the windows context menu from opening when user right clicks a block to put a
                flag on it here:
                https://stackoverflow.com/questions/57432969/disable-firefoxs-right-click-context-menu-in-react  */
                <div className="block normalBlock" id={element} onClick={() => this.exposeBlock(element)} onContextMenu={(e) => {e.preventDefault(); this.placeFlag(element)}}>{element + 1}</div>

            );

            if (this.state.wonOrLostMsg === "new") {
                let msg = 0;
                this.setState({wonOrLostMsg: msg}, () => console.log("won or lost msg reset to 0"));
            }

            // Update divArray with the array of divs we just created
            this.setState({divArray: board}, () => {
                console.log("Displayboard function has run and divArray was updated");
                console.log("arrayCreated status is: " + this.state.arrayCreated);
                this.getScore();
            });

        // End of if statement to check if divArray is already populated
        }
        
    // End of displayBoard function
    }

    getScore() {
        
        // Declare variables
        let numArray = [0, 0];
        let blockArray = this.state.blockArray;
        let numberOfFlags = 0;
        let numberOfMines = 0;
        let size = this.state.sizeOfBoard;

        // For loop to count number of blocks with flags and number with mines. Increments a variable for each, which
        // is then stored in state variable and accessed by the Scoreboard component
        for (let i = 0; i <= size; i++) {

            // If it has a flag, increment "numberOfFlags"
            if (blockArray[i].flagStatus === true) {
                numberOfFlags++;
            }
            
            // If it has a mine, increment "numberOfMines"
            if (blockArray[i].mineStatus === true) {
                numberOfMines++;
            }
            
        // end of for loop
        } 

        /* Looked at the following site to confirm that I could update 2 variables with setState in one command:
        https://discuss.codecademy.com/t/can-this-setstate-change-multiple-properties-at-once/392713 
        
        Also uses a callback function for setState, to update array when done updating state variables. */
        this.setState({numOfFlags: numberOfFlags, numOfMines: numberOfMines}, () => {
            console.log("Status of numOfFlags and numOfMines updated");

            numArray[0] = this.state.numOfFlags;
            numArray[1] = this.state.numOfMines;

            this.setState({scoreArray: numArray}, () => console.log("scoreArray is: " + this.state.scoreArray));
        });
        
    }

    resetGame(blockArray, msg) {
        this.setState({
            wonOrLostMsg: msg, 
            blockArray: blockArray

        }, () => {
            console.log("Game reset.");
            this.displayBoard(9);
        });
    }

    reset(blockArray, msg) {
        let array = blockArray.slice();

        for (let i = 0; i <= 81; i++) {
            if (array[i].blockStatus === "exposed") {
                array[i].blockStatus = "normal";
            } 

            if (array[i].flagStatus === true) {
                array[i].flagStatus = false;
            } 

        } 

        this.setState({blockArray: array, 
            wonOrLostMsg: msg}, 
            () => {
            console.log("won or lost message is currently: " + this.state.wonOrLostMsg);
            this.displayBoard(9);
        })
        
    // End of reset function
    }

    render() {
        return (
            <div className="boardAndScore">
                
                <div className="gameBoard">
                    {/* Call function to create array of objects, each representing a block on the game board */}
                    {this.createArray(9)}
                    {this.displayBoard(9)}

                    {/* Call function to display blocks on the game board */}
                    {this.state.divArray}
                </div>
                
                <div className="scoreAndRestart">
                    {/* Call component "Scoreboard" to display score */}
                    {<Scoreboard 
                        score={this.state.scoreArray} 
                        resetGame={this.resetGame} />}

                    <Button variant="primary" 
                        className="restartButton" 
                        onClick={() => this.reset(this.state.blockArray, "new")}>
                            Restart game?
                    </Button>
                </div> 

                {<WonOrLost 
                    resetGame={this.resetGame} 
                    message={this.state.wonOrLostMsg} 
                    blockArray= {this.state.blockArray} 
                    arrayCreated = {this.state.arrayCreated} />}

            </div>

        // End of return
        );

    // End of render()
    }

// End of class component "Gameboard"
}

// Export component so it can be used by App.js
export default Gameboard;