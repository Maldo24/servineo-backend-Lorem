import createModule from './create_service';
import readModule from './read_service';
import updateModule from './update_service';
import deleteModule from './delete_service';
import Location from '../../models/Location';

async function test1(){
    const current_location = new Location({
        place_id: "3547294",
        licence: "https://locationiq.com/attribution",
        osm_type: "node",
        osm_id: "5597143198",
        lat: "-12.049437",
        lon: "-76.9990148",
        display_name: "Institución Educativa San Carlos, Jirón Juan Hoyle Palacios, Ancieta Alta, El Agustino, Province of Lima, Lima Metropolitan Area, Lima, 15006, Peru",
        address: {
            school: "Institución Educativa San Carlos",
            road: "Jirón Juan Hoyle Palacios",
            quarter: "Ancieta Alta",
            suburb: "El Agustino",
            city: "El Agustino",
            region: "Province of Lima",
            state_district: "Lima Metropolitan Area",
            state: "Lima",
            postcode: "15006",
            country: "Peru",
            country_code: "pe"
        },
        boundingbox: [
            "-12.049487",
            "-12.049387",
            "-76.9990648",
            "-76.9989648"
        ]
    });

    try{
        const final_location = await createModule.create_location(current_location);
        console.log('Guardado: ', final_location);
    }catch(err){
        console.error('Error: ', err);
    }
} 

async function test2(){
    try{
        const final_locations = await readModule.get_all_locations();
        console.log('Acceso Correcto: ', final_locations);
    }catch(err){
        console.log('Error: ', err);
    }
}

async function test3(){
    try{
        const final_locations = await readModule.get_location_by_display_name('Porvenir, Quillacollo, Cochabamba, Bolivia');
        console.log('Acceso Correcto: ', final_locations);
    }catch(err){
        console.log('Error: ', err);
    }
}

async function test4() {
    try{
        const final_locations = await readModule.get_location_by_place_id("281635359");
        console.log('Acceso Correcto: ', final_locations);
    }catch(err){
        console.log('Error: ', err);
    }
}

async function test5(){
    const current_location = {
        "place_id": "421789356",
        "licence": "https://locationiq.com/attribution", 
        "osm_type": "node",
        "osm_id": "5987432154",
        "lat": "43.653225",
        "lon": "-79.383186",
        "display_name": "University of Toronto Schools, 371, Bloor Street West, The Annex, Toronto, Golden Horseshoe, Ontario, M5S 2R7, Canada",
        "address": {
            "school": "University of Toronto Schools",
            "house_number": "371",
            "road": "Bloor Street West",
            "suburb": "The Annex",
            "city": "Toronto",
            "region": "Golden Horseshoe",
            "state": "Ontario",
            "postcode": "M5S 2R7",
            "country": "Canada",
            "country_code": "ca"
        },
        "boundingbox": [
            "43.653175",
            "43.653275",
            "-79.383236",
            "-79.383136"
        ]
    };

    try{
        const final_location = await createModule.insert_one_location(current_location);
        console.log('Guardado: ', final_location);
    }catch(err){
        console.error('Error: ', err);
    }
}

