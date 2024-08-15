import axios from 'axios'

const baseUrl = `https://api.themoviedb.org/3/`
const apiKey = `6bb72f3ee1890e4b000df402dbefb0e0`


// trending

export const fetchTrending = async () => {

	const {data} = await axios.get(`${baseUrl}trending/movie/day?api_key=${apiKey}&language=en-US`)
	return data
} 