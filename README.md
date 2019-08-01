# contacts-manager-api

## API Docs

### Base API EndPoint:

```
api : http://localhost:9000/api/v1
```

### Register

```
API: /auth/register
Method: Post
Auth Header: Not Required
Body Params: { fullName: String, email: String, password: String}
Reponse: success or error
```

### Login

```
API: /auth/login
Method: Post
Auth Header: Not Required
Body Params: {  email: String, password: String}
Reponse: token with 200 code or error

```

### Create Contact

```
API: /contacts
Auth Header: Required 'Bearer Token'
Method: Post
Body Params: {  fullName: String, number: String}
Reponse: success or error
```

### Update Contact

```
API: /contacts
Auth Header: Required 'Bearer Token'
Method: Put
Body Params: {  fullName: String, number: String,contactId: String}
Reponse: success or error
```

### Get All Contact

```
API: /contacts
Auth Header: Required 'Bearer Token'
Method: Get
Query Params: {  name: String, number: String, page: Number, contactsPerPage: Number}
Reponse: success or error
```
