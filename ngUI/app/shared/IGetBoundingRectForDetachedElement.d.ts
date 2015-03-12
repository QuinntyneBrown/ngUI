declare module app {
    
    interface IGetBoundingRectForDetachedElement {
        (htmlElement: HTMLElement) : ClientRect;
    }
} 