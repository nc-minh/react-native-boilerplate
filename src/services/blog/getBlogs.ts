import axios from "axios";

const getBlogs = async () => {
  const {data} = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return data;
};

export default getBlogs;
