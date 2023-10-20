# US013 - Delete User

## 1. Requirements Engineering

### 1.1. User Story Description

As a member, I want to delete a user

### 1.2. Customer Specifications and Clarifications

### 1.3. Acceptance Criteria

- **AC1:** The user must be logged in as a member and a success message "logged in" must be displayed.

- **AC1.1:** If the user does not have valid credentials, error messages should be displayed. Examples of error messages are: "Had some trouble logging in. An unexpected error occurred" or "Had some trouble logging in. Password doesn't match error".

- **AC2:** The delete button must be visible.

- **AC3:** There must be a text box for entering the username.

- **AC3.1.1:** error message should be displayed, stating "It's not possible to delete the user at this time. Please try again later."

- **AC4:** Only users without any posts, comments, or replies can be deleted.

- **AC5:** If it is not possible to delete the user (due to system constraints or errors), an error message should be displayed, stating "It's not possible to delete the user at this time. Please try again later."

- **AC6:** Upon successful deletion of the user, a success message should be displayed, confirming "Success! The user has been deleted."

### 1.4. Found out Dependencies

- There is a dependency to "US 002: "create an account" so that the user can be considered inactive.

### 1.5 Input and Output Data

#### Input Data:

- Username

#### Output data:

- Confirmation message validating the deleted user.\*

### 1.6. System Sequence Diagram (SSD)

![System Sequence Diagram](svg/us013-system-sequence-diagram.svg)


### 1.7 Other Relevant Remarks

### 1.8. Sequence Diagram

![Sequence Diagram](../svg/us013-sequence-diagram.svg)

