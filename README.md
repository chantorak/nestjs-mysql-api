## Running

Start with:
`docker compoe up`

Insert this record in the 'tenant' table in the 'masterDB' (can use 'adminer' on localhost:8080):
| organisation | host  
| :---:   | :---:
| testOrg | testOrgDB

## Endpoints

| method | path  
| :---:   | :---:
| POST | /auth/login
| POST | /auth/profile
| GET | /uers/1
| POST | /uers
| PATCH | /uers/1
| GET | /uers
| DELETE | /uers/1
| GET | :userId/user-profile
| PATCH | :usder/user-profile
| GET | /books/1
| POST | /books
| PATCH | /books/1
| GET | /books
| DELETE | /books/1
| GET | /books/1
| POST | /books
| PATCH | /books/1
| GET | /books
| DELETE | /books/1
| GET | /authors/1
| POST | /authors
| PATCH | /authors/1
| GET | /authors
| DELETE | /authors/1
| GET | /authors/books

## TO-DO
Some of the things that need completing, as this was the first time I was using NestJs, I had to spend time learning the basics
- Servcies are not complete, specifically on updating items with relationships
- There are no tests and I have not tested all the endpoints
- There is a intercepted logging but there has to be way more logs