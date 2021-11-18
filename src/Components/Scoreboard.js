import React from 'react';

// Import React bootstrap Button
import Button from "react-bootstrap/Button";

// Create function to display scoreboard
class Scoreboard extends React.Component {
    constructor(props) {
        super(props);

        // Define initial state variables
        this.state = {
            WonOrLostMsg: "new game",
            blockArray: [{
                id: 0,
                blockStatus: "normal",
                mineStatus: false,
                flagStatus: false,
                numberHint: 0
            }]
        }
    };

    reset(blockArray) {
        let array = blockArray.slice();

        for (let i = 0; i <= 81; i++) {
            if (array[i].blockStatus === "exposed") {
                array[i].blockStatus = "normal";
            } 

            if (array[i].flagStatus === true) {
                array[i].flagStatus = false;
            } 

        } 

        this.setState({blockArray: array}, () => {
            console.log("won or lost message is currently: " + this.state.WonOrLostMsg);

            // Call resetGame function in parent component (gameboard) with parameters
            this.props.resetGame(this.state.blockArray, this.state.WonOrLostMsg);
        })
        
    // End of reset function
    }

    render() {
        return (
            <div className="scoreAndRestart">
            <div className="scoreboard">
                <div className="innerBoard">
                    <h2>Info</h2>
                    <p>Flags: {this.props.score[0]}</p>
                    <p>Mines: {this.props.score[1]}</p>
                    <p>Game state: {this.props.gameState}</p>
                </div>
            </div>
                <Button variant="primary" 
                        className="restartButton" 
                        onClick={() => this.reset(this.props.blockArray, )}>
                            Restart game?
                </Button>
            </div>
        );
    }
}

// Export component so it can be used by App.js
export default Scoreboard;