# History

Pixi’VN save all dialogues, choices and responses that have been displayed in the game and all label and step opened.

## Check if the label has already been completed

To check if a label has already been completed, you can use the `narration.isLabelAlreadyCompleted` function.

The function takes the following parameters:

* `label`: The [label](/start/labels) to check if it is already completed.

```typescript
const isLabelCompleted = narration.isLabelAlreadyCompleted(startLabel)
const isLabelCompleted = narration.isLabelAlreadyCompleted("labelid")
```

## Get already been made choices of current step

To get the already been made choices of the current step, you can use the `narration.alreadyCurrentStepMadeChoices`.

```typescript
const choices = narration.alreadyCurrentStepMadeChoices
```

## Check if current step is already been opened

To check if the current step is already been opened, you can use the `narration.isCurrentStepAlreadyOpened`.

```typescript
const isCurrentStepOpened = narration.isCurrentStepAlreadyOpened;
```

## Counter of execution times of the current step

To get the counter of execution times of the current step, you can use the `narration.currentStepTimesCounter`. **Important**: The counter will be incremented only if `narration.currentStepTimesCounter` is called at least once in a step.

```typescript
export const label = newLabel("id",
    () => {
        if (narration.currentStepTimesCounter === 0) { // ✅ will be incremented
            // ...
        } else {
            // ...
        }
    }
)
```

```typescript
export const label = newLabel("id",
    () => {
        if (narration.currentStepTimesCounter === 0) { // ✅ will be incremented
            // ...
        } else if (narration.currentStepTimesCounter === 1) { // ✅ It will not be incremented, because it has already been incremented in this step
            // ...
        }
    }
)
```

```typescript
export const label = newLabel("id",
    () => {
        if (flag) {
            if (narration.currentStepTimesCounter === 1) { // ❌ It will be incremented only if "flag" is true
                // ...
            }
        }
    }
)
```

To restart the counter of execution times of the current step, you can use the `narration.currentStepTimesCounter = 0`.

```typescript
narration.currentStepTimesCounter = 0;
```

## Get Narrative History

The Narration timeline of the game is a list of all dialogues that have been displayed. It is useful to show the history of dialogues and choices to the player.

To get the narrative history of the game, you can use the `narration.narrativeHistory`. It returns a list of `NarrativeHistory<T>[]`.

```typescript
const dialogues: NarrativeHistory<Dialogue>[] = narration.narrativeHistory;
```

## Delete Narrative History

To delete all the narrative history, use the `narration.removeNarrativeHistory`.

```typescript
narration.removeNarrativeHistory();
```

To delete a part of the narrative history, use the `narration.removeNarrativeHistory`.

```typescript
// delete the first 2 elements
narration.removeNarrativeHistory(2);
```

## Example

```tsx
export default function History() {
    const [searchString, setSearchString] = useState("")

    return (
        <Box
            sx={{
                display: 'flex',
                flex: 1,
                minHeight: 0,
                px: 2,
                py: 3,
                overflowY: 'scroll',
                flexDirection: 'column-reverse',
            }}
        >
            <Stack spacing={2} justifyContent="flex-end">
                {narration.narrativeHistory
                    .map((step) => {
                        let character = step.dialoge?.character ? getCharacterById(step.dialoge?.character) ?? new CharacterBaseModel(step.dialoge?.character, { name: step.dialoge?.character }) : undefined
                        return {
                            character: character?.name ? character.name + (character.surname ? " " + character.surname : "") : undefined,
                            text: step.dialoge?.text || "",
                            icon: character?.icon,
                            choices: step.choices,
                        }
                    })
                    .filter((data) => {
                        if (!searchString) return true
                        return data.character?.toLowerCase().includes(searchString.toLowerCase()) || data.text?.toLowerCase().includes(searchString.toLowerCase())
                    })
                    .map((data, index) => {
                        return <React.Fragment key={"history" + index}>
                            <Stack
                                direction="row"
                                spacing={1.5}
                            >
                                <Avatar
                                    size="sm"
                                    src={data.icon}
                                />
                                <Box sx={{ flex: 1 }}>
                                    {data.character && <Typography level="title-sm">{data.character}</Typography>}
                                    <Markdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeRaw]}
                                        components={{
                                            p: ({ children, key }) => {
                                                return <p key={key} style={{ margin: 0 }}>{children}</p>
                                            },
                                        }}
                                    >
                                        {data.text}
                                    </Markdown>
                                </Box>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={0.5}
                            >
                                <Box sx={{ flex: 1 }}>
                                    {data.choices && data.choices.map((choice, index) => {
                                        if (choice.isResponse) {
                                            return <Chip
                                                key={"choices-success" + index}
                                                color="success"
                                                endDecorator={<CheckIcon />}
                                            >
                                                {choice.text}
                                            </Chip>
                                        }
                                        return <Chip
                                            key={"choices" + index}
                                            color="primary"
                                        >
                                            {choice.text}
                                        </Chip>
                                    })}
                                </Box>
                            </Stack>
                        </React.Fragment>
                    })}
            </Stack>
        </Box>
    );
}
```
