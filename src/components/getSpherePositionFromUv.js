var getSpherePositionFromUv = function(u, v, radius = 1) {
  let position = new THREE.Vector3(0, -radius, 0)
  position.applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI * v)
  position.applyAxisAngle(new THREE.Vector3(0, 1, 0), (Math.PI / 180)*-101 + Math.PI * 2 * u)
  return position
};


export { getSpherePositionFromUv }
