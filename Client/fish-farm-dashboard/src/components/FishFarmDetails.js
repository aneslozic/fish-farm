import { useQuery } from 'react-query';
import { useParams } from "react-router";
import {
    Container,
    Row,
    Col,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button
} from 'reactstrap';
import CreateWorker from './CreateWroker';
import { Image } from 'react-bootstrap';
import { useState } from "react";
import dayjs from "dayjs";
import { history } from '../App';


const FishFarmDetails = () => {
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();
    const { isLoading, error, data } = useQuery('fishFarm', async () => {
        const response = await fetch(`https://localhost:5001/FishFarm/${id}`)
        const data = await response.json();
        return data;
    })

    if (isLoading) return 'Loading...';

    if (error) return "An error has occurred: " + error.message;

    return (
        <Container>
            <Row className='mt-3'>
                <Col>
                    <Button onClick={() => history.goBack()}>Go back</Button>
                </Col>
                <Col className="text-right">
                    <Button onClick={() => setShowModal(true)}>Create worker</Button>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col>
                    {data.picture && <Image width="80%" src={data.picture} />}
                </Col>
                <Col>
                    <h2>{data.name}</h2>
                    <h4>Gps Coordinates {data.latitude}°N, {data.longitude}°E</h4>
                    <h4>{data.numberOfCages} number of cages</h4>
                    <h4>Boat {data.barge ? 'has' : 'doesn\'t have'} barge</h4>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col>
                    <h2>Workers</h2>
                </Col>
            </Row>
            <Row className='mt-5'>
                {data.workers.map(({ name, picture, id, age, email, position, certifiedUntil }) => (
                    <Col md={6} lg={4} className="mt-4">
                        <Card>
                            <CardImg top width="100px" src={picture} alt="Card image cap" />
                            <CardBody>
                                <Row>
                                    <Col>
                                        <CardTitle tag="data">{name}</CardTitle>
                                        <CardSubtitle>{position}</CardSubtitle>
                                        <CardSubtitle>{email}</CardSubtitle>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h5>Age: {age}</h5>
                                        <h5>Certified until: {dayjs(certifiedUntil).format('YYYY-MM-DD HH:mm')}</h5>
                                    </Col>
                                </Row>

                            </CardBody>
                        </Card>
                    </Col>
                ))
                }
            </Row>
            { showModal && <CreateWorker closeModal={() => setShowModal(false)} fishFarmId={id} />}
        </Container>
    );
}

export default FishFarmDetails;