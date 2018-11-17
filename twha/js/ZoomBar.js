'use strict';

function ZoomBar()
{
	var zoom_bar = document.getElementById('scale-zoom');
	var cursor = document.getElementById('scale-zoom-cursor');
	var on_changed_handler = null;

	// 「つまみ」を動かす
	function update_cursor()
	{
		cursor.style.left = (101 - data.zoom * 16) + 'px';
	}
	function zoom_limit()
	{
		if (data.zoom < 0) {
			data.zoom = 0;
		} else if (data.zoom > 4) {
			data.zoom = 4;
		}
	}

	this.update = update_cursor;

	this.onchanged = function(f)
	{
		on_changed_handler = f;
	};

	zoom_bar.addEventListener('mousedown', function(e)
	{
		// マウス座標からつまみ位置を求める
		data.zoom = Math.floor((116 - e.clientX) / 16);
		zoom_limit();
		update_cursor();
		if (on_changed_handler) {
			on_changed_handler();
		}
	});

	update_cursor();
}
