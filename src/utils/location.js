import * as Location from 'expo-location';

const getCurrentPosition = async (options) => {
    let data;
    try {
        data = await Location.getCurrentPositionAsync(options);
    }
    catch (err) {
        // 
    }
    return data;
};

const getLocationFromAddress = async (address) => {
    let data;
    try {

        data = await Location.geocodeAsync(address);
    }
    catch (err) {
        // 
    }
    return data;
}

const getAdressFromLocation = async (location) => {
    let data;
    try {
        data = await Location.reverseGeocodeAsync(location);
        if (data && data.length > 0) {
            const fullAddress = `${data[0].name || data[0].street}, ${data[0].region}, ${data[0].postalCode}`
            data = fullAddress;
        }
    }
    catch (err) {
        // 
    }
    return data;
}
export {
    getCurrentPosition,
    getLocationFromAddress,
    getAdressFromLocation
};