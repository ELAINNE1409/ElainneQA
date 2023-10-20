# US 013 - Delete User


# 1. Tests

> **Test 1:** Verify that a member can delete a user - AC1, AC6.

**Description:**

As a member of the application, I want to have the ability to delete another user from the system.

**Precoditions:**

1. The member is logged into their own account in the application.
2. The member has permissions to delete users.
3. The member has identified the user they want to delete.
4. A member should be able to delete another user from the system.

**Test Steps:**

1. Access the list of users or the administration section of the application.
2. Find the user you want to delete.
3. Click on the "Delete User" option.
4. Confirm the deletion when prompted.

**Expected result:**

- The selected user is permanently removed from the system.
- All data associated with the user is also deleted.
- A confirmation message is displayed indicating the successful deletion of the user.

> **Test 2:** Verify that the deleted user can no longer access the system - AC1, AC2, AC3, AC3.1.1, AC4, AC5.

**Description:**

After a user is deleted by the member, the deleted user should no longer have access to the system.

**Precoditions:**

1. The member has successfully deleted another user.
2. The deleted user attempts to log in.

**Test Steps:**

1. The deleted user attempts to log in using their credentials.

**Expected result:**

- The deleted user is unable to log in.
- An error message or notification is displayed indicating that the account does not exist or has been deleted.
