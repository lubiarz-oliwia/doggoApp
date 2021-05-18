import { useRouter } from 'next/router';
import axios from '../../helpers/axios';


export default function Breed({name}) {
    const { isFallback } = useRouter();
    if (isFallback) {
        return <p>Wait...</p>
    }

    return (
        <>
        <h1>Hello {name} </h1>
        </>
    );
}

export async function getStaticPaths() {
    const { data } = await axios.get('/search/a');
    const paths = data.map(({ id }) => ({ params: {id: id.toString()}}));
    console.log(paths);

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const { data } = await axios.get(`/${params.id}`);
    console.log(params.id)
    
    return {
        props: {
            ...data,
        }
    }
}