import React from 'react'

export default function SandboxReact({ template, previewHeight = 400, ...rest }: {
    template: string,
    previewHeight?: number,
    entry?: string
}) {
    const entry = rest.entry ? "module=" + rest.entry + "&" : ''
    return (
        <iframe
            // src="https://codesandbox.io/embed/framer-motion-animatepresence-wait-mode-t0mnhu?fontsize=14&hidenavigation=1&theme=dark&view=preview&codemirror=1&hidedevtools=1"
            src={`https://codesandbox.io/embed/${template}?${entry}fontsize=14&hidenavigation=1&theme=dark&view=preview&codemirror=1&hidedevtools=1`}
            style={{
                width: '100%',
                height: `${previewHeight}px`,
                border: 0,
                borderRadius: '4px',
                overflow: 'hidden',
            }}
            title="drincs/pixi-vn"
            allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
            sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
        />
    )
}