async function test6(){
    const current_locations = [
        {
            "place_id": "125894567",
            "licence": "https://locationiq.com/attribution",
            "osm_type": "node",
            "osm_id": "5921478369",
            "lat": "48.856614",
            "lon": "2.3522219",
            "display_name": "Lycée Louis-le-Grand, 123, Rue Saint-Jacques, Quartier de la Sorbonne, 5th Arrondissement, Paris, Île-de-France, Metropolitan France, 75005, France",
            "address": {
                "school": "Lycée Louis-le-Grand",
                "house_number": "123",
                "road": "Rue Saint-Jacques",
                "suburb": "Quartier de la Sorbonne",
                "city_district": "5th Arrondissement",
                "city": "Paris",
                "region": "Île-de-France",
                "postcode": "75005",
                "country": "France",
                "country_code": "fr"
            },
            "boundingbox": [
                "48.856564",
                "48.856664",
                "2.3521719",
                "2.3522719"
            ]
        },
        {
            "place_id": "298634712",
            "licence": "https://locationiq.com/attribution",
            "osm_type": "node",
            "osm_id": "4785129631",
            "lat": "35.689487",
            "lon": "139.691706",
            "display_name": "Tokyo Metropolitan High School, 2-1, Shinjuku, Shinjuku City, Tokyo, 160-0022, Japan",
            "address": {
                "school": "Tokyo Metropolitan High School",
                "house_number": "2-1",
                "road": "Shinjuku",
                "city": "Shinjuku City",
                "state": "Tokyo",
                "postcode": "160-0022",
                "country": "Japan",
                "country_code": "jp"
            },
            "boundingbox": [
                "35.689437",
                "35.689537",
                "139.691656",
                "139.691756"
            ]
        },
        {
            "place_id": "356982147",
            "licence": "https://locationiq.com/attribution",
            "osm_type": "node",
            "osm_id": "5124789632",
            "lat": "-33.868819",
            "lon": "151.209295",
            "display_name": "Sydney Boys High School, 958, Anzac Parade, Moore Park, Sydney, Council of the City of Sydney, New South Wales, 2021, Australia",
            "address": {
                "school": "Sydney Boys High School",
                "house_number": "958",
                "road": "Anzac Parade",
                "suburb": "Moore Park",
                "city": "Sydney",
                "county": "Council of the City of Sydney",
                "state": "New South Wales",
                "postcode": "2021",
                "country": "Australia",
                "country_code": "au"
            },
            "boundingbox": [
                "-33.868869",
                "-33.868769",
                "151.209245",
                "151.209345"
            ]
        }
    ];

    try{
        const final_locations = await createModule.insert_many_locations(current_locations);
        console.log('Guardado: ', final_locations);
    }catch(err){
        console.error('Error: ', err);
    }
}

async function test7() {
    try{
        const final_locations = await readModule.get_locations_by_query_projection({}, {place_id: false});
        console.log('Acceso Correcto: ', final_locations);
    }catch(err){
        console.log('Error: ', err);
    }
}

async function test8() {
    try{
        const final_locations = await readModule.get_locations_by_query_projection({display_name: 'University of Toronto Schools, 371, Bloor Street West, The Annex, Toronto, Golden Horseshoe, Ontario, M5S 2R7, Canada'}, {});
        console.log('Acceso Correcto: ', final_locations);
    }catch(err){
        console.log('Error: ', err);
    }
}

async function test9() {
    try{
        const final_locations = await readModule.get_locations_by_query_projection({display_name: 'University of Toronto Schools, 371, Bloor Street West, The Annex, Toronto, Golden Horseshoe, Ontario, M5S 2R7, Canada'}, {display_name: false});
        console.log('Acceso Correcto: ', final_locations);
    }catch(err){
        console.log('Error: ', err);
    }
}

async function test10() {
    try{
        const search_name = 'Hola ceviche!';
        const name =  'University of Toronto Schools, 371, Bloor Street West, The Annex, Toronto, Golden Horseshoe, Ontario, M5S 2R7, Canada';
        const final_location = await updateModule.update_location_fields_by_display_name(search_name, {display_name: name});
        console.log('Modificacion Correcta: ', final_location);
    }catch(err){
        console.log('Error: ', err);
    }
}

async function test11() {
    try{
        const search_names = ['Lycée Louis-le-Grand, 123, Rue Saint-Jacques, Quartier de la Sorbonne, 5th Arrondissement, Paris, Île-de-France, Metropolitan France, 75005, France',
            'Tokyo Metropolitan High School, 2-1, Shinjuku, Shinjuku City, Tokyo, 160-0022, Japan',
            'Sydney Boys High School, 958, Anzac Parade, Moore Park, Sydney, Council of the City of Sydney, New South Wales, 2021, Australia'];
        const new_name = 'bochito';
        const final_locations = await updateModule.update_many_locations_fields_by_display_name(search_names, {display_name: new_name});
        console.log('Modificaciones Correctas: ', final_locations);
    }catch(err){
        console.log('Error: ', err);
    }
}

