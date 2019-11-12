import * as THREE from "../lib/three.module.js";

const x_axis = new THREE.Vector3(1, 0, 0)
const y_axis = new THREE.Vector3(0, 1, 0)
const z_axis = new THREE.Vector3(0, 0, 1)
const nx_axis = new THREE.Vector3(-1, 0, 0)
const ny_axis = new THREE.Vector3(0, -1, 0)
const nz_axis = new THREE.Vector3(0, 0, -1)
const PI = Math.PI
const PI2 = Math.PI * 2
// const ref_axis= z_axis.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), (Math.PI / 180) * -101)

function getSpherePositionFromUv(u, v, radius = 1) {
  let position = new THREE.Vector3(0, -radius, 0)
  position.applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI * v)
  position.applyAxisAngle(new THREE.Vector3(0, 1, 0), (Math.PI / 180) * -101 + Math.PI * 2 * u)
  return position
};

window.getUvFromSpherePosition = getUvFromSpherePosition //todo
function getUvFromSpherePosition(position_in) {
  const position = position_in.clone()

  const xz_part = new THREE.Vector3(position.x, 0, position.z)
  let angle_y = xz_part.angleTo(z_axis)
  if (position.x < 0) angle_y = PI2 - angle_y
  let u = angle_y / PI2

  position.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle_y)
  // const yz_part = new THREE.Vector3(0, position.y, position.z)
  const angle_x = position.angleTo(ny_axis)
  let v = angle_x / PI
  // if (position.z < 0) v = 1 - v
  // u = u - 101 / 360
  // if (u < 0) u = 1 + u
  u = u - .2185
  if (u < 0) {
    u = 1 + u
  }
  const uv = new THREE.Vector2(u, v)
  return uv
}

/*//todo
  getUvFromSpherePosition(new THREE.Vector3(1,0,0))
  three.module.js?b6b2:2174 THREE.Vector3: angleTo() can't handle zero length vectors.
*/


export { getSpherePositionFromUv, getUvFromSpherePosition }

/*//console test
  getUvFromSpherePosition(new THREE.Vector3(1,0,1))
    expect {x: 0.125, y: 0.5}
  getUvFromSpherePosition(new THREE.Vector3(-1,0,1))
    expect {x: 0.875, y: 0.5}
  getUvFromSpherePosition(new THREE.Vector3(-1,0,-1))
    expect {x: 0.625, y: 0.5}
*/
