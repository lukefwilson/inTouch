Connection.create!([
  {first_name: "bob", last_name: "shmob", email: "shmob@gmail.com", user_id: 1},
  {first_name: "hey", last_name: "last", email: "hey@hey.com", user_id: 1}
])
Group.create!([
  {user_id: 1, name: "Family"}
])
Group::HABTM_Connections.create!([
  {connection_id: 1, group_id: 1},
  {connection_id: 2, group_id: 1}
])
User.create!([
  {first_name: "test", last_name: "test", email: "test@test.com", password_digest: "$2a$10$.7bJq3ZMithOe73wOLn0auy2tKkT5OpWoSga2WO1JrUICxAIEyagy", contextio_id: nil}
])
