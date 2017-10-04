
import { Timeline } from '../type/timeline';
import { Period } from '../type/period';

export class TimelineService {
    getRows(timeline:Timeline) {
        var periods:Period[]=timeline.periods;
        var rows = [];
        var tempData = periods.slice();
        function setRow(row) {
            var arr = [];
            arr.push(tempData.splice(0, 1)[0]);
            var length = tempData.length;
            for (var i = 0; i < length;) {
                if (tempData[i].from >= arr[arr.length - 1].to) {
                    arr.push(tempData.splice(i, 1)[0]);
                    length--;
                }
                else {
                    i++;
                }
            }
            rows.push(arr);
            if (tempData.length > 0) {
                setRow(++row);
            }
        }
        setRow(0);
        return rows;
    }

    //set color
    setColor(data) {
        for (var i = 0; i < data.length; i++) {
            data[i].color = 'rgba(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',0.5)';
        }
    }

    // var timeline=getTimeline(data);

    // console.log(JSON.stringify(timeline));

    processTimelines(timelines: Timeline[]):void {
        for (var i = 0; i < timelines.length; i++) {
            timelines[i] = this.addProperties(timelines[i]);
        }
    }
    addProperties(timeline: Timeline):Timeline {
        var data = timeline.periods;
        //算出各项参数
        for (var i = 0; i < data.length; i++) {
            var period = data[i];
            if (!min) {
                var min = period.from;
            }
            else {
                if (period.from < min) {
                    min = period.from;
                }
            }
            if (!max) {
                var max = period.to;
            }
            else {
                if (period.to > max) {
                    max = period.to;
                }
            }
            period.span = period.to - period.from;
        }

        //排序
        // data.sort(function(a,b){return a.from-b.from});
        // console.log(JSON.stringify(data));
        data.sort(function (a, b) {
            if (a.from == b.from) {
                return b.span - a.span;
            }
            else {
                return a.from - b.from
            }
        });
        // console.log(JSON.stringify(data));

        //
        var span = max - min;

        this.setColor(data);

        timeline.rows = this.getRows(timeline);
        return timeline
    }
    addTimeline(timeline, area_id) {

    }

}