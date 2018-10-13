import timeline_service from './timeline_service'
import areas from './data'

timeline_service.processTimelines(areas)
var global={areas}
global.min=areas[0].min
global.max=areas[0].max
areas.forEach((area, i)=>{
  if(area.min<global.min){
    global.min=area.min;
  }
  if(area.max>global.max){
    global.max=area.max;
  }
})
global.span=global.max-global.min;

export default global