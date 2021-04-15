/* the styling for the navigation bar and the website when the window gets minimaize */

const layer = document.querySelector('.header .nav-bar .nav-list .layer');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

layer.addEventListener('click', () => {
    layer.classList.toggle('active');
    mobile_menu.classList.toggle('active');
});

/* The side navigation abr when the window is minimaized it will be displaye once its clicked */
document.addEventListener('scroll', () => {
    var scroll_position = window.scrollY;
    if (scroll_position > 250) {
        header.style.backgroundColor = '#29323c';
    } else {
        header.style.backgroundColor = 'transparent';
    }
});

/*Takes the user to different sections of the page */
menu_item.forEach((item) => {
    item.addEventListener('click', () => {
        layer.classList.toggle('active');
        mobile_menu.classList.toggle('active');
    });
});


/*Countries API Starts */

const countriesEl = document.getElementById('countries');
const toggleBtn = document.getElementById('toggle');
const filterBtn = document.getElementById('filter');
const regionFilters = filterBtn.querySelectorAll('li');
const searchEl = document.getElementById('search');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close');

getCountries();

/*This function to get the countries from the free API this website provided */
async function getCountries() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const countries = await res.json();

    displayCountries(countries);
}

/*Extracting the info of the API*/
/*Then displaying the countries in in forn and information about each of them  */
function displayCountries(countries) {
    countriesEl.innerHTML = '';

    countries.forEach(country => {
        const countryEl = document.createElement('div');
        countryEl.classList.add('card');

        countryEl.innerHTML = `
            <div>
                <img src="${country.flag
            }" alt="Germany" />
            </div>
            <div class="card-body">
                <h3 class="country-name">${country.name
            }</h3>
                <p>
            <strong>Native Name:</strong>
            ${country.nativeName
            }
               </p>
                <p>
                    <strong>Population:</strong>
                    ${country.population
            }
                </p>
                
                <p class="country-region">
                    <strong>Region:</strong>
                    ${country.region
            }
                </p>
                 <p>
                    <strong>Capital:</strong>
                    ${country.capital
            }
                </p>
                 <p>
                    <strong>Top Level Domain:</strong>
                    ${country.topLevelDomain[0]
            }
                </p>
                 <p>
                    <strong>Timezones</strong>
                    ${country.timezones
            }
             </p>
                <p>
                    <strong>Calling Codes:</strong>
                    ${country.callingCodes
            }
             </p>
              <p>
            <strong>Currencies:</strong>
            ${country.currencies.map(currency => currency.code)
            }
        </p>
        <p>
            <strong>Languages:</strong>
            ${country.languages.map(language => language.name)
            }
        </p>
          <p>
            <button class ="cardBtn" > Add to my Favourite </button>
        </p>
            </div>
        `;


        countriesEl.appendChild(countryEl);
    });
}


/*To show and hide the filters of the countries continent */
filterBtn.addEventListener('click', () => {
    filterBtn.classList.toggle('open');
});


/*To search  in the countries for a country of search */
searchEl.addEventListener('input', e => {
    const { value } = e.target;
    const countryName = document.querySelectorAll('.country-name');

    countryName.forEach(name => {
        if (name.innerText.toLowerCase().includes(value.toLowerCase())) { // .card -> .card-body -> .country-name
            name.parentElement.parentElement.style.display = 'block';
        } else {
            name.parentElement.parentElement.style.display = 'none';
        }
    });
});

// add a filter on the list inside the dropdown
regionFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        const value = filter.innerText;
        const countryRegion = document.querySelectorAll('.country-region');

        countryRegion.forEach(region => {
            if (region.innerText.includes(value) || value === 'All') {

                region.parentElement.parentElement.style.display = 'block';
            } else {
                region.parentElement.parentElement.style.display = 'none';
            }
        });
    });
});
