exports.mockedPosts = [
  {
    _id: "123456",
    title: "First post",
    author: "456789",
    text: "This is the text of the first post published",
    status: "unpublished",
    createdAt: "2024-07-17T20:15:40.078+00:00",
    updatedAt: "2024-07-17T20:15:40.078+00:00",
  },
  {
    _id: "57783723",
    title: "Second post",
    author: "789824",
    status: "published",
    createdAt: "2024-07-17T20:15:40.078+00:00",
    updatedAt: "2024-07-17T20:15:40.078+00:00",
  },
];

exports.mockedUsers = [
  {
    _id: "123456",
    name: "Tomas",
    email: "tomas@mail.com",
    hashedPassword: "asdfhjkausdf5641216asd",
    salt: "546846523",
    admin: true,
  },
  {
    _id: "57783723",
    name: "Vanesa",
    email: "vanesa@mail.com",
    hashedPassword: "hdfuasdfqewr545321",
    salt: "546875631",
    admin: false,
  },
];
