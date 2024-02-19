import { useState } from "react";

const Country = ({ ci, i }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section
            className="countriesItems"
            key={i}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ scale: isHovered ? "1.1" : "1" }}
        >
            <div>
                <div className="picWrapper">
                    <img src={ci.flags.svg} alt="" />
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
