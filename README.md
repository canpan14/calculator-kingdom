# Calculator Kingdom

Link to website: https://canpan14.github.io/calculator-kingdom/

Link to frontend repo: https://github.com/canpan14/calculator-kingdom

Link to backend repo: https://github.com/canpan14/calculator-kingdom-api

Link to backend deploy site: https://calculator-kingdom-api.herokuapp.com/

## What is RPS the RPG?
Calculator Kingdom is a base concept card game based off of one of my favorite mobile games Calculords. Is this game the player constructs decks, and heads off to battle computer opponents using a calculator and their math skills to put troops into battle to try and defend their kingdom.

## Gameplay and Features
- Each user is able to create multiple armies (decks) with various troop types
- Armies can be managed and altered independently from the barracks
- Users can also enter battles without a built/completed army and the game will created or fill the army for them
- Enemies play at random leading to every match being different (it's a feature)
- A help page is provided to teach the player the base mechanics of the game and how damage calculations are done

## Technologies Used
Frontend
- HMTL
- Javascript
- SASS, CSS
- bootstrap 4
- bootstrap-notify

Backend
- Ruby
- Rails
- Heroku
- Postgres

## Plans for Future Iterations
### Spells
If this wasn't just a fun little POC it would have been the next thing to do. Right now it's a simple stack check game which isn't very compelling since the best move is to always play all your cards. Spells would add that extra dynamic spice that would lead to players wanting to save them and wait until the right time.

### Special Abilities
Units should really have special abilities, not just power/armor. Like spells, it makes the game a lot more interesting and thought provoking.

### Difficulty Levels
This actually would be fairly easy to do as the code is set up to do it. Just have a slider/option menu before starting a match that would choose how fast/aggressively the computer plays cards. Right now it's fairly easy on purpose.

### Missions
Every good player/ai game has progressive missions to fight different/harder enemies. Helps bring together the game as an actually experience rather than a fun toy.

### Animations
Animations are what draw people into the game just from a glace. Some great games go unnoticed because the art/animations were subpar so people didn't give them a second look. Makes every action feel more important and impactful.

### Number of Each Type of Troop in an Army
Currently the player just decides what type of troops are in the army and not how many. Obviously in and good deck building that's a little odd. In the future I would make code changes and changes to the deck/management page to allow for the player to control exactly how many of each troop is in a given army.

### Numbers Deck
As well as a deck for what troops the player has, the player could also make a deck to control which numbers show up in their calculators. Allows for more fine tuning.

## Front End Development Process
Unlike past projects the majority of the time was spent developing the calculator/playing card ability before anything else in the project was done.

I didn't consider the project to be a viable option until I completed a working prototype and knew it was something I could work with going forward.

After that was built I creating all the authentication pages and the deck management page.

The deck management page took a while because I had to figure out how to building something workable in a short amount of time that could work as a simple deck manangement tool. I ended up using a two sided select list where items can be moved to the left and right (in/out of the deck). If I did this again I'd do a different UI that is better suited for a deck builder.

After that was completed a built a help page with some simple information about the game. I'd like to have pictures to go along with it in the future.

I'm not too happy with the front end for the reason that it could be coded a lot cleaner. I really just wanted to make a game using the calculator game mechanic but outside of that many improvements could be made across the whole code base.

I am proud of how I managed the html and each individual 'page/view'. I was very good about using handlebars and keeping the DOM clean.

## Back End Development Process
The backend was very simple for this project. I created a deck table for all the players decks and a cards table to hold the possible cards in the game to start.

At fisrt the deck table had an array of ids that represented which cards where in it but after talked with Chris (teacher) it became clear that a join table holding the relationship between decks and cards was a better idea. After that was created and some rewritting of code on the front end, it made life a lot easier in keeping track of what cards decks had.

## Problem Solving Strategy
My problem solving strategy is fairly simple.
If something is clearly breaking:
- Locate area of code where the break is happening
  - Using console logs to find where they stop printing what is expected
  - Read the stack trace for the exact line (not always possible)

If data isn't displaying as expected:
- Use console logs to chain back print statements until I see where the data differs from what's expected at that point
- If it's a race condition or something with asynchronous behaviour, check the chaining logic or make sure all API calls and the code that follows are wrapped in promises/thens.

If the UI is broken in some way:
- Open the inspector and start messing around with display values
- Look up examples of people doing similar things and see what CSS values they were using or bootstrap code.
- If things start to get complicated, revert to a simpler form, take a break from it, and start looking at it fresh later.

## Wireframes
They are from the initial thought of the app: https://imgur.com/a/39H38

## User Stories
- User can create an account and login
- User can create decks
- User can play against an ai opponent using their deck
- User can player against an ai oppoent using a random deck
- User can delete decks

## ERD Diagram
ERD: https://i.imgur.com/OCCxtMe.png
