import timeline_service from './timeline_service'
import areas from './data'

timeline_service.processTimelines(areas)
var global={areas}
global.min=areas[0].min
areas.forEach((area, i)=>{
  if(area.min<global.min){
    global.min=area.min;
  }
})

export default global