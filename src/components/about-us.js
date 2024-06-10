// AboutUs.js
import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './AboutUs.css'; // Importam fisierul de stil CSS
import About from "../components/doctor.jpg"
import Clinica from "../components/clinica.png"

function AboutUs() {
    return (
        <div className="about-us">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <h2 className="section-title">Despre Noi</h2>
                        <p className="section-description">
                            Bine ați venit la Clinica Medicală EMedic! Suntem dedicați să oferim cele mai bune servicii medicale pentru comunitatea noastră și ne străduim să fim un punct de referință în îngrijirea sănătății.
                        </p>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={4}>
                        <Image src={About} alt="Doctors" fluid className="about-image" style={{marginLeft:"-20px"}} />
                    </Col>
                    <Col md={8} style={{marginLeft:"-20px"}}>
                        <h3>Medici Experimentați</h3>
                        <p>
                            Echipa noastră este formată din medici experimentați și dedicați, pregătiți să ofere îngrijire medicală de cea mai înaltă calitate. Ne străduim să fim mereu la curent cu cele mai recente descoperiri medicale și tehnologice pentru a asigura cea mai bună îngrijire pentru pacienții noștri.
                        </p>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={8} style={{marginLeft:"-20px"}}>
                        <br></br>
                        <h3>Spațiu Confortabil și Curat</h3>
                        <p>
                            Clinicile noastre oferă un mediu confortabil și curat pentru toți pacienții noștri. Ne străduim să creăm un mediu care să promoveze vindecarea și să ofere un sentiment de siguranță și confort.
                        </p>
                    </Col>
                    <Col md={4}>
                        <Image src={Clinica} alt="Clinic" fluid className="about-image" style={{marginLeft:"10px"}} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AboutUs;
