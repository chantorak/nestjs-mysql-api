## Running

Start with:
`docker compoe up`

Insert this record in the 'tenant' table in the 'masterDB' (can use 'adminer' on localhost:8080):
| organisation | host  
| :---:   | :---:
| testOrg | testOrgDB


## TO-DO
Some of the things that need completing, as this was the first time I was using NestJs, I had to spend time learning the basics
- Servcies are not complete, specifically on updating items with relationships
- There are no tests and I have not tested all the endpoints
- There is a intercepted logging but there has to be way more logs