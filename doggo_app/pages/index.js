import { Fragment } from 'react';
import Link from 'next/link';

import axios from '../helpers/axios';

import styles from '../styles/Home.module.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home({ isRequestedFailed, breeds }) {
  if (isRequestedFailed) {
    return <p>Oops something went wrong...</p>
  }

  const breedsElements = breeds.map((breed) => {
    return (
      <Col lg={4} md={6}>
        <BreedElement
          key={breed.id}
          {...breed}
        />
      </Col>
    )
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Encyclopedia of Dog Breeds</h1>
      {/* <div className={styles['breed-list__ul']}> */}
      <Row className="justify-content-md-center">
        {breedsElements}
      </Row>
      {/* </div> */}
    </div>
  );
}

function BreedElement({ id, name, url }) {
  return (
    <div className={styles['breed-card']}>
      <Link href={`/breed/${id}`}>
        <a>
          <img src={url} alt={`photo of ${name}`} className={styles['breed-card__img']} />
          <p className={styles['breed-card__name']}> {name} </p>
        </a>
      </Link>
    </div>
  )
}

export async function getStaticProps() {
  const { data, status } = await axios.get('/search/a');

  if (status !== 200) {
    return {
      props: {
        isRequestedFailed: true,
      }
    }
  }

  const breeds = data.map(({ id, name, image: { url } }) => ({ id, name, url }));

  return {
    props: {
      breeds,
      isRequestedFailed: false,
    }
  }
}