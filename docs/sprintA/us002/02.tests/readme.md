# US 002 - Create an Account


# 1. Tests

>**Test 1:** Verify that the email address must be filled in to successfully register - AC1.

**Description:**

The visitor must fill in the email address to successfully register. The visitor must not be able to register successfully if the email address box is empty and the other input boxes are filled in with valid inputs. 

**Preconditions:**

1. Visitor is on the forum website's homepage.

**Input:**

* Empty email box
* Valid username "username"
* Valid password "password"

**Test steps:**
1. The option to join is selected and the user is directed to the create account page.
2. Fill in the username and password boxs.
3. Leave the email box empty.
4. Click on the "Submit" button.

**Expected result:**
* The visitor is not able to register successfully.
* A red pop-up notification is displayed "Yeahhhhh, Want to try that again with a valid email? (cowboyhatface)".

>**Test 2:** Verify that the username must be filled in to successfully register - AC1.

**Description:**

The visitor must fill in the username to successfully register. The visitor must not be able to register successfully if the username box is empty. 

**Preconditions:**

1. Visitor is on the forum website's homepage.

**Input:**

* Valid email adress "example@gmail.pt"
* Empty username box
* Valid password "password"

**Test steps:**
1. The option to join is selected and the user is directed to the create account page.
2. Fill in the email and password boxs.
3. Leave the username box empty.
4. Click on the "Submit" button.

**Expected result:**
* The visitor is not able to register successfully.
* A red pop-up notification is displayed "Yeahhhhh, you forgot your username. (cowboyhatface)"

>**Test 3:** Verify that the password must be filled in to successfully register - AC1.

**Description:**

The visitor must fill in the password to successfully register. The visitor must not be able to register successfully if the password box is empty. 

**Preconditions:**

1. Visitor is on the forum website's homepage.

**Input:**

* Valid email adress "example@gmail.pt"
* Valid username "username"
* Empty password box

**Test steps:**
1. The option to join is selected and the user is directed to the create account page.
2. Fill in the email and username boxs.
3. Leave the password box empty.
4. Click on the "Submit" button.

**Expected result:**
* The visitor is not able to register successfully.
* A red pop-up notification is displayed "Yeahhhhh, your password should be at least 6 chars (cowboyhatface)".

>**Test 4:** Verify that it is possible to register successfully with valid requested data. - AC1.

**Description:**
The visitor must be able to register successfully if the email address, username and password boxes are filled in with valid inputs.

**Preconditions:**

1. Visitor is on the forum website's homepage.

**Input:**

* Valid email adress "example@gmail.pt"
* Valid username "username"
* Valid password "password"

**Test steps:**

1. The option to join is selected and the user is directed to the create account page.
2. Fill in the email, username and password boxs.
3. Click on the "Submit" button.

**Expected result:**

* The visitor is able to register successfully.
* Green pop-up notifications are displayed "You're all signed up! Logging you in. (cowboyhatface)" and "Logged in! (cowboyhatface)".


>**Test 5:** Verify that an email must have a valid email format - AC2.

**Description:**

The email address must have the correct email format (local part + @ symbol + domain.). The visitor must not be able to register successfully if the email box is filled in with an invalid email format.

**Preconditions:**

1. User is on the forum website's homepage.

**Input:**

* Invalid email format: "invalidemail"
* Valid username "username"
* Valid password "password"

**Test steps:**

1. The option to join is selected and the user is directed to the create account page.
1. Fill in the email box.
2. Fill in the username and password boxs.
3. Click on the "Submit" button.

**Expected result:**

* The visitor is not able to register successfully.
* A red pop-up notification is displayed "Yeahhhhh, Want to try that again with a valid email? (cowboyhatface)".

>**Test 6:** Verify that a valid username must have at least two characters - AC3.

**Description:**

The username box must have at least two characters. To create an account, the visitor must not be able to register successfully if the username box is filled in with less than two characters.

**Preconditions:**

1. User is on the forum website's homepage.
2. The option to join is selected and the user is directed to the create account page.

**Input:**

* Valid email address "example@gmail.pt"
* One character username: "a"
* Valid password "password"

**Test steps:**

1. Fill in the username box. 
2. Fill in the email and password boxs.
3. Click on the "Submit" button.

