import * as dotenv from 'dotenv';

import db_connection from '../../database';
import Location from '../../models/Location';

dotenv.config();

let connected = false;

async function set_db_connection() {
    if (!connected) {
        await db_connection();
        connected = true;
    }
}

//Ubicaciones
async function update_location_fields_by_display_name(name, attributes){
    await set_db_connection();
    return await Location.findOneAndUpdate({display_name: name}, {$set: attributes}, {new: true});
}

async function update_many_locations_fields_by_display_name(names, attributes){
    await set_db_connection();
    await Location.updateMany({display_name: names}, {$set: attributes});
    const locations = await Location.find({display_name: names}, {$set: attributes});
    return locations;
}

async function update_location_fields_by_place_id(id, attributes){
    await set_db_connection();
    return await Location.findOneAndUpdate({place_id: id}, {$set: attributes}, {new: true});
}

async function update_many_locations_fields_by_place_id(ids, attributes){
    await set_db_connection();
    await Location.updateMany({place_id: ids}, {$set: attributes});
    const locations = await Location.find({place_id: ids}, {$set: attributes});
    return locations;
}

async function update_many_locations_fields_by_query(query, attributes){
    await set_db_connection();
    await Location.updateMany(query, {$set: attributes});
    const locations = await Location.find(query, {$set: attributes});
    return locations;
}

async function update_all_locations_fields(attributes){
    await set_db_connection();
    await Location.updateMany({}, {$set: attributes});
    const locations = await Location.find({}, {$set: attributes});
    return locations;
}

//Citas:
//async function update_appointment_fields_by_display_name(){
    
//}

module.exports = {
    update_location_fields_by_display_name,
    update_many_locations_fields_by_display_name,
    update_location_fields_by_place_id,
    update_many_locations_fields_by_place_id,
    update_all_locations_fields,
    update_many_locations_fields_by_query
}