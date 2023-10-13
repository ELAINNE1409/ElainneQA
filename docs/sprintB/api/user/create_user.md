## Action

**Method:** Post 

**URL:** http://localhost:5001/api/v1/users/


# Description

Register an account in the Domain Driven Designers forum website.

# Request parameters

>
* **Body**

| Key           | Value                            | Description          |
|-------------  |----------------------------------|----------------------|
| Email | String                  | User's email |
| Username | String                  | User's username |
| Password | String                  | User's password |



# Possible response codes and results


## Successful responses

>Response for creating an account with a valid email, username and password

| Status Code   | Description           | 
|--------|-----------------------|
| 200    | OK     |    



## Client error responses 


>Response for an existing email

 | Status Code   | Description           | 
-----------------------|---------------------------------|
| 403    | Forbidden                   |    

* **Body**

```json 
{
    "message": The email (email) associated for this account already exists
}
```

## Server error responses

>Response for an existing username

 | Status Code   | Description           | 
|------------------------|---------------------------------|
| 409    | Conflict                |    

* **Body**

```json 
{ 
    "message": "The username (username) was already taken"
}
```


## Server error responses

>Response for trying to register with invalid data (email, username or password)

 | Status Code   | Description           | 
|------------------------|---------------------------------|
| 500    | Internal Server Error               |    

* **Body**

```json 
{ 
    "message": "TypeError: Cannot read property 'toString' of undefined"
}
```

## Reference to related use cases and acceptance criteria


**User Story 02: Create an account**

* **AC1:** All requested data (email address, username and password) must be filled in.
* **AC2:** An email must have an email format (local part + @ symbol + domain.).
* **AC3:** An username must have at least two characters.
* **AC4:** The email address must be unique.
* **AC5:** The username must be unique.
* **AC6:** A password must have at least six characters.





