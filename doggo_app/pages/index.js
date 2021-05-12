import Link from 'next/link';

import axios from '../helpers/axios';

import styles from '../styles/Home.module.css'

export default function Home({ isRequestedFailed, breeds }) {
  if (isRequestedFailed) {
    return <p>Oops something went wrong...</p>
  }

  const breedsElements = breeds.map(breed => <BreedElement key={breed.id} {...breed} />);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Encyclopedia of Dog Breeds</h1>
      <ul className={styles['breed-list__ul']}>
        {breedsElements}
      </ul>
    </div>
  );
}

function BreedElement({ id, name, url }) {
  return (
    <li className={styles['breed-list']}>
      <Link href={`/breeds/${id}`}>
        <a>
          <img src={url} alt={`photo of ${name}`} className={styles['breed-list__img']} />
          <p className={styles['breed-list__name']}> {name} </p>
        </a>
      </Link>
    </li>
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