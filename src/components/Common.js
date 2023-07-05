export function getProperty(properties,field, defaultValue){
    return  Object.keys(properties.props).indexOf(field)>-1?properties.props[field]:defaultValue;
      
}