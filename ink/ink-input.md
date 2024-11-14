# Use input in *ink*

Pixi’VN allows you to use in the ***ink* syntax** the possibility to use the [Input](/start/input.md).

The syntax is as follows:

`#` + `request` + `input` + `type of the value`

* `#` It is a special character used by ***ink* syntax** for add Special Commands.
* `request` It is the operation that you want to do with the input element. The available operations are `request`.
* `input` It is the type of the input element (is a string). If contains spaces, you must use double quotes.

The value will be saved in storage with the following system key `storage.keysSystem.CURRENT_INPUT_VALUE_MEMORY_KEY`, that is `_input_value_`. So you can access the value with `_input_value_`.

Example:

```ink
// this is used to avoid the ink error, because the variable is not defined
VAR _input_value_ = ""

=== start ===
My input value is: {_input_value_}
# request input
# request input number
# request input "array of string"
The input value is: {_input_value_}
-> DONE
```

::: sandbox {template=58gk4t entry=/src/ink_labels/start.ink}
:::
