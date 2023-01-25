import  React from "react"

//Contact logos
import chat from "../assets/iconsFg/chat.png"
import facebook from "../assets/iconsFg/facebook.png"
import instagram from "../assets/iconsFg/instagram.png"
import linkedin from "../assets/iconsFg/linkedin.png"
import twitter from "../assets/iconsFg/twitter.png"
import whatsapp from "../assets/iconsFg/whatsapp.png"
import github from "../assets/iconsFg/github.png"
import gmail from "../assets/iconsFg/gmail.png"
import phone from "../assets/iconsFg/phone.png"

//Hover icons
import chatHv from "../assets/iconsHv/chat.png"
import facebookHv from "../assets/iconsHv/facebook.png"
import instagramHv from "../assets/iconsHv/instagram.png"
import linkedinHv from "../assets/iconsHv/linkedin.png"
import twitterHv from "../assets/iconsHv/twitter.png"
import whatsappHv from "../assets/iconsHv/whatsapp.png"
import githubHv from "../assets/iconsHv/github.png"
import gmailHv from "../assets/iconsHv/gmail.png"
import phoneHv from "../assets/iconsHv/phone.png"

function Footer() {
    return (
        <div className="footer-wrapper">
            <h4>To give real service you must add something which cannot be bought or measured with money, and that is sincerity and integrity.</h4>
            <div className="footer">
                <div className="tech">
                    <Contact destination="#" iconL={linkedinHv} iconE={linkedin}/>
                    <Contact destination="#" iconL={githubHv} iconE={github}/>
                </div>
                <div className="direct">
                    <DirectLink type="mailto" destination="erickochieng766@gmail.com" iconE={gmail} iconL={gmailHv} />
                    <DirectLink type="mailto" destination="erick.ochieng2018@students.jkuat.ac.ke" iconE={gmail} iconL={gmailHv} />
                    <DirectLink type="mailto" destination="erick.obuya@student.moringaschool.com" iconE={gmail} iconL={gmailHv} />
                    <DirectLink type="tel" destination="+254706087204" iconE={phone} iconL={phoneHv} />
                    <DirectLink type="tel" destination="+254796584498" iconE={phone} iconL={phoneHv} />
                </div>
                <div></div>
                <div className="social-media">
                    <Contact destination="#" iconL={chatHv} iconE={chat}/>
                    <Contact destination="#" iconL={facebookHv} iconE={facebook}/>
                    <Contact destination="#" iconL={instagramHv} iconE={instagram}/>
                    <Contact destination="#" iconL={twitterHv} iconE={twitter}/>
                    <Contact destination="#"iconL={whatsappHv} iconE={whatsapp}/>
                </div>
            </div>

            <p className="sign">Copyright &copy; ochiengerick 2023</p>
        </div>
    );
}

function DirectLink({type, destination, iconE, iconL }) {
    function toggleImageToEnter(event){
        event.target.firstElementChild.setAttribute("src", iconL)
    }
    function toggleImageToLeave(event){
        event.target.firstElementChild.setAttribute("src", iconE)
    }
    return (
        <a href={type+":"+destination} onMouseEnter={toggleImageToEnter} onMouseLeave={toggleImageToLeave}>
            {destination}
            <img src={iconE} alt={destination}/>
        </a>
    );
}

function Contact({destination, iconE, iconL}) {
    function toggleImageToEnter(event){
        event.target.setAttribute("src", iconL)
    }
    function toggleImageToLeave(event){
        event.target.setAttribute("src", iconE)
    }
    return (
        <div className="contacts">
            <a href={destination}>
                <img onMouseEnter={toggleImageToEnter} onMouseLeave={toggleImageToLeave} className="social-icons" src={iconE} alt={destination}/>
            </a>
        </div>
    );
}

export default Footer;