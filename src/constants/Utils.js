export const shortBackgroundImageUrl = require('../../assets/background.png');
export const shortBrandOrangeGreyUrl = require('../../assets/logos/cargame-transportador-naranja-letra-gris.png');
export const shortMainCargaUrl = require('../../assets/extras/main-carga.png');
export const whiteSquareUrl = require('../../assets/white_square.png');
export const planeSquareUrl = require('../../assets/extras/plane_and_square.png');
export const busSquareUrl = require('../../assets/extras/bus_and_square.png');
export const craneSquareUrl = require('../../assets/extras/crane_and_square.png');
export const motocycleSquareUrl = require('../../assets/extras/motocycle_and_square.png');
export const carSquareUrl = require('../../assets/extras/car_and_square.png');
export const truckSquareUrl = require('../../assets/extras/truck_and_square.png');
export const primaryFont = 'Ruda';
export const secondaryFont = 'Quicksand';

export const categoristList = [
    {
      id: 'truck',
      name: 'Camión',
      avatar_url: truckSquareUrl,
      subtitle: 'Lleva documentos y paquetes',
      routeName: 'HomeDriver',
    },
    {
      id: 'car',
      name: 'Carro particular',
      avatar_url: carSquareUrl,
      subtitle: 'Lleva documentos, paquetes y personas',
    },
    {
        id: 'motocycle',
        name: 'Moto',
        avatar_url: motocycleSquareUrl,
        subtitle: 'Lleva documentos y paquetes'
    },
    {
        id: 'crane',
        name: 'Grúa',
        avatar_url: craneSquareUrl,
        subtitle: 'Solicita un servicio'
    },
    {
        id: 'bus',
        name: 'Viajero en Bus',
        avatar_url: busSquareUrl,
        subtitle: 'Lleva documentos y paquetes'
    },
    {
        id: 'plane',
        name: 'Viajero en Avión',
        avatar_url: planeSquareUrl,
        subtitle: 'Lleva documentos'
    },
];

export const collectionTimeSlot = [
    {
        label: 'manana',
        value: 'Mañana (7:00am - 12:00pm)'
    },
    {
        label: 'tarde',
        value: 'Tarde (12:01pm - 6:59pm)'
    },
    {
        label: 'noche',
        value: 'Noche (7:00pm - 10:00pm)'
    }
];

export const offerMessages = {
    'ACTIVE': 'Nadie ha ofertado',
    'IN_PROGRESS': 'Usted ha ofertado satisfactoriamente por',
    'OFFERED': 'Han realizado una oferta por',
    'CONTRACTED': 'Se te asignó la oferta por'
};

export const URBAN_SERVICE = 1;
export const RURAL_SERVICE = 0;