import axios from 'axios'

export const imageUpload = async image => {
  const formData = new FormData();
  formData.append("image", image);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=d548165fefed1d76ac29c20f55bf778d`,
    formData
  );

  const photo_url = data.data.display_url
  return photo_url
}