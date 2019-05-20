import client from "../client.mjs";

export default async function findByUsername(username) {
  console.log('Find user by:', username)

  const res = await client.get('', {
    params: {
      method: 'flickr.people.findByUsername',
      username: username
    }
  })

  return res.data.user
}
