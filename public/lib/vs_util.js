
var vs = {}
vs.Canvas = function (param) {
  var param = param || {} // width height id
  this.dom = document.createElement('canvas')
  this.dom.id = param.id
  this.dom.width = param.width
  this.dom.height = param.height
  this.ctx = this.dom.getContext('2d')
}
vs.load_img = function (str_url)/* :Promise<img> */ {
  return new Promise(function (resolve, reject) {
    var img = document.createElement('img')
    img.crossOrigin = "anonymous";
    img.src = str_url
    img.onload = function () {
      resolve(img)
    }
    if (img.complete) {
      img.onload()
    }
  })
}
vs.load_imgs = function (urls) {
  var promises = []
  for (var i = 0; i < urls.length; i++) {
    promises.push(vs.load_img(urls[i]))
  }
  return Promise.all(promises)
}
vs.load_js_data = function (url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var js_text = xhr.responseText
        resolve(eval('(' + js_text + ')'))
      }
    }
    xhr.open("GET", url, true);
    xhr.send();
  })
}
vs.img_ratio=function(img){
  return img.naturalWidth/img.naturalHeight
}
vs.load_js = function (str_url)/* :Promise<void> */ {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = str_url

    script.onload = script.onreadystatechange = function () {
      resolve()
    }

    try {
      document.head.appendChild(script)
    }
    catch (err) {// for example: Failed to load resource: the server responded with a status of 404 (Not Found)
      reject(err)
    }
  })
}
vs.load_jses = function (urls) {
  var promises = []
  for (var i = 0; i < urls.length; i++) {
    promises.push(vs.load_js(url))
  }
}
vs.unit_promise = function () {
  return new Promise(function (resolve, reject) {
    resolve()
  })
}
vs.get_base64 = function (file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
      reject(error)
    };
  })
	/* usage
		var file = document.querySelector('#files > input[type="file"]').files[0];
		getBase64(file);
		Notice that .files[0] is a File type, which is a sublcass of Blob. Thus it can be used with FileReader.
		*/
}
vs.getQueryStringByName = function (name) {
  var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
  if (result == null || result.length < 1) {
    return "";
  }
  return result[1];
}
vs.pad2 = function (int) {
	/*return
		'05'
		*/
  var result = '00'
  if (int < 10) {
    var str = '0' + int.toString()
    result = str.slice(-2)
  }
  else {
    result = int.toString()
  }
  return result
}
vs.pad = function (int, weishu) {
  if (typeof (arguments[0]) === 'object') {
		/* param obj
			num
			weishu
			*/
    var param = arguments[0]

    var str = param.str.toString()
    var weishu = param.weishu
    var pad = param.pad || '0'

    var result = ''
    for (var i = 0; i < weishu; i++) {
      result += pad
    }
    result += str.toString()
    result = result.slice(-weishu)
  }
  else {
    var str = ''
    for (var i = 0; i < weishu; i++) {
      str += '0'
    }
    str += int.toString()
    var result = str.slice(-weishu)
  }
  return result
}
vs.random_int = function (len/*3=0~2*/) {
  return Math.floor(Math.random() * len)
}
vs.get_time_str = function (param) {
	/*param
		date Date
		*/
	/*return
		'201709281327'
		*/
  var param = param || {}
  var date = param.date || new Date()
  var result = ''
  result += date.getFullYear()
  result += vs.pad(date.getMonth() + 1, 2)
  result += vs.pad(date.getDate(), 2)
  result += vs.pad(date.getHours(), 2)
  result += vs.pad(date.getMinutes(), 2)
  return result
}
vs.print_matrix = function (matrix_arr) {
  var result_str = '\n'
  if (matrix_arr.length === 16) {
    for (var row = 0; row < 4; row++) {
      for (var col = 0; col < 4; col++) {
        var val = matrix_arr[row * 4 + col]
        if (val % 1 !== 0) {
          val = val.toFixed(3)
        }
        if (val >= 0) {
          val = ' ' + val
        }
        val = vs.pad({ str: val, weishu: 10, pad: ' ' })
        result_str += val
      }
      result_str += '\n'
    }
  }
  return result_str
}
vs.scale_img = function (img, max_width_or_height) {
  return new Promise(function (resolve, reject) {
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')

    var result_width, result_height
    if (max_width_or_height && (img.naturalWidth > max_width_or_height || img.naturalHeight > max_width_or_height)) {
      if (img.naturalWidth > img.naturalHeight) {
        var ratio = max_width_or_height / img.naturalWidth
        result_width = img.naturalWidth * ratio
        result_height = img.naturalHeight * ratio
      }
      else {
        var ratio = max_width_or_height / img.naturalHeight
        result_width = img.naturalWidth * ratio
        result_height = img.naturalHeight * ratio
      }
    }
    else {
      result_width = img.naturalWidth
      result_height = img.naturalHeight
    }
    canvas.width = result_width
    canvas.height = result_height
    ctx.drawImage(img, 0, 0, result_width, result_height)


    var result_img = document.createElement('img')
    result_img.src = canvas.toDataURL()
    result_img.onload = function () {
      resolve(result_img)
    }

  })
}
vs.scale_imgs = function (imgs, max_width_or_height) {
  return new Promise(function (resolve, reject) {
    var promises = []
    for (var i = 0; i < imgs.length; i++) {
      promises.push(vs.scale_img(imgs[i], max_width_or_height))
    }

    Promise.all(promises).then(function (imgs) {
      resolve(imgs)
    })
  })
}
vs.index_of_max=function(arr) {
  if (arr.length === 0) {
    return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
}
vs.serial_to_xy=function (width, index){ // :{x:x, y:y}
  var x=index%width
  var y=Math.floor(index/width)
  return {x:x, y:y}
}
vs.xy_to_serial=function (width, xy){ // :index
  return xy.y*width+xy.x
}
vs.get_distance_2d=function (dot1, dot2){
  return Math.sqrt(
      Math.pow(dot1.x-dot2.x, 2)+Math.pow(dot1.y-dot2.y, 2)
    )
}

vs.degree_to_radian=function(num_degree)/* :num_radian */{
  return num_degree*Math.PI/180
}
vs.radian_to_degree=function(num_radian)/* :num_degree */{
  return 180*num_radian/Math.PI
}

vs.canvas_to_blob = function (canvas, mimi_type) {
  return new Promise(function (resolve, reject) {
    canvas.toBlob(function (blob) {
      resolve(blob)
    }, mimi_type)
  })
}
vs.blob_to_url = function (blob)/* str_dataUrl */ {
  return URL.createObjectURL(blob)
}
vs.blob_to_img = function (blob)/* Promise<HTMLImageElement> */ {
  return new Promise(function (resolve, reject) {
    var url = URL.createObjectURL(blob)
    var img = document.createElement('img')
    img.src = url
    img.onload = function () {
      resolve(img)
    }
  })
}
vs.image_type_convert = function (image/* :img|url|dataURL|blob|canvas|imageData|video */, str_output_type)/* :Promise<output_type> */ {
  return new Promise(function (resolve, reject) {

    var str_input_type
    if (typeof image === 'string') {
      if (image.indexOf('data:image') >= 0) {
        str_input_type = 'dataURL'
      } else {
        str_input_type = 'url'
      }
    } else if (image instanceof HTMLCanvasElement) {
      str_input_type = 'canvas'
    } else if (image instanceof HTMLImageElement) {
      str_input_type = 'img'
    } else if (image instanceof Blob) {
      str_input_type = 'blob'
    } else if (image instanceof ImageData) {
      str_input_type = 'imageData'
    }

    if (str_input_type === 'url' && str_output_type === 'canvas') {
      var url = image
      var img = document.createElement('img')
      img.src = url
      img.onload = function () {
        var canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        var ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        resolve(canvas)
      }
    } else if (str_input_type === 'img' && str_output_type === 'canvas') {
      var img = image
      var canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      var ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      resolve(canvas)
    } else if (str_input_type === 'canvas' && str_output_type === 'canvas') {
      var canvas = image
      resolve(canvas)
    } else {
      resolve({ err: 'not_supported' })
    }

  })

}

/*vs.canvas_draw_image_high_quality=function(img, x, y, width, height){
	var canvas=document.createElement('canvas')
	var ctx=canvas.getContext('2d')
	var current_width=img.naturalWidth
	var current_height=img.naturalHeight
	var step=function(){
		if(current_width/2>=width){
			canvas.width=current_width/=2
			canvas.height=current_height/=2
			ctx.drawImage(img, x, y, 
		}
	}
}*/