**Expected result:**

* The visitor is not able to register successfully.
* A red pop-up notification is displayed  Yeahhhhh, TypeError: Cannot read property 'toString' of undefined (cowboyhatface)".


>**Test 7:** Verify that a valid email address must be unique - AC4.

**Description:**

The email address box must be unique. To register an account, the visitor must not be able to register successfully if the email address box is filled in with an email address that was already registered before.

**Preconditions:**

1. User is on the forum website's homepage.
2. The option to join is selected and the user is directed to the create account page.

**Input:**

* Email address that was already registered before.
* Valid username "username"
* Valid password "password"


**Test steps:**

1. Fill in the email address box.
2. Fill in the username and password boxs.
3. Click on the "Submit" button.

**Expected result:**

* The visitor is not able to register successfully.
* A red pop-up notification is displayed "Yeahhhhh, The email example@gmail.pt associated for this account already exists (cowboyhatface)".

>**Test 8:** Verify that a valid username must be unique - AC5.

**Description:**

The username box must be unique. To register an account, the visitor must not be able to register successfully if the username box is filled in with an username that was already registered before.

**Preconditions:**

1. User is on the forum website's homepage.
2. The option to join is selected and the user is directed to the create account page.

**Input:**

* Valid email address "example@gmail.pt"
* Username that was already registered before.
* Valid password "password"


**Test steps:**

1. Fill in the username box.
2. Fill in the email address and the password box.
3. Click on the "Submit" button.

**Expected result:**

* The visitor is not able to register successfully.
* A red pop-up notification is displayed "Yeahhhhh, The username username was already taken (cowboyhatface)".


>**Test 9:** Verify that a valid password must have at least six characters - AC6.

**Description:**

The password box must have at least six characters. To register an account, the visitor must not be able to register successfully if the password box is filled in with a password that has less than six characters.

**Preconditions:**

1. User is on the forum website's homepage.
2. The option to join is selected and the user is directed to the create account page.

**Input:**

* Valid email address "example@gmail.pt"
* Valid username "username"
* Password with less than six characters: "12345"

**Test steps:**

1. Fill in the email adress and username boxs.
2. Fill in the password box.
3. Click on the "Submit" button.

**Expected result:**

* The visitor is not able to register successfully.
* A red pop-up notification is displayed "Yeahhhhh, your password should be at least 6 chars (cowboyhatface)".


>**Test 10:** Check that success notifications are displayed when all the mandatory boxs are filled in with valid inputs - AC8.

**Description:**

Success notifications must be displayed when mandatory boxs are all correctly filled in. 

**Preconditions:**

1. User is on the forum website's homepage.
2. The option to join is selected and the user is directed to the create account page.

**Input:**

* Valid email address "example@gmail.pt"
* Valid username "username"
* Valid passwor "password"

**Test steps:**
1. Fill in the email address, username, and password.
2. Click on the "Submit" button.

**Expected result:**
* The visitor is able to register successfully.
* Green pop-up notifications are displayed "You're all signed up! Logging you in. (cowboyhatface)", "Logged in! (cowboyhatface)".

>**Test 11:** Verify that error notifications are displayed when mandatory boxs are incorrectly filled in - AC7.

* *a) Invalid email format*
* *b) Invalid username*
* *c) Invalid password*

**Description:**

Error notifications must be displayed when mandatory boxs are incorrectly filled in. The error notifications must guide the visitor to fill in the mandatory boxs with valid inputs.

**Preconditions:**

1. User is on the forum website's homepage.
2. The option to join is selected and the user is directed to the create account page.

**Input:**
* Invalid email format: "invalidemail"
* Invalid username: "a"
* Invalid password: "1234"

**Test steps:**

1. Fill in the email, username or password box with invalid inputs.
2. Click on the "Submit" button.
3. Check that error notifications are displayed for each of the boxs that were incorrectly filled in.

**Expected result:**

1. Insuccess notifications are displayed for each of the boxs that were incorrectly filled in:
E mail - "Yeahhhhh, Want to try that again with a valid email? (cowboyhatface)"
Username - "Yeahhhhh, TypeError: Cannot read property 'toString' of undefined (cowboyhatface)"
Password - "Yeahhhhh, your password should be at least 6 chars (cowboyhatface)".




