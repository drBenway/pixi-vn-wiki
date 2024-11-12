import React from 'react'
import { createPortal } from 'react-dom'
import { createRoot } from 'react-dom/client'


export function createReactApp(children: React.ReactNode) {
    const root = createRoot(document.createElement('div'))
    root.render(children)
}


export function createPortalNode<TProps>(component: React.FC<TProps>, targetElement: Element, props: any) {
    if (!targetElement) {
        console.warn('Target DOM node is not specified for Portal')
        return null
    }

    return createPortal((React as any).createElement(component, props), targetElement)
}
