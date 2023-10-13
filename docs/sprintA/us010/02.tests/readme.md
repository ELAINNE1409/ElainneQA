# US 010 - Perform a login

# 1. Tests


>**Test 1:** Verify that the username box must be filled in to successfully register - AC1, AC3.

**Description:**

The user must fill in the username to successfully register. The user must not be able to register successfully if the username box is empty.

**Preconditions:**

1. User is on the forum homepage.
2. There is an option to join.

**Input:**

* Empty username box
* Valid password "password"

**Test steps:**

1. The option to join is selected and the user is directed to the create account page.
2. The option to login is selected and the user is directed to the login page.
3. Leave the username box empty.
4. Fill in the password box.
5. Click on the "Submit" button. 

**Expected result:**

* The user is not able to authenticate.
* A red pop-up notification is displayed "Yeahhhhh, you forgot to include username. (cowboyhatface)".

>**Test 2:** Verify that the password box must be filled in to successfully register - AC1, AC3.

**Description:**

The user must fill in the password to successfully register. The user must not be able to register successfully if the password box is empty.

**Preconditions:**

1. User is on the forum website's homepage.
2. There is an option to join.

**Input:**

* Valid username "username"
* Empty password box

**Test steps:**

1. The option to join is selected and the user is directed to the create account page.
2. The option to login is selected and the user is directed to the login page.
3. Fill in the username box.
4. Leave the password box empty.
5. Click on the "Submit" button. 

**Expected result:**

* The user is not able to authenticate.
* A red pop-up notification is displayed "Yeahhhhh, you forgot to include your password. (cowboyhatface)"

>**Test 3:** Check that it is not possible to perform a login when none of the requested data is filled in - AC1, AC3.

**Description:**

All requested data must be filled in. It must not be possible to perform a login with all the input boxes empty.

**Preconditions:**

1. User is on the forum website's homepage.
2. There is an option to join.

**Test steps:**

1. The option to join is selected and the user is directed to the create account page.
2. The option to login is selected and the user is directed to the login page.
3. Leave the username and password boxes empty.
5. Click on the "Submit" button. 

**Expected result:**

* The user is not able to authenticate.
* A red pop-up notification is displayed "Yeahhhhh, you forgot to include username. (cowboyhatface)"


>**Test 4:** Verify that the login is unsuccessful when the user enters an email and a password that don't match the creation account process - AC2.

**Description:**

The user must not be able to perform login if the email and password don't match the data registered during the creation account process. 

**Preconditions:**

1. User is on the forum homepage.
2. There is an option to join.

**Input:**

* Username "username" (not registered)
* Password "password" (not registered)

**Test steps:**

1. The option to join is selected and the user is directed to the create account page.
2. The option to login is selected and the user is directed to the login page.
3. Fill in the username and password boxes.
4. Click on the "Submit" button.

**Expected result:**

* The login is unsuccessful.
* A red pop-up notification is displayed "Had some trouble logging in! An unexpected error occurred. (cowboyhatface)".


>**Test 5:** Verify that the login is successful when the user enters an e-mail and a valid password that matches the creation account process - AC1, AC2, AC4.

**Description:**

The user must enter a valid username and password to perform a login. The user must be able to perform a login if the username and password are valid.

**Preconditions:**

1. User is on the forum homepage.
2. There is an option to join.

**Input:**

* Valid username "username"
* Valid password password"

**Test steps:**

1. The option to join is selected and the user is directed to the create account page.
2. The option to login is selected and the user is directed to the login page.
3. Fill in the username and password boxes.
4. Click on the "Submit" button.

**Expected result:**

* The login is successful and the user is authenticated.
* A green pop-up notification is displayed "Logged in! (cowboyhatface)".