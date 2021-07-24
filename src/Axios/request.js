const API_KEY = "034d14e583de330d03b23d639d79f530";
const blackWidowId = "497698"

const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchUpComing:`/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
    fetchTopRated:`/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
    fetchNowPlaying:`/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
    fetchBlackWidow:`/movie/${blackWidowId}?api_key=${API_KEY}&language=en-US`,
}

export default requests

