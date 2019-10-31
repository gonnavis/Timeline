// Recursively traverse through the model.
function traversePolygonsForGeometries(node, uvx, uvy) {
  if (node.geometry) {
    // Return a list of triangles that have the point within them.
    // The returned objects will have the x,y,z barycentric coordinates of the point inside the respective triangle
    var baryData = annotationTest(uvx, uvy, node.geometry.faceVertexUvs);
    if (baryData.length) {
      for (var j = 0; j < baryData.length; j++) {
        // In my case I only want to return materials with certain names.
        // if (node.geometry.faces[baryData[j][0]].daeMaterial ===
        //   "frontMaterial" || node.geometry.faces[baryData[j][0]].daeMaterial ===
        //   "print_area1_0"
        // ) {
          // Find the vertices corresponding to the triangle in the model
          var vertexa = node.geometry.vertices[node.geometry.faces[baryData[j][0]].a];
          var vertexb = node.geometry.vertices[node.geometry.faces[baryData[j][0]].b];
          var vertexc = node.geometry.vertices[node.geometry.faces[baryData[j][0]].c];
          // Sum the barycentric coordinates and apply to the vertices to get the coordinate in local space
          var worldX = vertexa.x * baryData[j][1] + vertexb.x * baryData[j][2] + vertexc.x * baryData[j][3];
          var worldY = vertexa.y * baryData[j][1] + vertexb.y * baryData[j][2] + vertexc.y * baryData[j][3];
          var worldZ = vertexa.z * baryData[j][1] + vertexb.z * baryData[j][2] + vertexc.z * baryData[j][3];
          var vector = new THREE.Vector3(worldX, worldY, worldZ);
          // Translate to world space
          var worldVector = vector.applyMatrix4(node.matrixWorld);
          return worldVector;
        // }
      }
    }
  }
  if (node.children) {
    for (var i = 0; i < node.children.length; i++) {
      var worldVectorPoint = traversePolygonsForGeometries(node.children[i], uvx, uvy);
      if (worldVectorPoint) return worldVectorPoint;
    }
  }
};

// Loops through each face vertex UV item and tests if it is within the triangle.
function annotationTest(uvX, uvY, faceVertexUvArray) {
  var point = {};
  point.x = uvX;
  point.y = uvY;
  var results = [];
  for (let i = 0; i < faceVertexUvArray[0].length; i++) {
    var result = ptInTriangle(point, faceVertexUvArray[0][i][0], faceVertexUvArray[0][i][1], faceVertexUvArray[0][i][2]);
    if (result.length) {
      results.push([i, result[0], result[1], result[2]]);
    }
  }
  return results;
};

// This is a standard barycentric coordinate function.
function ptInTriangle(p, p0, p1, p2) {
  var x0 = p.x;
  var y0 = p.y;
  var x1 = p0.x;
  var y1 = p0.y;
  var x2 = p1.x;
  var y2 = p1.y;
  var x3 = p2.x;
  var y3 = p2.y;

  var b0 = (x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1)
  var b1 = ((x2 - x0) * (y3 - y0) - (x3 - x0) * (y2 - y0)) / b0
  var b2 = ((x3 - x0) * (y1 - y0) - (x1 - x0) * (y3 - y0)) / b0
  var b3 = ((x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0)) / b0

  if (b1 > 0 && b2 > 0 && b3 > 0) {
    return [b1, b2, b3];
  } else {
    return [];
  }
};

var getPositionFromUv = traversePolygonsForGeometries

export { getPositionFromUv }
