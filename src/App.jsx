import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CiCloudMoon } from "react-icons/ci";
import { CiSun } from "react-icons/ci";
import "./App.css";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [input, setInput] = useState([]);
    console.log(countries);

    const fetchCountries = async () => {
        const RESPONSE = await fetch("https://restcountries.com/v3.1/all");

        if (!RESPONSE.ok) console.log("Error fetching data");
        const countriesData = await RESPONSE.json();
        setCountries(countriesData);
    };

    useEffect(() => {
        fetchCountries();
    }, []);

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
            <main className="wrapper">
                <filter-wrapper>{}
                    <input type="search" className="inputField" />
                    <select name="continent">
                        <option value="">Continent</option>
                    </select>
                </filter-wrapper>
                <country-item>
                    {countries.map((countriesItem, index) => (
                        <section key={index} className="countriesItems">
                            <img src={countriesItem.flags.svg} alt="" />
                            <h2>{countriesItem.name.common}</h2>
                            <p>{countriesItem.capital}</p>
                        </section>
                    ))}
                </country-item>
            </main>
        </>
    );
};

export default App;
