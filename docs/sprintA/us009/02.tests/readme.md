# US 009 - Check account details

# 1. Tests

> **Test 1:** Check the account details page withouth being authenticated - AC1, AC2

**Description:**

The visitor must be able to check the account details page without the need of authentication.

**Preconditions**

1. Visitor is on the forum website's homepage.
2. There is at least an existing post in the forum.

**Test steps:**

1. Select "username".
2. Check the account details page.

**Expected result:**

- The visitor is redirected to the account details when the "username" is selected.
- The visitor is able to see the account details page.

<br/>

> **Test 2:** Check the account details page with authentication - AC1, AC2

**Description:**

The user must be able to check the account details page with the respective information of the selected account.

The user must be able to check the account details page of his own account.

**Preconditions**

1. The user is on the forum website's homepage.
2. The user is authenticated.
3. There is at least an existing post in the forum from other users as well as the user's own posts.

**Test steps:**

1. Select "username" that is not the user's own username.
2. Verify the account details page information of the selected user.
3. Return to the homepage.
4. Select "username" that is the user's own username.
5. Verify the account details page information of the selected user.

**Expected result:**

- The user is redirected to the account details when the "username" is selected.
- The user is able to see his own account details page as well as the account details page from other users.

<br/>

> **Test 3:** Check the account details page information without authentication - AC1, AC2, AC3, AC4, AC5

**Description:**

The visitor must be redirected to account details when the "username" is selected.

The account details page must display the account details of the selected user such as the username, number of posts and number of comments made by that user.

The account details page must also display the user with the most comments made in the forum along with their comment count.

**Preconditions**

1. Visitor is on the forum website's homepage.
2. There is at least an existing post in the forum with comments.

**Test steps:**

1. Select "username".
2. Verify the account details page information of the selected user.
3. Verify the user with the most comments made in the forum.

**Expected result:**

- The visitor is redirected to the account details when the "username" is selected.
- The account details page must display the user details such as the username, number of posts and number of comments made by that user.
- The account details page must also display the user with the most comments made in the forum along with their comment count.

<br/>

> **Test 4:** Check the account details page information while authenticated - AC1, AC2, AC3, AC4, AC5

**Description:**

The user must be redirected to account details when the "username" is selected.

The account details page must display the account details of the selected user such as the username, number of posts and number of comments made by that user.

The account details page must also display the user with the most comments made in the forum along with their comment count.

**Preconditions**

1. User is on the forum website's homepage.
2. User is authenticated.
3. There is at least an existing post in the forum with comments.

**Test steps:**

1. Select "username".
2. Verify the account details page information of the selected user.
3. Verify the user with the most comments made in the forum.

**Expected result:**

- The user is redirected to the account details when the "username" is selected.
- The account details page must display the user details such as the username, number of posts and number of comments made by that user.
- The account details page must also display the user with the most comments made in the forum along with their comment count.

<br/>

> **Test 5:** Check that the information in the account details page is up to date - AC1, AC2, AC3, AC4, AC5, AC6

**Description:**

Verify that the account details and user with the most comments details are up to date and reflect the current state of the forum.

**Preconditions**

1. The test can be executed as a visitor or as an authenticated user.
2. Access the forum website's homepage.
3. There is at least an existing post in the forum with comments.

**Test steps:**

1. Select "username".
2. Verify the account details page information of the selected user.
3. Verify the user with the most comments made in the forum.
4. Create more posts and comments with another user through the database.
5. Return to the same account details page.
6. Verify the account details page information of the selected user.
7. Verify the user with the most comments made in the forum.

**Expected result:**

- The visitor is redirected to the account details when the "username" is selected.
- The account details page must display the user details such as the username, number of posts and number of comments made by that user.
- The account details page must also display the user with the most comments made in the forum along with their comment count.
- The account details page information must be up to date and reflect the current state of the forum.
