import React from "react";

import {Link} from "react-router-dom";

import {FiArrowRight} from "react-icons/fi";

import Logo from "../../assets/images/Logo.svg";

import "./styles.css";

function Landing(){
    return (
        <div id="landing-page">
            <div className="landing-content">
                <img src={Logo} alt="Happy"/>

                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia de muitas crianças</p>
                </main>

                <div className="location">
                    <strong>Ceará</strong>
                    <span>Viçosa do Ceará</span>
                </div>

                <Link to="/app" className="enter">
                    <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)"/>
                </Link>
            </div>
        </div>
    );
}

export default Landing;