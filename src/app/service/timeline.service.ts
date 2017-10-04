
import { Timeline } from '../type/timeline';
import { Period } from '../type/period';

export class TimelineService {
    getRows(timeline:Timeline):Period[][] {
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
    setColor(periods:Period[]):void {
        for (var i = 0; i < periods.length; i++) {
            periods[i].color = 'rgba(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',0.5)';
        }
    }
    processTimelines(timelines: Timeline[]):void {
        for (var i = 0; i < timelines.length; i++) {
            this.addProperties(timelines[i]);
        }
    }
    addProperties(timeline: Timeline):void {
        var periods = timeline.periods;
        //算出各项参数
        for (var i = 0; i < periods.length; i++) {
            var period = periods[i];
            if (!timelineMin) {
                var timelineMin = period.from;
            }
            else {
                if (period.from < timelineMin) {
                    timelineMin = period.from;
                }
            }
            if (!timelineMax) {
                var timelineMax = period.to;
            }
            else {
                if (period.to > timelineMax) {
                    timelineMax = period.to;
                }
            }
            period.span = period.to - period.from;
        }

        //排序
        // data.sort(function(a,b){return a.from-b.from});
        // console.log(JSON.stringify(data));
        periods.sort(function (a, b) {
            if (a.from == b.from) {
                return b.span - a.span;
            }
            else {
                return a.from - b.from
            }
        });
        // console.log(JSON.stringify(data));

        //

        this.setColor(periods);

        timeline.rows = this.getRows(timeline);
        timeline.min=timelineMin;
        timeline.max=timelineMax;
        timeline.span=timelineMax-timelineMin;
    }

}