async function test12() {
    try{
        const search_name = 'bochito';
        const name =  'Sydney Boys High School, 958, Anzac Parade, Moore Park, Sydney, Council of the City of Sydney, New South Wales, 2021, Australia';
        const final_location = await updateModule.update_location_fields_by_display_name(search_name, {display_name: name});
        console.log('Modificacion Correcta: ', final_location);
    }catch(err){
        console.log('Error: ', err);
    }
}

async function test13() {
    try{
        const search_name = 'University of Toronto Schools, 371, Bloor Street West, The Annex, Toronto, Golden Horseshoe, Ontario, M5S 2R7, Canada';
        const final_location = await deleteModule.delete_location_by_display_name(search_name);
        console.log('Eliminacion Correcta: ', final_location);
    }catch(err){
        console.log('Error: ', err);
    }
}

async function test14() {
    try{
        const search_names = ['Lycée Louis-le-Grand, 123, Rue Saint-Jacques, Quartier de la Sorbonne, 5th Arrondissement, Paris, Île-de-France, Metropolitan France, 75005, France',
            'Tokyo Metropolitan High School, 2-1, Shinjuku, Shinjuku City, Tokyo, 160-0022, Japan',
            'Sydney Boys High School, 958, Anzac Parade, Moore Park, Sydney, Council of the City of Sydney, New South Wales, 2021, Australia'];
        const final_location = await deleteModule.delete_many_locations_by_display_name(search_names);
        console.log('Eliminacion Correcta: ', final_location);
    }catch(err){
        console.log('Error: ', err);
    }
}

async function test15() {
    try{
        const search_names = ['Lycée Louis-le-Grand, 123, Rue Saint-Jacques, Quartier de la Sorbonne, 5th Arrondissement, Paris, Île-de-France, Metropolitan France, 75005, France',
            'Tokyo Metropolitan High School, 2-1, Shinjuku, Shinjuku City, Tokyo, 160-0022, Japan',
            'Sydney Boys High School, 958, Anzac Parade, Moore Park, Sydney, Council of the City of Sydney, New South Wales, 2021, Australia'];
        const query = {display_name: search_names};
        const final_location = await deleteModule.delete_many_locations_by_query(query);
        console.log('Eliminacion Correcta: ', final_location);
    }catch(err){
        console.log('Error: ', err);
    }
}

async function test16(){
    
    const current_appointment = {
        "_id": "657f45a1c8e34b001a8d9e2f",
        "id_fixer": "fixer_78910",
        "id_requester": "user_45678",
        "selected_date": "2024-01-15T00:00:00.000Z",
        "selected_date_state": "partially-occupied",
        "schedules": [
            {
                "_id": "657f45a1c8e34b001a8d9e30",
                "starting_time": "2024-01-15T14:00:00.000Z",
                "finishing_time": "2024-01-15T15:00:00.000Z",
                "schedule_state": "booked"
            },
            {
                "_id": "657f45a1c8e34b001a8d9e31",
                "starting_time": "2024-01-15T16:00:00.000Z",
                "finishing_time": "2024-01-15T17:00:00.000Z", 
                "schedule_state": "occupied"
            }
        ],
        "current_requester_name": "María González",
        "appointment_type": "presential",
        "appointment_description": "Reunión para revisión de proyecto de construcción",
        "place_id": "appointment_35792468",
        "link_id": "meet_86420",
        "current_requester_phone": "+34 612 345 678",
        "createdAt": "2024-01-10T09:30:00.000Z",
        "updatedAt": "2024-01-10T10:15:00.000Z"
    };

    try{
        const final_appointment = await createModule.create_appointment(current_appointment);
        console.log('Guardado: ', final_appointment);
    }catch(err){
        console.log('Error: ', err);
    }
}

