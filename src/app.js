import axios from "axios";

const createElementPlus = (type, options = {}) => Object.assign(document.createElement(type), options);

async function getCountryData() {
    try {
        const result = await axios.get('https://restcountries.com/v2/all');

        const countryList = document.getElementById('countries');

        const countriesSortedByPopulation = result.data.sort((a, b) => a.population - b.population);

        const countries = countriesSortedByPopulation.map((country) => {

            const countryContainer = createElementPlus('div', {
            });

            const countryName = createElementPlus('li', {
                textContent: country.name,
                className: setCountryColor(country.region)
            });

            const countryFlag = createElementPlus('img', {
                src: country.flags.png,
                width: 50,
                height: 25
            });

            const countryPopulation = createElementPlus('li', {
                textContent: `Has a population of ${country.population} people.`,
                className: 'population'
            });

            countryContainer.append(countryFlag);
            countryContainer.append(countryName);
            countryList.append(countryContainer);
            countryList.append(countryPopulation);
            return country;
        })

    } catch (e) {
        console.error(e);
    }
}

function setCountryColor(region) {

    const posibleRegions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

    if (posibleRegions.includes(region)) {
        return region.toString().toLowerCase();
    } else {
        return 'region-not-found';
    }
}

getCountryData();