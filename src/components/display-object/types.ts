export type ViewProps = {
  x: number,
  y: number,
  width?: number,
  height?: number, 
  interactive?: boolean
  form?: DisplayObjectForm
} 

export type DisplayObjectEvent = 'pointerdown' | 'pointerup' | 'pointerover' | 'pointermove'

export type DisplayObjectForm = 'rect' | 'circle'