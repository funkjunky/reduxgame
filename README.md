# Redux Game
## An expirement of going deep with redux in game development

### Game

Asteroids, except everything can kill you, also there is friction and terminal velocity.

### Demo

https://funkjunky.github.io/reduxgame/

### Intro

I wanted to see how effective Redux was for game development.
Looking online the most intensive use I could find of Redux would stop at the draw and update commands.
Essentially people would use redux for a basic high level global store, while ignoring most of the reducing power.

### Progression:

My first iteration Involved me using redux for handling:
 - an input state
 - entities states with flat physics states.
    - in the entities reducer I would pass acceleration to velocity, and velocity to position.
    - to do the derivitives I would call an action for each one.
 - draw and update were handled by window.setInterval

My second and thorough iteration went for what i think was a more pure and correct approach to using redux for everything:
 - Scrapped the input state. event listeners called actions to update state, and there is an action for key up and key down.
 - entities states had hierarchical physics.
    - it looked like this: { acceleration: {x, y, _velocity: {x, y, _position: {x, y} } } }
    - naturally the acceleration reducers passed the velocity reducer it's state, and velocity passed itsself to the position reducer.
        - this was much more sane than grabbing and passing these values in the entities reducer. Much better encapsulation.
    - I added property getters and setters to make accessing position and velocity easier.
        - these accessors did not play nicely with combineReducers... I was forced to create no-op reducers and no-op setters to work around the issue.
 - added a middleware for a tick action for updating
 - added a middleware for raf, which would pass the store's state to draw.
 - separated actions and constants and cleaned up the structure a lot
 - added a few tests as proof of concept.

### Conclusion:

 - having an action fired every tick is too much noise when debugging.
 - reducer physics is unnecessarily complicated. Physics rarely need to be gauranteed, so I think redux is overkill.
 - Redux is just so sane and reasonable, it's worth further investigation.

### Suggestion:

 - use Redux for all discrete actions, but store the game's state outside of redux.
 - use middleware to update the outside store every action.
 - physics and constantly changing things like entity movement and rotation should be handled outside redux
 - easy to quantify actions like creating a new entity, or leveling up, or doing a special attack.
    - also game state: ie. new level, level transition, map transition, score, resources. 