async function test17(){
    const current_appointment = {
        "_id": "65b7c8d9e0f1a2001b3c4d5e",
        "id_fixer": "fixer_44567",
        "id_requester": "user_89012",
        "selected_date": "2024-11-25T00:00:00.000Z",
        "selected_date_state": "available",
        "schedules": [
            {
                "_id": "65b7c8d9e0f1a2001b3c4d5f",
                "starting_time": "2024-11-25T11:00:00.000Z",
                "finishing_time": "2024-11-25T12:00:00.000Z",
                "schedule_state": "booked"
            }
        ],
        "current_requester_name": "David Kim",
        "appointment_type": "presential",
        "appointment_description": "Revisión de proyecto arquitectónico",
        "place_id": "appointment_44912345",
        "link_id": "meet_87321",
        "current_requester_phone": "+82 10 1234 5678"
    }

    try{
        const final_appointment = await createModule.insert_one_appointment(current_appointment);
        console.log('Guardado: ', final_appointment);
    }catch(err){
        console.log('Error: ', err);
    }
}

async function test18(){
    const current_appointments = [
        {
            "_id": "65c8d9e0f1a2b3001c4d5e6f",
            "id_fixer": "fixer_55678",
            "id_requester": "user_90123",
            "selected_date": "2024-12-03T00:00:00.000Z",
            "selected_date_state": "occupied",
            "schedules": [
                {
                    "_id": "65c8d9e0f1a2b3001c4d5e70",
                    "starting_time": "2024-12-03T08:30:00.000Z",
                    "finishing_time": "2024-12-03T10:00:00.000Z",
                    "schedule_state": "occupied"
                },
                {
                    "_id": "65c8d9e0f1a2b3001c4d5e71",
                    "starting_time": "2024-12-03T14:00:00.000Z",
                    "finishing_time": "2024-12-03T15:30:00.000Z",
                    "schedule_state": "cancelled"
                }
            ],
            "current_requester_name": "Elena Rodriguez",
            "appointment_type": "virtual",
            "appointment_description": "Consulta médica de seguimiento",
            "place_id": "appointment_55023456",
            "link_id": "meet_98432",
            "current_requester_phone": "+34 600 112 233"
        },
        {
            "_id": "65d9e0f1a2b3c4001d5e6f7a",
            "id_fixer": "fixer_66789",
            "id_requester": "user_01234",
            "selected_date": "2024-11-30T00:00:00.000Z",
            "selected_date_state": "partially-occupied",
            "schedules": [
                {
                    "_id": "65d9e0f1a2b3c4001d5e6f7b",
                    "starting_time": "2024-11-30T13:00:00.000Z",
                    "finishing_time": "2024-11-30T14:15:00.000Z",
                    "schedule_state": "booked"
                }
            ],
            "current_requester_name": "Takashi Yamamoto",
            "appointment_type": "presential",
            "appointment_description": "Presentación de resultados financieros",
            "place_id": "appointment_66134567",
            "link_id": "meet_09543",
            "current_requester_phone": "+81 90 1234 5678"
        }
    ];

    try{
        const final_appointments = await createModule.insert_many_appointments(current_appointments);
        console.log('Guardado: ', final_appointments);
    }catch(err){
        console.log('Error: ', err);
    }
}

async function test19(){
    try{
        const final_appointments = await readModule.get_all_appointments();
        console.log('Acceso Correcto: ', final_appointments);
    }catch(err){
        console.log('Error: ', err);
    }
}

async function test20(){
    try{
        const fixer_id = 'fixer_55667';
        const month = 8;
        const final_schedules = await readModule.get_schedules_by_fixer_month(fixer_id, month);
        console.log('Acceso Correcto: ', final_schedules);
    }catch(err){
        console.log('Error: ', err)
    }
}

test1();
test2();
test3();
test4();
test5();
test6();
test7();
test8();
test9();
test10();
test11();
test12();
test13();
test14();
test15();
test16();
test17();
test18();
test19();
test20();