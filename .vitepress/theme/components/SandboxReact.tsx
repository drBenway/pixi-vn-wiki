import React from 'react'

export default function SandboxReact({ template }: { template: string }) {
    return (
        <iframe
            // src="https://codesandbox.io/embed/framer-motion-animatepresence-wait-mode-t0mnhu?fontsize=14&hidenavigation=1&theme=dark&view=preview&codemirror=1&hidedevtools=1"
            src={`https://codesandbox.io/embed/${template}?fontsize=14&hidenavigation=1&theme=dark&view=preview&codemirror=1&hidedevtools=1`}
            style={{
                width: '100%',
                height: '500px',
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
