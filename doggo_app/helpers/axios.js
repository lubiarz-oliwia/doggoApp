import axios from 'axios';

const baseURL = `https://api.thedogapi.com/v1/breeds?${process.env.api_key}`;

export default axios.create({
    baseURL,
});
