import React from 'react';

// Import images
import Flag from '../redFlag.png';
import MineImg from '../mineImg.png';
import Number1 from '../number1.png';
import Number2 from '../number2.png';
import HelpImg1 from '../helpImg1.png';
import HelpImg2 from '../helpImg2.png';

// Create function to display Help information (rules of the game etc)
function Help() {
    return (

        // Main container div
        <div id="top" className="helpDiv">
            <h1>Minesweeper Help</h1>
            <h2>Introduction</h2>
            <p>Minesweeper is an enjoyable game that forces the player to really use their thinking skills to win. The board of blocks may look safe enough, but concealed beneath some of the blocks are dangerous mines that are rigged to explode! It's your job to guess where they are and carefully mark them with red flags, so that nobody sets them off by accident. Luckily, there are hints to assist you along the way, but that's not to 
            say it's going to be easy!
            </p>

            {/* Div to put heading and img next to eachother using flexbox */}
            <div className="headingAndImg">
                <h2>Rules of the Game</h2>
                <img src={MineImg} alt="mine / bomb" />
            </div>
            <p>When you start the game, take a moment to glance at the "Scoreboard" on the right side of the page. 
                There you will see the number of mines that are concealed under blocks for the game you are about
                to play. Obviously, the more mines, the greater the difficulty of the game, since your chances
                of accidentally setting one off increases. 
            </p>
            
            <p>To begin playing, simply click on any one of the blocks on the board and "hope" that you aren't 
                unlucky enough to land on a mine with your first click! If there is nothing under the block, 
                choose a second block to uncover and so on. Pretty soon, you will see that the game board opens
                up to reveal empty blocks and you will start to see the "number hints".
            </p>

            <div className="headingAndImg">
                <h3>Number Hints</h3>
                <img className="numbers" src={Number1} alt="number 1"/>
                <img className="numbers" src={Number2} alt="number 2"/>
            </div>

            {/* Div to put paragraph and image next to eachother using flexbox */}
            <div className="paraAndImg">
                <p className="para">
                    Number hints, as the name suggests, are there to guide you or "hint" at where the nearest mines 
                    are. If you see a number "1", that means that that particular block is being bordered or "touched"
                    by one mine. However, what makes things tricky, is that it could be touching any of the 4 sides
                    of the block OR even on of the 4 points of the block. This means that there are 8 possible places 
                    where the mine is touching the block.
                </p>
                <img className="helpImg1" src={HelpImg1} alt="numbers on game board" />
            </div>

            <br />
            <p>The meaning of the other number hints (2, 3, 4 etc) is similar. If you see a "2", that means that
                that particular block is being touched by 2 mines, 3 means 3 mines and so on. 
            </p>

            <div className="headingAndImg">
                <h3>Red Flags</h3>
                <img className="flag" src={Flag} alt="red flag"/>
            </div>

            <div className="paraAndImg">
                <p className="para">When you have a strong feeling that you know which block has a mine hiding under it, because of the 
                    number hints you have seen, right click on that block with your mouse to SAFELY put a red flag on
                    that block. That way, you will know exactly where the mine is so you can avoid triggering it.
                </p>
                <img className="helpImg2" src={HelpImg2} alt="flag on game board"/>
            </div>

            <h3>Winning or losing</h3>
            <p><b>Losing</b> - It goes without saying that if you click on any of the blocks with a mine lurking underneath them, your game is LOST ("Game Over!"). But nevermind, you can always click the "Restart 
            Game" button to have another turn.

                <br/> <br/>
                
                <b>Winning</b> - To win the game, you need to correctly mark all the blocks with mines under them with 
                red flags (remember to check how many mines are hiding under the blocks by looking at the 
                Scoreboard) and click to uncover/expose all the other blocks on the board (whether they have 
                number hints underneath them or nothing at all). When you meet those criteria, you will get a 
                satisfying (and well deserved!) "You Won the Game!" message on your screen.
            </p>

            {/* Link to take user back to top of this page */}
            <a href="#top" >Back to the top</a>
        </div>
    )
}

// Export component so it can be used by App.js
export default Help;