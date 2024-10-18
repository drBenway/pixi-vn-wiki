# Other narrative features

## Randomize number

Pixi’VN has a built-in function to generate a random number. To generate a random number, use the `narration.getRandomNumber()`. This function takes the following parameters:

* `min`: The minimum value of the random number.
* `max`: The maximum value of the random number.
* `options`:
  * `onceonly`: If true, the number will be generated only once on the current step of the label (default: false). Attention: `min` and `max`affect the storage of already generated numbers.
