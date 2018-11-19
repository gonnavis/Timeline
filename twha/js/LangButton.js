'use strict';

function LangButton()
{
	var button_ja = document.getElementById('lang-ja');
	var button_en = document.getElementById('lang-en');
	var button_zh = document.getElementById('lang-zh');
	var on_changed_handler = null;

	function update()
	{
		switch (data.lang) {
		case 'ja':
			button_ja.innerText = '日本語';
			button_en.innerText = '英語';
			button_zh.innerText = '中国語';
			button_ja.style.fontWeight = 'bold';
			button_en.style.fontWeight = '';
			button_zh.style.fontWeight = '';
			break;
		case 'en':
			button_ja.innerText = 'Japanese';
			button_en.innerText = 'English';
			button_zh.innerText = 'Chinese';
			button_ja.style.fontWeight = '';
			button_en.style.fontWeight = 'bold';
			button_zh.style.fontWeight = '';
			break;
		case 'zh':
			button_ja.innerText = '日文';
			button_en.innerText = '英文';
			button_zh.innerText = '中文';
			button_ja.style.fontWeight = '';
			button_en.style.fontWeight = '';
			button_zh.style.fontWeight = 'bold';
			break;
		}
		if (on_changed_handler) {
			on_changed_handler();
		}
	}

	this.onchanged = function(f)
	{
		on_changed_handler = f;
	};

	button_ja.addEventListener('mousedown', function()
	{
		data.lang = 'ja';
		update();
	});
	button_en.addEventListener('mousedown', function()
	{
		data.lang = 'en';
		update();
	});
	button_zh.addEventListener('mousedown', function()
	{
		data.lang = 'zh';
		update();
	});

	update();
}
