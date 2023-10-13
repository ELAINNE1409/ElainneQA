## Action

**Method:** Get


**URL:** http://localhost:5001/api/v1/users/me

# Description

Used to obtain information from the currently authenticated user.

# Request parameters

* **Headers**

| Key           | Value                            | Description          |
|-------------  |----------------------------------|----------------------|
| Authorization | acccess token                    | This header is mandatory to get the user's status.  Failure to do so will cause an error.|

# Possible response codes and results

## Successful responses

>Response for a valid acess token.
  
* **Status**

| Status Code   | Description           | 
|--------|-----------------------|---------------------------------|
| 200    | OK                    |  

* **Body**

```json

{
    "user": {
        "username": "francisco777","isEmailVerified": false, "isAdminUser": false,   "isDeleted": false
    }
}
```	      

## Client error responses

>Response for a get current user request, when the user is logged in bur the acess token expired or is not correct.
>Response for a get current user request, when an unexistent acess token.

* **Status**

| Status Code   | Description           | 
|--------|-----------------------|---------------------------------|
| 403    | Forbidden                   |


* **Body**

```json
{
    "message": "Token signature expired."
}
```  


* **Status**

| Status Code   | Description           | 
|--------|-----------------------|---------------------------------|
| 403    | Forbidden                   |

* **Body**

```json
{
    "message": "No access token provided."
}
```

## Reference to related use cases and acceptance criteria

