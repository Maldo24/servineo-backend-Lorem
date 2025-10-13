import 'express';
import { delete_location_by_display_name,
        delete_many_locations_by_display_name,
        delete_location_by_place_id,
        delete_many_locations_by_place_id,
        delete_many_locations_by_query 
} from './delete_service';
import {
    attributeValidation,
    dataExist
} from './common_functions';

export async function deleteLocationByDisplayName(req, res){
    try{
        const { name } = req.query;
        if(!name){
            return res.status(400).json({error: 'Missing parameter: name.'});
        }
        const data = await delete_location_by_display_name(name);
        const output_fail = 'No location data found, cant delete location.';
        const output_success = 'Location data deleted. ';
        dataExist(data, output_fail, output_success);
    }catch(err){
        console.log('Error in controller while deleting location: ', err);
        res.status(500).json({error: 'Server error'});
    }
}

export async function deleteManyLocationsByDisplayName(req, res){
    try{
        const {name} = req.query;
          if(!name){
            return res.status(400).json({error: 'Missing parameter: name.'});
        }
        const data = await delete_many_locations_by_display_name(name);
        const output_fail = 'No locations data found, cant delete locations.';
        const output_success = 'Locations data deleted. ';
        dataExist(data, output_fail, output_success);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Server error'});
    }
}

export async function deleteLocationByPlaceId(req, res){
    try{
        const { id } = req.query;
        if(!id){
            return res.status(400).json({error: 'Missing parameter: id'});
        }
        if(/^[0-9]{7}$/.test("id")){
            return res.status(400).json({error: 'Invalid parameter: id is not valid'});
        }
        const data = await delete_location_by_place_id(id);
        const output_fail = 'No location data found, cant delete location.';
        const output_success = 'Location data deleted. ';
        dataExist(data, output_fail, output_success);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Server error'});
    }
}
export async function deleteManyLocationsByPlaceId(req, res){
    try{
        const { ids } = req.query;
        if(!ids){
            return res.status(400).json({error: 'Missing parameter: ids'});

        }
        if(/^[0-9]{7}$/.test("ids")){
            return res.status(400).json({error: 'Invalid parameter: id is not valid'});
        }
        const data = await delete_many_locations_by_place_id(ids);
        const output_fail = 'No locations data found, cant delete locations.';
        const output_success = 'Locations data deleted. ';
        dataExist(data, output_fail, output_success);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Server error'});
    }    
}

export async function deleteManyLocationsByQuery(req, res){
    try{
        const { query } = req.query;
        if(!query){
            return res.status(400).json({ message: 'Missing query in request body.' });
        }
        locationAttributeValidation(query);
        const data = await delete_many_locations_by_query(query);
        const output_fail = 'No locations data found by query, cant delete locations.';
        const output_success = 'Locations data deleted. ';
        dataExist(data, output_fail, output_success);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Server error'});
    }
}