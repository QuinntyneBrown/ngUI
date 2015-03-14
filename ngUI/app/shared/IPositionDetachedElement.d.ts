declare module app {
    
    interface IPositionDetachedElement {

        (triggerElement: HTMLElement,
        element: HTMLElement,
        directionPriorityList: string[],
        elementRect: ClientRect,
        alignment: string): void;

    }
}