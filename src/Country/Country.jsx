import { useState } from "react";

const Country = ({ ci, handleClick, setCurrentCountry }) => {
    const [isHovered, setIsHovered] = useState(false);

    let status = true;

    function localClick() {
        handleClick();
        setCurrentCountry(ci);
    }

    return (
        <section
            className="countriesItems"
            
            onClick={localClick}
        >
            <div>
                <div className="picWrapper">
                    <img src={ci.flags.svg} alt="flag" />
                </div>
                <div className="textWrapper">
                    <h2>Country: {ci.name.common}</h2>
                    <p> Capital: {ci.capital}</p>
                    <p>Continent: {ci.region}</p>
                </div>
            </div>
        </section>
    );
};

export default Country;
