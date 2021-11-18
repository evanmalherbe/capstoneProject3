import React from 'react';

// Create function to display scoreboard
function Scoreboard(props) {
    return (
        <div className="scoreboard">
            <div className="innerBoard">
                <h2>Info</h2>
                <p>Flags: {props.score[0]}</p>
                <p>Mines: {props.score[1]}</p>
            </div>
        </div>
    );
}

// Export component so it can be used by App.js
export default Scoreboard;