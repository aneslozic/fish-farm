import { useState } from 'react';
import { useQuery } from 'react-query';
import {
    Container,
    Row,
    Col,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    Button,
    CardLink
} from 'reactstrap';
import CreateFishFarm from './CreateFishFarm';


const FishFarmOverview = () => {
    const [showModal, setShowModal] = useState(false);

    const { isLoading, error, data } = useQuery('fishFarms', async () => {
        const response = await fetch('http://localhost:5000/FishFarm')
        const data = await response.json();
        return data;
    })

    if (isLoading) return 'Loading...';

    if (error) return "An error has occurred: " + error.message;

    return (
        <Container className="mt-5">
            <Row>
                <Col className='text-right'>
                    <Button onClick={() => setShowModal(true)}>Register fish farm</Button>
                </Col>
            </Row>
            <Row>
                {data.length ? data.map(({ name, picture, id }) => (
                    <Col md={6} lg={4} className="mt-4">
                        <Card>
                            <CardImg top width="100px" src={picture} alt="Card image cap" />
                            <CardBody>
                                <Row>
                                    <Col>
                                        <CardTitle tag="data">{name}</CardTitle>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        <CardLink href={`/fish-farm/${id}`}>View Details</CardLink>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                )) :
                    <Col>
                        <h2>There are no registed fish farms</h2>
                    </Col>
                }
            </Row>
            { showModal && <CreateFishFarm closeModal={() => setShowModal(false)} />}
        </Container>

    );
}

export default FishFarmOverview;