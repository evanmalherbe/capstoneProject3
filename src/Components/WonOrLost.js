import React from 'react';

// Import react bootstrap button
import Button from "react-bootstrap/Button";

// Create class to display the "Game over!" or "You Won the Game!" message to user
class WonOrLost extends React.Component {
    constructor(props) {
        super(props);

        // Define initial state variables
        this.state = {
            WonOrLostMsg: "new",
            arrayCreated: false,
            blockArray: [{
                id: 0,
                blockStatus: "normal",
                mineStatus: false,
                flagStatus: false,
                numberHint: 0
            }]
        }

        // Binding to ensure that "this" works
        this.messageExists = this.messageExists.bind(this);
        this.reset = this.reset.bind(this);
        this.restartButton = this.restartButton.bind(this);
        this.displayOrNot = this.displayOrNot.bind(this);

    }

    messageExists(message) {
        /* Check if game has been won or lost yet. If not, do nothing. If so, display appropriate message (You won! or Game over) */
        if (message !== 0 && message!== "new") {
            if (message === "Game Over!") {
                return <h1 className="lost">{message}</h1>  
            } else {
                return <h1 className="won">{message}</h1>  
            }
        }
    }

    /* This video helped me to finally grasp how to pass data from a child component to a parent component using
    functions: 
    https://www.youtube.com/watch?v=5Xew--ycx0o&ab_channel=Academind */
    reset(blockArray) {

        // Create temp clone of main blockArray
        let array = blockArray.slice();

        // Reset values to default 
        for (let i = 0; i <= 81; i++) {
            if (array[i].blockStatus === "exposed") {
                array[i].blockStatus = "normal";
            } 

            if (array[i].flagStatus === true) {
                array[i].flagStatus = false;
            } 

        } 

        // Set value of blockArray in state to default values
        this.setState({blockArray: array}, () => {
            console.log("won or lost message is currently: " + this.state.WonOrLostMsg);

            // Call resetGame function in parent component (gameboard) with parameters
            this.props.resetGame(this.state.blockArray, this.state.WonOrLostMsg);
        })
        
    // End of reset function
    }

    // Function to display restart game button. Only visible if game has been won or lost (hence "message" variable would
    // be different)
    restartButton(message) {
        if (message !== 0 && message!== "new") {
            return <Button variant="primary" className="restartButton" onClick={() => this.reset(this.props.blockArray)}>Restart game?</Button>
        }
    } 
    
    // Function to decide whether to display the "Game over" or "You won" message to user
    displayOrNot (message) {
        if (message !== 0 && message!== "new") {
            return <div className="wonOrLost">
                {/* Call functions to find out if game has been won or lost yet and to display button */}
                {this.messageExists(message)}
                {this.restartButton(message)}
            </div>;
        }
    
    }

    render() {
        return (
            <div>
                {this.displayOrNot(this.props.message)}
            </div>
        );
    }
}

// Export component so it can be used by App.js
export default WonOrLost;