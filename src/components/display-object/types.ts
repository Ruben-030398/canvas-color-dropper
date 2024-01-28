export type ViewProps = {
  x: number,
  y: number,
  width?: number,
  height?: number,
  interactive?: boolean
  form?: DisplayObjectForm
  scale?: Scale | number
}

export type Scale = { x: number, y: number }

export type DisplayObjectEvent = 'pointerdown' | 'pointerup' | 'pointerover' | 'pointermove'

export type DisplayObjectForm = 'rect' | 'circle'