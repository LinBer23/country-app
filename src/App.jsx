import React from "react";
import { useEffect } from "react";
import { useState } from "react";
/* import { CiCloudMoon } from "react-icons/ci"; */
import { CiSun } from "react-icons/ci";
import "./App.css";
import Country from "./components/Country/Country";
import CountryInfoItem from "./CountryInfoItem";
import "./Country.css";
import "./CountryInfoItem.css";
import Toggle from "./components/Country/Toggle";

import ClipLoader from "react-spinners/ClipLoader";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [input, setInput] = useState("");
    const [filterRegion, setFilterRegion] = useState("");
    const [currentCountry, setCurrentCountry] = useState(null);
    const [toggleVue, setToggleVue] = useState(true);
    const [loadingSpinner, setloadingSpinner] = useState(true);
    const [color, setColor] = useState("#ffffff");
    const [countryLength, setCountryLength] = useState(20);
    const [darkMode, setDarkMode] = useState(true);

    const fetchCountries = async () => {
        const RESPONSE = await fetch("https://restcountries.com/v3.1/all");

        if (!RESPONSE.ok) console.log("Error fetching data");
        const countriesDataUnsorted = await RESPONSE.json();

        const countriesData = countriesDataUnsorted.toSorted((a, b) => {
            let firstCountryName = a.name.common;
            let nextCountry = b.name.common;
            if (firstCountryName < nextCountry) {
                return -1;
            }
            return 1;
        });

        setCountries(countriesData);
        setloadingSpinner(false);
    };

    useEffect(() => {
        fetchCountries();
    }, []);

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

    function handleSliceCountries() {
        setCountryLength(countryLength + 20);
    }
    function handleLessCountries() {
        if (countryLength >= 20) {
            setCountryLength(countryLength - 20);
        }
    }
    function handleClick() {
        setToggleVue(!toggleVue);
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

    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

    const slicedResult = filteredCountriesByContinentAndInput.slice(0, countryLength);

    return (
        <div data-theme={darkMode ? "dark" : "light"}>
            <header>
                <div>
                    <h1>Where in the World </h1>
                    <span>
                        <Toggle />
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
            {/*  { countries.length === 0 &&(<div>hallo</div>)} */}
            {loadingSpinner && (
                <div>
                    <div className="sweet-loading">
                        <ClipLoader
                            color={color}
                            loadingSpinner={loadingSpinner}
                            cssOverride={override}
                            size={150}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                </div>
            )}

            {toggleVue && (
                <div>
                    <main className="wrapper">
                        {slicedResult.map((countriesItem, index) => (
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
            {!toggleVue && <CountryInfoItem country={currentCountry} handleClick={handleClick} />}
            <div className="buttonWrapper">
                {!(slicedResult.length <= 19) && (
                    <button className="loadingButton" onClick={handleSliceCountries}>
                        Show More Countries
                    </button>
                )}

                {!(slicedResult.length <= 20) && (
                    <button
                        className="loadingButton"
                        disabled={slicedResult.length <= 20}
                        onClick={handleLessCountries}
                    >
                        Show Less Countries
                    </button>
                )}
            </div>
        </div>
    );
};

export default App;
