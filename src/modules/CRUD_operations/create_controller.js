import 'express';
import {
    create_location,
    insert_one_location,
    insert_many_locations,
    create_appointment,
    insert_one_appointment,
    insert_many_appointments
} from './create_service';
import {
    attributeValidation,
    dataExist
} from './common_functions';

export async function createLocation(req, res){
    try{
        const { current_location } = req.query;
        if(!current_location){
            return res.status(400).json({ message: 'Missing parameter: current_location.' });
        }
        const data = await create_location(current_location);
        const output_fail = 'Could not create location data.';
        const output_success = 'Location data created correctly. ';
        dataExist(data, output_fail, output_success);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Error creating location data.' });
    }
}

export async function insertOneLocation(req, res){
    try{
        const { current_location } = req.query;
        if(!current_location){
            return res.status(400).json({ message: 'Missing parameter: current_location.' });
        }
        const data = await insert_one_location(current_location);
        const output_fail = 'Could not insert location data.';
        const output_success = 'Location data inserted correctly. ';
        dataExist(data, output_fail, output_success);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Error inserting location data.' });
    }
}

export async function insertManyLocations(req, res){
    try{
        const { locations } = req.query;
        if(locations.length === 0){
            return res.status(400).json({ message: 'Missing parameter: list of locations.' });
        }
        const data = await insert_many_locations(locations);
        const output_fail = 'Could not insert locations data.';
        const output_success = 'Locations data inserted correctly. ';
        dataExist(data, output_fail, output_success);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Error creating location data' });
    }
}

export async function createAppointment(req, res){
    try{
        const { current_appointment } = req.query;
        if(!current_appointment){
            return res.status(400).json({ message: 'Missing parameter: current_appointment.'});  
        }
        const data = await create_appointment(current_appointment);
        const output_fail = 'Could not create appointment data.';
        const output_success = 'Appointment data created correctly. ';
        dataExist(data, output_fail, output_success);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Error creating appointment data.' });
    }
}

export async function insertOneAppointment(req, res){
    try{
        const { current_appointment } = req.query;
        if(!current_appointment){
            return res.status(400).json({ message: 'Missing parameter: current_appointment.'});  
        }
        const data = await insert_one_appointment(current_appointment);
        const output_fail = 'Could not insert appointment data.';
        const output_success = 'Appointments data inserted correctly. ';
        dataExist(data, output_fail, output_success);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Error inserting appointment data.' });
    }
}

export async function insertManyAppointments(req, res){
    try{
        const { appointments } = req.query;
        if(appointments.length === 0){
            return res.status(400).json({ message: 'Missing parameters: list of appointments.'});  
        }
        const data = await insert_many_appointments(appointments);
        const output_fail = 'Could not insert appointments data.';
        const output_success = 'Appointments data inserted correctly. ';
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Error inserting many appointment data.' });
    }
}