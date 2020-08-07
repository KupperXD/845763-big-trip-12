const getRandomInteger = (a = 0, b = 1) => {
    const lower = Math.ceil(Math.min(a, b));
    const upper = Math.floor(Math.max(a, b));

    return Math.floor(lower + Math.random() * (upper - lower + 1));
  };

const generateTypePoint = () => {
    const types = [
        `Taxi`,
        `Bus`,
        `Train`,
        `Ship`,
        `Transport`,
        `Drive`,
        `Flight`,
        `Check`,
        `Sightseeing`,
        `Restaurant`
    ];
    const randomIndex = getRandomInteger(0, types.length - 1);

    return types[randomIndex];
};

const generateCity = () => {
    const cities = [
        `Moscow`,
        `New-York`,
        `Kiev`,
        `Minsk`
    ];

    const randomIndex = getRandomInteger(0, cities.length - 1);

    return cities[randomIndex];
};

export const creareWaypoint = () => {
    return {
        type: generateTypePoint(),
        city: generateCity(),
    }
};