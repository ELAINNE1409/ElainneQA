# Action

**Method:** Post 

**URL:** http://localhost:5001/api/v1/users/token/refresh

# Description

Get the token refresh and the access token of an user.

# Request Parameters


>
* **Body**

| Key           | Value                            | Description          |
|-------------  |----------------------------------|----------------------|
|RefreshToken| String                  | User's refresh token |




# Possible response codes and results


## Successful responses

>Response for a valid token refresh
  
| Status Code   | Description           | 
|--------|-----------------------|---------------------------------|
| 200    | OK                    |    


* **Body**

```json 
{
    "message":  "refreshToken": "string", "accessToken": "string"
}
```


## Server error responses

>Response for an invalid token refresh.

 | Status Code   | Description           | 
|------------------------|---------------------------------|
| 404    | Not found              |   


* **Body**

```json 
{ 
    "message": "Refresh token doesn't exist"
}
```


## Reference to related use cases and acceptance criteria

* **AC1**: The entered refresh access token must match the information provided during the login process.
