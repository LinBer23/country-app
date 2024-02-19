import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CiCloudMoon } from "react-icons/ci";
import { CiSun } from "react-icons/ci";
import "./App.css";
import Country from "./Country";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [input, setInput] = useState("");
    const [filterRegion, setFilterRegion] = useState("");

    const fetchCountries = async () => {
        const RESPONSE = await fetch("https://restcountries.com/v3.1/all");

        if (!RESPONSE.ok) console.log("Error fetching data");
        const countriesData = await RESPONSE.json();
        setCountries(countriesData);
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    /*  const x = 5;

    function doNothing() {
        return "aa";
    } */

    function currentContinent(countries) {
        /*    const region = ["Africa", "Europe", "Asien"];
        return region.map((continents, index) => (
            <option key={index} value={continents}>
                {continents}
            </option>
        )); */
        const regions = countries.map((country) => country.region);
        const uniqueRegion = Array.from(new Set(regions));

        return uniqueRegion.map((region, index) => {
            return (
                <option key={index} value={region}>
                    {region}
                </option>
            );
        });
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

    const filteredByInput = countries.filter((country) => {
        return country.name.common.toLowerCase().includes(input.toLowerCase());
    });
    console.log(filteredByInput);

    const filteredCountriesByContinent = filteredByInput.filter((country) => {
        if (filterRegion === "") {
            return true;
        }
        return country.region === filterRegion;
    });

    return (
        <>
            <header>
                <div>
                    <h1>Where is the World </h1>
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
            <main className="wrapper">
                {filteredCountriesByContinent.map((countriesItem, index) => (
                    <Country ci={countriesItem} i={index} />
                ))}
            </main>
        </>
    );
};

export default App;
