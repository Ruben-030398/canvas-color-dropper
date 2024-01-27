declare module '*module.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}
declare module '*.png'

declare module '*.sass' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}