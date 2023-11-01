## US 012: Delete a user

## 1. Requirements Engineering

### 1.1. User Story Description

As a user, I want to be able to delete my account.

### 1.2. Customer Specifications and Clarifications

**From the specifications document:**

> The system requires an user authentication to access part of the forum functionalities.

**From the client clarifications:**

> **Question:** 
> What's the difference between deleting an account and logging out?
>
> **Answer:**
> When you delete an account, you are deleting all the information associated with that account. When you log out, you are just ending the session, but the information is still there.

### 1.3. Acceptance Criteria

- **AC1:** The user must be able to delete their account.
- **AC2:** Only users that have no posts, comments or votes can delete their account.
- **AC3:** The user needs to be logged in to delete their account.
- **AC4:** Only the user can delete their own account.
- **AC5:** Deleting an account will delete all the information associated with that account.

### 1.4. Found out Dependencies

- There is a dependency to "US002: Create an account", since the user needs to be registered on the forum website in order to be able to delete their account.
- There is a dependency on "US010: Perform a login" because the user needs to be logged in to the website before they can delete their account.

### 1.5 Input and Output Data

**Input Data:**

- Selected data: 
  The user triggers the logout process by selecting the "XXXXXXXXX" option.

**Output Data:**

- Successful deletion of the user account.

### 1.6. System Sequence Diagram (SSD)

**Other alternatives might exist.**

![System Sequence Diagram - Alternative One](svg/us012-system-sequence-diagram.svg)

### 1.7 Other Relevant Remarks

### 1.8. Sequence Diagram

![Sequence Diagram](../svg/us012-sequence-diagram.svg)
