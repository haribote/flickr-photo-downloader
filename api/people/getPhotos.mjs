import client from "../client.mjs";

export default async function getPhotos(params) {
  console.log('Get photos by:', params)

  const res = await client.get('', {
    params: {
      method: 'flickr.people.getPhotos',
      extras: ['url_o'].join(','),
      ...params
    }
  })

  return res.data.photos
}
