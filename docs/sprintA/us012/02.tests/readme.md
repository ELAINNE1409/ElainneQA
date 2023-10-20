# US 012 - Delete User


# 1. Tests

> **Test 1:** Verify that a user can delete their own account - AC1, AC2, AC3, AC4, AC5.

**Description:**

As a user of the system, I want to be able to delete my own account.

**Precoditions:**

1. The user is logged into their own account in the system.
2. The user has no posts, comments, or votes.
3. The user is the owner of the account they wish to delete.

**Test Steps:**

1. Access the account settings or profile section of the system.
2. Find the option to delete my account.
3. Click on the "Delete User" option.
4. Confirm the deletion when prompted.

**Expected result:**

- The user's own account is permanently removed from the system.
- All data associated with the user's account is also deleted.
- A confirmation message is displayed, indicating the successful deletion of the user's own account.

> **Test 2:** Verify that a user with posts, comments, or votes cannot delete their account - AC1, AC2.

**Description:**

A user with posts, comments, or votes should not be able to delete their account.

**Precoditions:**

1. The user is logged into their own account in the system.
2. The user has one or more posts, comments, or votes.

**Test Steps:**

1. Acess the account settings or profile section of the system.
2. Look for the option to delete my account.

**Expected result:**

- The user does not see the "Delete My Account" option in their account settings.
- The user is informed that they cannot delete their account due to having posts, comments, or votes.
