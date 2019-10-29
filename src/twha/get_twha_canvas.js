import { Map } from './js/Map.js'

const map = window.map = new Map()

function get_twha_canvas() {
  const canvas = map.get_canvas()
  return canvas
}

function update_twha_canvas(year = 0) {
  map.draw_all(year)
}

export { get_twha_canvas, update_twha_canvas }
