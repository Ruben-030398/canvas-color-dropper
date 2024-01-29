export type ViewProps = {
  x: number,
  y: number,
  width?: number,
  height?: number,
  interactive?: boolean
  form?: DisplayObjectForm
  scale?: Scale | number
  renderable?: boolean 
}

export type Scale = { x: number, y: number }

export type DisplayObjectEvent = 'pointerdown' 
  | 'pointerup' 
  | 'pointermove' 
  | 'pointerout'

export type DisplayObjectForm = 'rect' | 'circle'