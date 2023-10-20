## US 012: Delete a user

## 1. Requirements Engineering

### 1.1. User Story Description

As a user, I want to have the ability to delete my account.

### 1.2. Customer Specifications and Clarifications

**From the specifications document:**

> The system requires an user authentication to access certain functionalities of the system.

**From the client clarifications:**

> **Question:** 
> What happens when a user deletes their account?
>
> **Answer:**
> When a user their account, all information associated with that account will be deleted.

### 1.3. Acceptance Criteria

- **AC1:** Users should be able to delete their account.
- **AC2:** Only users who have no posts, comments or votes can delete their account.
- **AC3:** The user must be logged in to delete their account.
- **AC4:** Only the user who owns the account can initiate the account deletion process.
- **AC5:** Deleting an account will result in the permanent removal of all associated account information.

### 1.4. Found out Dependencies

- There is a dependency on "US002: Create an Account" because a user needs to have an account before they can delete it.
- There is a dependency on "US010: Perform a Login" as the user must be logged in to initiate the account deletion process.

### 1.5 Input and Output Data

**Input Data:**

- Selected data: 
  The user triggers the logout process by selecting the "DeleteUser" option.

**Output Data:**

- Successful deletion of the user account, with all associated data permanently removed from the platform.

### 1.6. System Sequence Diagram (SSD)

**Other alternatives might exist.**

![System Sequence Diagram - Alternative One](svg/us012-system-sequence-diagram.svg)

### 1.7 Other Relevant Remarks

### 1.8. Sequence Diagram

![Sequence Diagram](../svg/us012-sequence-diagram.svg)
