# HyperionDev Full Stack Web Development Bootcamp - React task - Level 2 - Task 12 - Capstone project = Minesweeper game

## Description
This task is my recreation of the traditional "Minesweeper" computer game using React.

## Table of Contents
* [Instructions](#instructions)
* [Technologies](#technologies)
* [Installation](#installation)
* [Usage and Rules of Game](#usage)
* [Credits](#credits) 

## Instructions
These were the instructions I was given to guide me in creating this game.

For this Capstone Project, you will be tasked to create a simple game using React. To be able to successfully do this, you will need to consolidate all the concepts you have learned about React, JSX and JavaScript so far.

Create a React app that allows users to play Minesweeper. Minesweeper is a simple game where a user clicks on tiles to reveal whether there is a “mine” behind the tile or not. If a tile that hides a “mine” is clicked, the user loses and the game is over. If you are not familiar with Minesweeper, try it out here.

It is not compulsory that you create a Minesweeper game. Feel free to create another game (such as Suduko, Mahong, a memory game etc) of your choice. Tic-tac-toe is not a suitable choice!

Any game that you create should meet the following criteria:
1. It should be created using Create React App.
2. It should include attractively styled components (at least 4 different types of components) that respond to user interaction. Feel free to use React-Bootstrap or another library and/or your own custom stylesheets.
3. A number of components should be rendered using the array.Map() method. Each component rendered in this way should have a key that uniquely identifies it (see Task: React II).
4. User interaction should modify the state of some components.
5. The state of two or more components should be synced.
6. The user should be able to restart the game.
7. The user should be clearly informed if they have “won” or “lost” the game.
8. The user should easily be able to request “help” that will inform the user about the rules of the game from the UI.
9. The UI should be attractive, easy to use and intuitive.
10. It should include a file called “readMe.md” which explains the rules of the game. This file should also provide clear instructions that an end user will be able to follow to be able to install and run your app on their local machine.
11. Your mentor should be able to launch your app by typing ‘npm start’ from the command line interface.
12. The file structure of the project should be well organized in line with guidelines here.
13. Your code should be well documented with appropriate comments. The code should also be easy to read adhering to Google’s style guide about indentation, meaningful variable and component names etc.

### Technologies
This project uses:
* HTML 5 
* CSS 3
* Javascript ECMAScript 2021
* React
* React Bootstrap

## Installation
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To run this project, do the following:
1. Copy the directory called 'minesweeper' to your local machine.
2. Navigate to this directory from the command line interface. E.g. cd c:/example.
3. In the command line interface type 'npm install'
4. Once it has finished installing, type 'npm start'. Runs the app in the development mode.
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage 
To play this game, first click on the dropdown menu at the top of the page and select the "Play Game" option (or check out the Help page if you would like to). Then follow these rules to play:

### Rules of Game
 
Minesweeper is an enjoyable game that forces the player to really use their thinking skills to win. The board of blocks may look safe enough, but concealed beneath some of the blocks are dangerous mines that are rigged to explode! It's your job to guess where they are and carefully mark them with red flags, so that nobody sets them off by accident. Luckily, there are hints to assist you along the way, but that's not to say it's going to be easy!

When you start the game, take a moment to glance at the "Scoreboard" on the right side of the page. There you will see the number of mines that are concealed under blocks for the game you are about to play. Obviously, the more mines, the greater the difficulty of the game, since your chances of accidentally setting one off increases.

To begin playing, simply click on any one of the blocks on the board and "hope" that you aren't unlucky enough to land on a mine with your first click! If there is nothing under the block, choose a second block to uncover and so on. Pretty soon, you will see that the game board opens up to reveal empty blocks and you will start to see the "number hints".

### Number Hints
Number hints, as the name suggests, are there to guide you or "hint" at where the nearest mines are. If you see a number "1", that means that that particular block is being bordered or "touched" by one mine. However, what makes things tricky, is that it could be touching any of the 4 sides of the block OR even on of the 4 points of the block. This means that there are 8 possible places where the mine is touching the block.
            
The meaning of the other number hints (2, 3, 4 etc) is similar. If you see a "2", that means that that particular block is being touched by 2 mines, 3 means 3 mines and so on. 

### Red Flags
When you have a strong feeling that you know which block has a mine hiding under it, because of the number hints you have seen, right click on that block with your mouse to SAFELY put a red flag on that block. That way, you will know exactly where the mine is so you can avoid triggering it.

### Winning or losing
**Losing** - It goes without saying that if you click on the block with a mine lurking underneath, your game is LOST! But nevermind, you can always click the "Restart Game" button to have another turn.

**Winning** - To win the game, you need to correctly mark all the blocks with mines under them with red flags (remember to check how many mines are hiding under the blocks by looking at the Scoreboard) and click to uncover/expose all the other blocks on the board (whether they have number hints underneath them or nothing at all). When you meet those criteria, you will get a satisfying (and well deserved!) "You Won the Game!" message on your screen.

## Credits
This project was created by Evan Malherbe as part of a task for HyperioDev Full Stack Development Bootcamp November 2021 [GitHub profile](https://github.com/evanmalherbe) 