async function locationAttributeValidation(attributes, res){
    if(attributes == null){
            return res.status(400).json({ message: 'Missing parameter: list of attributes to change.'});
    }else{
        Object.keys(attributes).forEach(key => {
            if(key === "place_id"){
                if(attributes[key] === ""){
                    return res.status(400).json({ message: 'Missing parameter value: place_id.'});
                }
                if(!(/^[0-9]{7}$/.test(attributes[key]))){
                    return res.status(400).json({ message: 'Wrong parameter value: place_id must be 7 numbers.'});
                }
            }
            else if(key === "licence"){
                if(attributes[key] === ""){
                    return res.status(400).json({ message: 'Missing parameter value: licence.'});
                }
            }else if(key === "osm_type"){
                if(attributes[key] === ""){
                    return res.status(400).json({ message: 'Missing parameter value: osm_type.'});
                }
            }else if(key === "osm_id"){
                if(attributes[key] === ""){
                    return res.status(400).json({ message: 'Missing parameter value: osm_id.'});
                }
                if(attributes[key].length != 10 || !(/^[0-9]{9}$/.test(attributes[key]))){
                    return res.status(400).json({ message: 'Wrong parameter value: osm_id.'});
                }
            }else if(key === "lat"){
                if(attributes[key] === ""){
                    return res.status(400).json({ message: 'Missing parameter value: lat.'});
                }
                if(!(/^-?\d+\.\d{1-10}/.test(attributes[key]))){
                    return res.status(400).json({ message: 'Wrong parameter value: lat.'});
                }
            }else if(key === "lon"){
                if(attributes[key] === ""){
                    return res.status(400).json({ message: 'Missing parameter value: lon.'});
                }
                if(!(/^-?\d+\.\d{1-10}/.test(attributes[key]))){
                    return res.status(400).json({ message: 'Wrong parameter value: lon.'});
                }
            }else if(key === "display_name"){
                if(attributes[key] === ""){
                    return res.status(400).json({ message: 'Missing parameter value: display_name.'});
                }
            }else if(key === "address"){
                if(attributes[key] == null){
                    return res.status(400).json({ message: 'Missing parameter value: address.'});
                }
            }else if(key === "boundingbox"){
                if(attributes[key].length === 0 && attributes[key].length !== 4){
                    return res.status(400).json({ message: 'Missing parameter value: boundingbox.'});
                }
                if(!(/^-?\d+\.\d{1-10}/.test(attributes[key][0])) && (!(/^-?\d+\.\d{1-10}/.test(attributes[key][1]))) &&
                    (!(/^-?\d+\.\d{1-10}/.test(attributes[key][2]))) && (!(/^-?\d+\.\d{1-10}/.test(attributes[key][3])))){
                    return res.status(400).json({ message: 'Wrong parameter value: boundingbox.'});
                }
            }
        });
    }
}

async function locationQueryValidation(attributes, res){
    const location_keys = ["place_id", "licence", "osm_type", "osm_id", "lat", "lon", "display_name", "address", "bounding_box"];
    Object.keys(attributes).forEach(key => {
        if(location_keys.includes(key)){
            if(!attributes[key]){
                return res.status(400).json({ message: 'Missing parameter value.'});
            }
        }else if(key === "place_id"){
            if(!(/^[0-9]{7}$/.test(attributes[key]))){
                return res.status(400).json({ message: 'Wrong parameter value: place_id must be 7 numbers.'});
            }
        }else if(key === "osm_id"){
            if(attributes[key].length != 10 || !(/^[0-9]{9}$/.test(attributes[key]))){
                return res.status(400).json({ message: 'Wrong parameter value: osm_id.'});
            }
        }else if(key === "lat" || key == "lon"){
            if(!(/^-?\d+\.\d{1-10}/.test(attributes[key]))){
                return res.status(400).json({ message: 'Wrong parameter value: lat.'});
            }
        }else if(key === "address"){
            if(attributes[key] == null){
                return res.status(400).json({ message: 'Missing parameter value: address.'});
            }
        }else if(key === "boundingbox"){
            if(attributes[key].length === 0 && attributes[key].length !== 4){
                return res.status(400).json({ message: 'Missing parameter value: boundingbox.'});
            }
            if(!(/^-?\d+\.\d{1-10}/.test(attributes[key][0])) && (!(/^-?\d+\.\d{1-10}/.test(attributes[key][1]))) &&
                (!(/^-?\d+\.\d{1-10}/.test(attributes[key][2]))) && (!(/^-?\d+\.\d{1-10}/.test(attributes[key][3])))){
                return res.status(400).json({ message: 'Wrong parameter value: boundingbox.'});
            }
        }
    });
}


async function dataExist(data, output_fail, output_success){
    if(!data || data.length === 0){
      return res.status(404).json({ message: output_fail });
    }
    console.log(output_success, data);
    res.json(data);
}

async function locationProjectionValidation(projection, res){
    const location_keys = ['place_id', 'license', 'osm_type', 'osm_id', 'lat', 'lon', 'display_name', 'address', 'bounding_box'];
    Object.keys(projection).forEach(key => {
        if(!location_keys.includes(key)){
            return res.status(400).json({ message: 'Wrong projection attribute introduced.' })
        }
        if(!projection[key] || (typeof projection[key] !== 'boolean')){
            return res.status(400).json({ message: 'Missing projection attribute value or wrong projection attribute type value.' });
        }
    });        
}

module.exports = {
    locationAttributeValidation,
    dataExist,
    locationProjectionValidation
};