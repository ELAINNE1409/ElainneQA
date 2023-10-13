# Action

**Method:** Post 

**URL:** http://localhost:5001/api/v1/users/login

# Description

Login to the Domain Driven Designers forum website.

# Request Parameters

>
* **Body**

| Key           | Value                            | Description          |
|-------------  |----------------------------------|----------------------|
| Username | String                  | User's username |
| Password | String                  | User's password |


# Possible response codes and results


## Successful responses

>Response for an existing user with a valid password and username
  

| Status Code   | Description           | 
|--------|-----------------------|
| 200    | OK     |    

* **Body**

```json 
{
    "message": "accessToken": "string", "refreshToken": "string" 
}
```


## Server error responses

>Response for an existing user with an invalid password.

 | Status Code   | Description           | 
|------------------------|---------------------------------|
| 400    | Bad Request              |   

* **Body**

```json 
{ 
    "message": "Password doesnt match error."
}
```

## Server error responses

>Response for a non existing user with invalid number of characters in the username and password.

 | Status Code   | Description           | 
|------------------------|---------------------------------|
| 500    | Internal Server Error               |    

```json 
{ 
    "message": "TypeError: Cannot read property 'toString' of undefined"
}
```
## Server error responses

>Response for a non existing user with valid number of characters in the username and password.

 | Status Code   | Description           | 
|------------------------|---------------------------------|
| 500    | Internal Server Error               |  

```json 
{ 
    "message": "An unexpected error occurred."
}
```

## Reference to related use cases and acceptance criteria

**User Story 10:** Perform a login

* **AC1**: All requested data (username and password) must be filled in.
* **AC2**: The entered username and password must match the information provided during the account creation process. 
