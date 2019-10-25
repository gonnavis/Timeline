import { Map } from './js/Map.js'
import { data } from './js/data.js'

const map = new Map()

function get_twha_canvas() {
  map.update()
  draw_all()
}

function draw_all() {
  for (let x = 0; x < data.tile_x_count; x++) {
    for (let y = 0; y < data.tile_y_count; y++) {
      map.getMapTertPart(x, y)
    }
  }
}

export default get_twha_canvas
