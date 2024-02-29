import "./CountryInfoItem.css";
const CountryInfoItem = ({ country, handleClick }) => {
    return (
        <div className="countryInfo">
            <img src={country.flags.svg} alt="flag" />
            <h2>Country: {country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Continent: {country.region}</p>
            <span onClick={handleClick}>X</span>
        </div>
    );
};

export default CountryInfoItem;
