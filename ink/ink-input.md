# Use input in *ink*

The ***ink* + Pixi’VN integration** introduces the a # script that allows you to request an [input](/start/input.md) from the user.

The syntax is as follows:

`#` + `[operation]` + `input` + `[parameters]`

Where:

* `#`: It is a special character used by ***ink* syntax** for use a special script.
* `[operation]`: It is the operation that you want to do with the input element. The available operations are:
  * `request`: Request an input element.
* `input`: It is the keyword that indicates that you want to request an input element.
* `[parameters]` (Optional): It is the parameters of the operation. The available parameters are:
  * `type` (Optional): It is the type of the value that you want to request. You can use any string of your choice. You can use this value to get more information about the type of value that is requested. If the string contains spaces, you must use double quotes.
  * `default` (Optional): It is the default value of the input element.

The value will be saved in storage with the following system key `storage.keysSystem.CURRENT_INPUT_VALUE_MEMORY_KEY`, that is `_input_value_`. So you can access the value with `_input_value_`.

Example:

```ink
// this is used to avoid the ink error, because the variable is not defined
VAR _input_value_ = ""

=== start ===
Hello
# request input type string
What is your name?
My name is { _input_value_ }
# request input type number default 18
How old are you?
I am { _input_value_ } years old
# request input type "html textarea"
Describe who you are:
{ _input_value_ }
Restart
-> DONE
```

::: sandbox {template=58gk4t entry=/src/ink_labels/start.ink}
:::
