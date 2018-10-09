export default {
    getRows(area){
        var periods=area.periods;
        var rows = [];
        var tempData = periods.slice();
        function setRow(row_i) {
            var row = {periods:[]};
            row.periods.push(tempData.splice(0, 1)[0]);
            var length = tempData.length;
            for (var i = 0; i < length;) {
                if (tempData[i].from >= row.periods[row.periods.length - 1].to) {
                    row.periods.push(tempData.splice(i, 1)[0]);
                    length--;
                }
                else {
                    i++;
                }
            }
            rows.push(row);
            if (tempData.length > 0) {
                setRow(++row_i);
            }
        }
        setRow(0);
        return rows;
    },
    setColor(periods) {
        for (var i = 0; i < periods.length; i++) {
            periods[i].color = 'rgba(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ', .5)';
        }
    },
    processTimelines(areas) {
        for (var i = 0; i < areas.length; i++) {
            this.addProperties(areas[i]);
        }
    },
    addProperties(area) {
        var periods = area.periods;
        //算出各项参数
        for (var i = 0; i < periods.length; i++) {
            var period = periods[i];
            if (!areaMin) {
                var areaMin = period.from;
            }
            else {
                if (period.from < areaMin) {
                    areaMin = period.from;
                }
            }
            if (!areaMax) {
                var areaMax = period.to;
            }
            else {
                if (period.to > areaMax) {
                    areaMax = period.to;
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

        area.rows = this.getRows(area);
        area.min=areaMin;
        area.max=areaMax;
        area.span=areaMax-areaMin;
    }
}