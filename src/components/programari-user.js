import React, { Component } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import TutorialService from "../services/tutorial.service";
import { Card, Row, Col, Container } from 'react-bootstrap';

export default class Programari extends Component {
    constructor(props) {
        super(props);
        this.retrieveProgramari = this.retrieveProgramari.bind(this);
        this.state = {
            currentUser: null,
            programari: []
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser()
        AuthService.getUser(user.id)
            .then(response => {
                const user2 = response.data
                this.setState({
                    currentUser: user2,
                });
                console.log(response.data);
                if (user2) {
                    this.setState({
                        currentUser: user2,
                        showModeratorBoard: user.roles.includes("USER"),
                        showAdminBoard: user.roles.includes("ADMIN"),
                        utilizatorId: user.id
                    });
                }
            })
            .catch(e => {
                console.log(e);
            });
        this.retrieveProgramari(user.id);
    }

    retrieveProgramari(id) {
        TutorialService.getProgramari(id)
            .then(response => {
                this.setState({
                    programari: response.data
                });
                console.log(JSON.stringify(response.data));
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { programari } = this.state;

        return (
            <Container>
                <Row>
                    {programari.map((programare, index) => (
                        <Col key={index} sm={12} md={6} lg={4} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{programare.utilizator.numeUtilizator}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        {programare.detaliiServiciu.numeConsult}
                                    </Card.Subtitle>
                                    <Card.Text>
                                        <strong>Medicul:</strong> {programare.detaliiServiciu.medic.numeMedic} <br />
                                        <strong>Clinica:</strong> {programare.detaliiServiciu.medic.clinica.numeClinica} <br />
                                        <strong>Locație:</strong> {programare.detaliiServiciu.medic.clinica.locatie} <br />
                                        <strong>Data:</strong> {programare.detaliiServiciu.dataDisponibila} <br />
                                        <strong>Ora:</strong> {programare.detaliiServiciu.oraDisponibila} <br />
                                        <strong>Cost:</strong> {programare.detaliiServiciu.costServiciu} Lei <br />
                                        <strong>Durată:</strong> {programare.detaliiServiciu.durata} minute <br />
                                        <strong>Stare:</strong> {programare.detaliiServiciu.stare} <br />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }
}