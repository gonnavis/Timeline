'use strict';

import { data } from './data.js'



function Region(a)
{
  var region_name = [null, null, null];
  var region_abbr = [null, null, null];
  var person_list = [];
  var flag = null;

  this.pos_x = 0;
  this.pos_y = 0;
  this.disp_level = 0;

  function create_region_box()
  {
    var node = document.createElement('div');
    node.classList.add('region');

    var title = document.createElement('div');
    title.classList.add('region-title');
    node.appendChild(title);

    return node;
  }

  this.node = create_region_box();


  function lang_name_to_id(lang)
  {
    switch (lang) {
      case 'ja':
        return 0;
      case 'en':
        return 1;
      case 'zh':
        return 2;
    }
  }

  function set_default_name(a, offset)
  {
    if (a[offset + 0] === '$') {
      a[offset + 0] = a[offset + 1];
    }
    if (a[offset + 1] === '@') {
      a[offset + 1] = a[offset + 0];
    }
    if (a[offset + 2] === '$') {
      a[offset + 2] = a[offset + 1];
    }
    if (a[offset + 2] === '@') {
      a[offset + 2] = a[offset + 0];
    }
  }

  this.update_year = function()
  {
    var year = data.year;
    var i, b, title = null;

    // 国名
    for (i = 3; i < a.length && a[i].length > 3; i++) {
      b = a[i];
      flag = b[2];
      if (b[3]) {
        set_default_name(b, 3);
        region_name[0] = b[3];
        region_name[1] = b[4];
        region_name[2] = b[5];
      }
      if (b.length >= 9 && b[6]) {
        set_default_name(b, 6);
        region_abbr[0] = b[6];
        region_abbr[1] = b[7];
        region_abbr[2] = b[8];
      }
      if (b.length >= 12) {
        this.pos_x = b[9];
        this.pos_y = b[10];
        this.disp_level = b[11];
      }
      if (year < b[1]) {
        break;
      }
    }
    for (; i < a.length && a[i].length > 3; i++) {}
    // 人名
    person_list = [];
    for (; i < a.length; i++) {
      b = a[i];
      if (b.length == 3) {
        set_default_name(b, 0);
        title = b;
      } else {
        if (year >= b[0] && year < b[1]) {
          set_default_name(b, 3);
          person_list.push([title, b]);
        }
      }
    }
    this.node.style.zIndex = this.pos_y - this.disp_level * 100 + 400;
  };
  this.update = function(x, y)
  {
    // this.node.style.left = x + 'px';
    // this.node.style.top = (y - 8) + 'px';

    // this.data_x = x
    // this.data_y = (y - 8)

    // debugger
    var lang = lang_name_to_id(data.lang);
    // var html = '';
    // if (flag && data.zoom >= 1) {
    //   html = '<img src="./twha/sym/' + flag + '.png" alt="">';
    // }
    // if (data.zoom - this.disp_level >= 2) {
    // html += region_name[lang];
    // } else {
    //   html += region_abbr[lang];
    // }
    // var n = this.node.childNodes[0];
    // n.innerHTML = html;
    this.data_name = region_name[lang];

    // if (data.zoom - this.disp_level >= 2) {
    //   var body, item;
    //   if (this.node.childNodes.length == 2) {
    //     body = this.node.childNodes[1];
    //     body.innerHTML = '';
    //   } else {
    //     body = document.createElement('div');
    //     body.classList.add('person-list');
    //     this.node.appendChild(body);
    //   }
    //   for (var i = 0; i < person_list.length; i++) {
    //     var a_title = person_list[i][0];
    //     var a_person = person_list[i][1];
    //     html = '';

    //     item = document.createElement('div');
    //     item.classList.add('person');
    //     if (a_person[2]) {
    //       html = '<img src="./twha/f/' + a_person[2] + '.png" alt="">';
    //     } else {
    //       html = '<img src="./twha/f/0.png" alt="">';
    //     }
    //     html += '<div>' + a_title[lang] + '</div><div>' + a_person[3 + lang] + '</div>';
    //     item.innerHTML = html;
    //     body.appendChild(item);
    //   }
    // } else {
    //   if (this.node.childNodes.length == 2) {
    //     this.node.removeChild(this.node.childNodes[1]);
    //   }
    // }
  };
}

export { Region }
