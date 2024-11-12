# Use input in *ink*

Pixi’VN included in ***ink* syntax** the possibility to use the [Input](/start/input.md).

The syntax is as follows:

`#` + `request` + `input` + `type of the value`

* `#` It is a special character used by ***ink* syntax** for add Special Commands.
* `request` It is the operation that you want to do with the input element. The available operations are `request`.
* `input` It is the type of the input element (is a string). If contains spaces, you must use double quotes.

Example:

```ink
request input
request input number
request input 'array of string'
```
