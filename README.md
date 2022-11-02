# Quokka Labs Test project

Create a .env file in the `src` folder and set JWT_TOKEN.
Please note : You can set any random value string to JWT_TOKEN as for now.

## How to run

- Create a `.env` file inside `src` folder and add JWT_TOKEN=socialmedia12345
- In the root folder run `npm install`
- Go to src folder and run `node index.js`

## Social Media Project Requirement

### POST /authors

- Create an author document from request body.
- URL : /createAuthor
- Type : POST
- Params : fName, lName, email, password

### POST /loginAuthor

- Login an author.
- URL : /login
- Type : POST
- Params : email, password

### POST /Posts

- Create a post document from request body.
- URL : /createPost
- Type : POST
- Params : title, description, postImage

Please note: Currently i don't have AWS account so i have commented amazon s3 code logic

### POST /liKePost

- Like a post.
- URL : /likePost
- Type : POST
- Params : postId
  This API will take authorId from JWT token

### GET /getPosts

- Get all posts.
- URL : /getPosts
- Type : GET

### GET /getAuthorsPosts

- Get logged in author posts.
- URL : /getAuthorsPosts
- Type : GET
  This API will take authorId from JWT token

### Authentication

- Authorisation has been implemented by using JWT token. It validates the token before every protected endpoint is called.
- Protected routes are createPost, liKePost, getPosts, getAuthorsPosts
- Set the JWT token in the request - `x-api-key`: jwt_token
