import countries from 'world-countries'

let formattedCountries = countries.map((country) => {
    // return {
    //     label: country.name.common,
    //     value: country.cca2,
    //     flag: country.flag,
    //     latlng: country.latlng,
    //     region: country.region,

    // }
    let countriesSortedObject = {
        label: country.name.common,
        value: country.cca2,
        flag: country.flag,
        latlng: country.latlng,
        region: country.region,

    }

    return countriesSortedObject
})


formattedCountries = formattedCountries.sort((a, b) => {
    if (a.label < b.label) {
        return -1;
    }
    if (a.label > b.label) {
        return 1;
    }
    return 0;
})

const useCountries = () => {
    const getAll = () => {
        return formattedCountries;
    }
    const getByValue = (value: string) => {
        return formattedCountries.find((country) => country.value === value)
    };

    return {
        getAll,
        getByValue,
    }
}

export default useCountries