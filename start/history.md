# History

Pixi’VN save all dialogues, choices and responses that have been displayed in the game and all label and step opened.

## Check if the label is already completed

To check if a label is already completed, use the `GameStepManager.isLabelAlreadyCompleted`.

```typescript
const isLabelCompleted = GameStepManager.isLabelAlreadyCompleted("labelid");
const isLabelCompleted = GameStepManager.isLabelAlreadyCompleted(startLabel);
```

## Get already made choices of current step

To get the already made choices of the current step, use the `GameStepManager.getAlreadyCurrentStepMadeChoices`.

```typescript
const choices = GameStepManager.getAlreadyCurrentStepMadeChoices();
```

## Check if current step is already opened

To check if the current step is already opened, use the `GameStepManager.isCurrentStepAlreadyOpened`.

```typescript
const isCurrentStepOpened = GameStepManager.isCurrentStepAlreadyOpened();
```

## Get Narrative History

The Narration timeline of the game is a list of all dialogues that have been displayed. It is useful to know what has been said and to display it in the game.

To get the history of dialogues, choices and responses for every [game steps](/start/labels), use the `GameStepManager.getNarrativeHistory`. The return is a `NarrativeHistory<T>[]`.

```typescript
const dialogues: NarrativeHistory<DialogueBaseModel>[] = GameStepManager.getNarrativeHistory<DialogueBaseModel>();
```

If you use the [Extended DialogueModel](/start/dialogue.md#extend-dialoguebasemodel), you can get the history of dialogues and cast to the extended class.

```typescript
const dialogues: NarrativeHistory<DialogueModel>[] = GameStepManager.getNarrativeHistory<DialogueModel>();
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
                {GameStepManager.getNarrativeHistory()
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

## Delete Narrative History

To delete all the narrative history, use the `GameStepManager.removeNarrativeHistory`.

```typescript
GameStepManager.removeNarrativeHistory();
```

To delete a part of the narrative history, use the `GameStepManager.removeNarrativeHistory`.

```typescript
// delete the first 2 elements
GameStepManager.removeNarrativeHistory(2);
```
