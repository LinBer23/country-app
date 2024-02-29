import React from "react";
import { useEffect } from "react";
import { useState } from "react";
/* import { CiCloudMoon } from "react-icons/ci"; */
import { CiSun } from "react-icons/ci";
import "./App.css";
import Country from "./Country/Country";
import CountryInfoItem from "./CountryInfoItem";
import "./Country.css";
import "./CountryInfoItem.css";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [input, setInput] = useState("");
    const [filterRegion, setFilterRegion] = useState("");
    const [currentCountry, setCurrentCountry] = useState(null);
    const [visible, setVisible] = useState(true);

    const fetchCountries = async () => {
        const RESPONSE = await fetch("https://restcountries.com/v3.1/all");

        if (!RESPONSE.ok) console.log("Error fetching data");
        const countriesDataUnsorted = await RESPONSE.json();
        const countriesData = countriesDataUnsorted.toSorted((a, b) => {
            let name_a = a.name.common;
            let name_b = b.name.common;
            if (name_a < name_b) {
                return -1;
            }
            return 1;
        });
        console.log(countriesData);
        setCountries(countriesData);
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    function addNewInfoItem() {}

    function currentContinent(countries) {
        /*    const region = ["Africa", "Europe", "Asien"];
        return region.map((continents, index) => (
            <option key={index} value={continents}>
                {continents}
            </option>
        )); */
        const regions = countries.map((country) => country.region);
        const uniqueRegion = Array.from(new Set(regions));
        const sortUniqueRegion = uniqueRegion.sort();

        return sortUniqueRegion.map((region, index) => {
            return (
                <option key={index} value={region}>
                    {region}
                </option>
            );
        });
    }
    function handleClick() {
        setVisible(!visible);
    }

    function handleSelectChange(e) {
        setFilterRegion(e.target.value);
    }
    /*  function handleInputChange(e) {
        setInput(e.target.value);
    } */

    /* function displayOption(currentOption) {
        return <option value={currentOption}>{currentOption}</option>;
    } */
    /*  function handleClickInfoItem(addNewInfoItem) {
        const infoCountryItem = countries.map((country, index) => {
            <handleClickInfoItem />;
        });
    }
 */
    const filteredByInput = countries.filter((country) => {
        return country.name.common.toLowerCase().includes(input.toLowerCase());
    });

    const filteredCountriesByContinentAndInput = filteredByInput.filter((country) => {
        if (filterRegion === "") {
            return true;
        }
        return country.region === filterRegion;
    });

    return (
        <>
            <header>
                <div>
                    <h1>Where in the World </h1>
                    <span>
                        <button className="color-switch-box">Screen-Mode</button>
                        <CiSun />
                    </span>
                </div>
            </header>
            <hr />
            <filter-wrapper>
                <input
                    type="search"
                    onChange={(e) => setInput(e.target.value)}
                    className="inputField"
                    placeholder="Search Country"
                />

                <select onChange={handleSelectChange}>
                    <option value="">Select By Region</option>
                    {currentContinent(countries)}
                </select>
            </filter-wrapper>
            {visible && (
                <div>
                    <main className="wrapper">
                        {filteredCountriesByContinentAndInput.map((countriesItem, index) => (
                            <Country
                                ci={countriesItem}
                                key={index}
                                setCurrentCountry={setCurrentCountry}
                                handleClick={handleClick}
                            />
                        ))}
                    </main>
                </div>
            )}
            {!visible && <CountryInfoItem country={currentCountry} handleClick={handleClick} />}
        </>
    );
};

export default App;
