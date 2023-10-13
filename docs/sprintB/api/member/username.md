# Action

**Method:**  Get 

# URL

http://localhost:5001/api/v1/members/:username

# Description

Used to obtain member by username.

# Parameters

| Parameter       | Type    | Description            |
|-----------------|---------|------------------------|
| Authorization | acccess token                    | It specifies the permissions and privileges granted to the user. This header is only required when a logged in user wants to get popular posts, it is not required for a visitor. |
| username       | string  | username    |


**Request body**

```json
{ "username": "test_user" }
```

# Possible response codes and results

## Successful responses

>Response for a get member by username request, as a visitor.

>Response for a get member by username request, as a logged in user.
  
| Code | Description           | Response      |
|------|-----------------------|-----------------------|
| 200  | OK                    | 


**Body**
```json
{
    "member": {
        "reputation": 0,
        "user": {
            "username": "test_user"
        }
    }
}
```

## Client error responses

Response for unexistent username 


| Code | Description           | Response Message                |
|------|-----------------------|---------------------------------|
| 404  | Not found             | {"message": "Couldn't find a member with the username :test_user2"} |
    
