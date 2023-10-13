# Action

**Method:** DELETE

# URL

http://localhost:5001/api/v1/users/:userId

# Description

Delete user in the Domain Driven Designers forum website.

# Request Parameters

>
**Headers**

Authorization: Access token

>
* **Query parameters**

Not applicable.

>
* **Body**
```json
{
    "userId": "string"
}
```


# Possible response codes and results
--------------------------------------------------------------

## Successful responses

>Response for an existing user with a valid password and username
  

| Code | Description           | Response Message                |
|------|-----------------------|---------------------------------|
| 200  | OK                    |  { "accessToken": "...", "refreshToken": "..." }    | 



## Client error responses

>Response for an existing user with an invalid password.

|Code  | Description    | Response Message         |
|-------------|--------|----------------------|
| 400     | Bad Request | { "message": "Password doesnt match error." }   |

## Server error responses

>Response for a non existing user with invalid number of characters in the username and password.

|Code  | Description    | Response Message         |
|-------------|--------|----------------------|
| 500      | Internal Server Error | { "message": "TypeError: Cannot read property 'toString' of undefined"};  |



  >Response for a non existing user with valid number of characters in the username and password.

|Code  | Description    | Response Message         |
|-------------|--------|----------------------|
| 500      | Internal Server Error | {"message": "An unexpected error occurred."}    |


------------------------------------------------------------------------

## Reference to related use cases and acceptance criteria

No related use cases and acceptance criteria.

