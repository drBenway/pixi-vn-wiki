# Label and Game Step

Visual Novels are usually a succession of screenshots with images and text.

In Pixi'VN, you can manage this succession of screens with the "steps". The steps they are functions that are executed every time the `next()` function is called. In these functions you can add images, dialogues etc...

While labels are containers of steps, they are used to organize the steps in a more readable way.

Basically the idea of the life cycle of the game is which is started at the beginning a label and is executed the first step of the label. After that, connecting the function `next()` to a event (like a button click), every time the function is called, the next step of the label is executed.
Some steps could start other labels. The game will end only when all the steps are completed.
