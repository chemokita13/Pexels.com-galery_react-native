import axios from  'axios'

//   563492ad6f917000010000017d5e0787ea054225900fdc457a9876cd

export const getImages = async (searchTerm = "cats") =>
await axios.get(`https://api.pexels.com/v1/search?query=${searchTerm}`, {
  headers: {
    Authorization: '563492ad6f917000010000017d5e0787ea054225900fdc457a9876cd',
  },
});