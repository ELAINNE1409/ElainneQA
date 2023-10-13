/*
   File: DDD-Forum-Flow.sql
   Description: This SQL script contains queries for the DDD-Forum-Flow use cases.
   Database: data_dev
   Author: Group 4
*/

-- Data inserted into the database before testing

/*
   Section: Create users
*/

/*
   Query: Insert_New_User
   Description: Insert two new users into the base_user table.
   Parameters:
     - @base_user_id: The unique identifier for the user.
     - @user_email: The email address of the user.
     - @is_email_verified: Indicates if the email is verified (1 for verified, 0 for not verified).
     - @username: The username of the user.
     - @user_password: The password for the user.
     - @is_admin_user: Indicates if the user is an admin user (1 for admin user, 0 for regular user).
     - @is_deleted: Indicates if the user is deleted (1 for deleted, 0 for not deleted).
     - @created_at: The date and time when the user was created.
     - @updated_at: The date and time when the user was last updated
   Returns: None
*/

INSERT INTO `data_dev`.`base_user`
(`base_user_id`, `user_email`, `is_email_verified`, `username`, `user_password`, `is_admin_user`, `is_deleted`, `created_at`, `updated_at`)
VALUES
('0f4cbd05-52ae-48c3-ba33-6170c89a5431', 'email@email.com', 0, 'username123', '$2a$10$apEpAZ4/jpDG1adc3omIJegiy2ednCTTwh5t9jTx1M7OJm3hlL27u', 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('0f4cbd05-52ae-48c3-ba33-6170c89a5432', 'tryn1@example.pt', 0, 'trynumber11', '$2a$10$apEpAZ4/jpDG1adc3omIJegiy2ednCTTwh5t9jTx1M7OJm3hlL27u', 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


/*
   Section: Create members
*/

/*
   Query: Insert_New_Member
   Description: Insert two new members into the member table.
   Parameters:
     - @member_id: The unique identifier for the member.
     - @member_base_id: The identifier of the base user associated with the member.
     - @reputation: The reputation of the member.
     - @created_at: The date and time when the member was created.
   - @updated_at: The date and time when the member was last updated
   Returns: None
*/

INSERT INTO `data_dev`.`member`
(`member_id`, `member_base_id`, `reputation`, `created_at`, `updated_at`)
VALUES
('0152739c-86c8-46fe-87ca-61a198d9e761', '0f4cbd05-52ae-48c3-ba33-6170c89a5431', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('0152739c-86c8-46fe-87ca-61a198d9e762', '0f4cbd05-52ae-48c3-ba33-6170c89a5432', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


/*
   Section: Create posts
*/

/*
   Query: Insert_New_Posts
   Description: Insert new posts into the post table.
   Parameters:
     - @post_id: The unique identifier for the post.
     - @member_id: The identifier of the member who created the post.
     - @type: The type of the post (text or link)
     - @title: The title of the post.
     - @text: The content or text of the post.
     - @link: The link associated with the post (optional).
     - @slug: The slug or URL-friendly identifier for the post.
     - @points: The number of votes assigned to the post.
     - @total_num_comments: The total number of comments on the post.
   Returns: None
*/

INSERT INTO `data_dev`.`post`
(`post_id`, `member_id`, `type`, `title`, `text`, `link`, `slug`, `points`, `total_num_comments`, `created_at`, `updated_at`)
VALUES
('01234567-89ab-cdef-0123-456789abcdew', '0152739c-86c8-46fe-87ca-61a198d9e761', 'text', 'Sample Title 1', 'Sample Text 1', NULL, 'sample-slug-1', 1, 0, CURRENT_TIMESTAMP - INTERVAL 1 HOUR, CURRENT_TIMESTAMP - INTERVAL 1 HOUR),
('01234567-89ab-cdef-0123-456789abcdee', '0152739c-86c8-46fe-87ca-61a198d9e761', 'text', 'Sample Title 2', 'Sample Text 2', NULL, 'sample-slug-2', 2, 0, CURRENT_TIMESTAMP - INTERVAL 2 HOUR, CURRENT_TIMESTAMP - INTERVAL 2 HOUR),
('01234567-89ab-cdef-0123-456789abcde3', '0152739c-86c8-46fe-87ca-61a198d9e761', 'text', 'Sample Title 3', 'Sample Text 3', NULL, 'sample-slug-3', -1, 0, CURRENT_TIMESTAMP - INTERVAL 3 HOUR, CURRENT_TIMESTAMP - INTERVAL 3 HOUR),
('01234567-89ab-cdef-0123-456789abcde4', '0152739c-86c8-46fe-87ca-61a198d9e761', 'text', 'Sample Title 4', 'Sample Text 4', NULL, 'sample-slug-4', 0, 0, CURRENT_TIMESTAMP - INTERVAL 4 HOUR, CURRENT_TIMESTAMP - INTERVAL 4 HOUR);

/*
   Section: Vote on posts
*/

INSERT INTO `data_dev`.`post_vote`
(`post_vote_id`, `post_id`, `member_id`, `type`, `created_at`, `updated_at`)
VALUES
('0d2ca687-3f2e-4db4-a575-d2fcd48c5517', '01234567-89ab-cdef-0123-456789abcdew', '0152739c-86c8-46fe-87ca-61a198d9e762', 'UPVOTE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('0d2ca687-3f2e-4db4-a575-d2fcd48c5516', '01234567-89ab-cdef-0123-456789abcdee', '0152739c-86c8-46fe-87ca-61a198d9e762', 'UPVOTE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('0d2ca687-3f2e-4db4-a575-d2fcd48c5515', '01234567-89ab-cdef-0123-456789abcde3', '0152739c-86c8-46fe-87ca-61a198d9e762', 'DOWNVOTE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('0d2ca687-3f2e-4db4-a575-d2fcd48c5514', '01234567-89ab-cdef-0123-456789abcde4', '0152739c-86c8-46fe-87ca-61a198d9e762', 'DOWNVOTE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Domain Driven Design - Test Cases


-- US001 - Test Case 1: Check if data is successfully retrieved - order by creation date (New).

/*
   Query: Verify_Inserted_Posts_By_Creation_Date
   Description: Retrieve the sorted list of posts by creation date by descending order.
   Parameters: None
   Returns: Post ID, Member ID, Type, Title, Text, Link, Slug, Points, Total Number of Comments, Created At, Updated At
*/

SELECT
   post_id, member_id, type, title, text, link, slug, points, total_num_comments, created_at, updated_at
FROM
    `data_dev`.`post`
ORDER BY
    created_at DESC;


-- US001 - Test Case 2: Check if data is successfully retrieved from the database - order by points (Popular).

/*
   Query: Verify_Inserted_Posts_By_Points
   Description: Retrieve the sorted list of posts by points by descending order.
   Parameters: None
   Returns: Post ID, Member ID, Type, Title, Text, Link, Slug, Points, Total Number of Comments, Created At, Updated At
*/

SELECT
   post_id, member_id, type, title, text, link, slug, points, total_num_comments, created_at, updated_at
FROM
    `data_dev`.`post`
ORDER BY
    points DESC;


-- US003 - Test Case 3: Create a new post with valid content.

/*
   Query: Insert_Post
   Description: Insert a post into the post table.
   Parameters:
     - @post_id: The unique identifier for the post.
     - @member_id: The identifier of the member who created the post.
     - @type: The type of the post (text or link)
     - @title: The title of the post.
     - @text: The content or text of the post.
     - @link: The link associated with the post (optional).
     - @slug: The slug or URL-friendly identifier for the post.
     - @points: The number of votes assigned to the post.
     - @total_num_comments: The total number of comments on the post.
   Returns: None
*/

INSERT INTO `data_dev`.`post`
(`post_id`, `member_id`, `type`, `title`, `text`, `link`, `slug`, `points`, `total_num_comments`, `created_at`, `updated_at`)
VALUES
('01234567-89ab-cdef-0123-456789abcdex', '0152739c-86c8-46fe-87ca-61a198d9e761', 'text', 'New Post - Test', 'Check that it is possible to submit a post with valid content', NULL, 'new-post-test', 0, 0, CURRENT_TIMESTAMP - INTERVAL 12 HOUR, CURRENT_TIMESTAMP - INTERVAL 12 HOUR);


-- US004 - Test Case 4: Validate that the post was successfully inserted into the database.

/*
   Query: Validate_Post_Creation
   Description: Retrieve the post details from the database.
   Parameters: None
   Returns: Post ID, Member ID, Type, Title, Text, Link, Slug, Points, Total Number of Comments, Created At, Updated At
*/

SELECT
   post_id, member_id, type, title, text, link, slug, points, total_num_comments, created_at, updated_at
FROM
   `data_dev`.`post`
WHERE
   text = 'Check that it is possible to submit a post with valid content';


-- Verify the number of votes in a post

/*
   Query: Verify_Post_Points
   Description: Retrieve the number of votes in a post.
   Parameters: None
   Returns: Number of points
*/

SELECT
   COUNT(*)
FROM
   post_vote
WHERE
   post_id = '01234567-89ab-cdef-0123-456789abcdex';


-- US001 - Test Case 1: Check if data is successfully retrieved - order by creation date (New).

/*
   Query: Verify_Inserted_Posts_By_Creation_Date
   Description: Retrieve the sorted list of posts by creation date by descending order.
   Parameters: None
   Returns: Post ID, Member ID, Type, Title, Text, Link, Slug, Points, Total Number of Comments, Created At, Updated At
*/

SELECT
   post_id, member_id, type, title, text, link, slug, points, total_num_comments, created_at, updated_at
FROM
    `data_dev`.`post`
ORDER BY
    created_at DESC;


-- US001 - Test Case 2: Check if data is successfully retrieved from the database - order by points (Popular).

/*
   Query: Verify_Inserted_Posts_By_Points
   Description: Retrieve the sorted list of posts by points by descending order.
   Parameters: None
   Returns: Post ID, Member ID, Type, Title, Text, Link, Slug, Points, Total Number of Comments, Created At, Updated At
*/

SELECT
   post_id, member_id, type, title, text, link, slug, points, total_num_comments, created_at, updated_at
FROM
    `data_dev`.`post`
ORDER BY
    points DESC;


-- US004 - Test Case 5: Upvote a post.
-- US004 - Test Case 6: Downvote a post.

/*
   Query: Insert_Post_Vote
   Description: Insert a vote in a post
   - @post_vote_id
   - @post_id: The unique identifier for the post.
   - @member_id: The identifier of the member who created the post.
   - @type: The type of the post (text or link)
   - @created_at:It is a date and time indicating when the vote was created.
   - @update_at: It is a date and time indicating when the vote was last updated.

*/

-- UPVOTE

INSERT INTO `data_dev`.`post_vote`
(`post_vote_id`, `post_id`, `member_id`, `type`, `created_at`, `updated_at`)
VALUES
('0d2ca687-3f2e-4db4-a575-d2fcd48c5519', '01234567-89ab-cdef-0123-456789abcdex', '0152739c-86c8-46fe-87ca-61a198d9e762', 'UPVOTE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- DOWNVOTE

INSERT INTO `data_dev`.`post_vote`
(`post_vote_id`, `post_id`, `member_id`, `type`, `created_at`, `updated_at`)
VALUES
('0d2ca687-3f2e-4db4-a575-d2fcd48c5510', '01234567-89ab-cdef-0123-456789abcdew', '0152739c-86c8-46fe-87ca-61a198d9e762', 'DOWNVOTE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Update the number of points on a post

/*
   Query: Update_Post_Points
   Description: Update the number of points on a post
   Parameters: None
   Returns: None
*/

-- UPVOTE
UPDATE
   data_dev.post
SET
   points = 1
WHERE
   post_id = '01234567-89ab-cdef-0123-456789abcdex';

-- DOWNVOTE

UPDATE
   data_dev.post
SET
   points = 0
WHERE
   post_id = '01234567-89ab-cdef-0123-456789abcdew';


-- US001 - Test Case 7: Check if data is successfully retrieved from the database - order by points (Popular).

/*
   Query: Verify_Inserted_Posts_By_Points
   Description: Retrieve the sorted list of posts by points by descending order.
   Parameters: None
   Returns: Post ID, Member ID, Type, Title, Text, Link, Slug, Points, Total Number of Comments, Created At, Updated At
*/

SELECT
   post_id, member_id, type, title, text, link, slug, points, total_num_comments, created_at, updated_at
FROM
    `data_dev`.`post`
ORDER BY
    points DESC;



-- COMPLEMENTARY TEST CASES

-- Test Case 8: Validate that the upvote was successfully inserted into the database.
-- Test Case 9: Validate that the downvote was successfully inserted into the database.

/*
   Query: Check votes in post
   Description: Check if the votes in the post are correct
   - @post_vote_id: The unique identifier for the post vote.
   - @post_id: The unique identifier for the post.
   - @member_id: The identifier of the member who created the post.
   - @type: Downvote or Upvote

*/

/*
--To check upvotes in post
*/

SELECT
   COUNT(*) 
FROM
   post_vote 
WHERE
   post_id = '01234567-89ab-cdef-0123-456789abcdex' AND type = 'UPVOTE';

/*
--To check downvotes in post
*/

SELECT
   COUNT(*) 
FROM
   post_vote 
WHERE
   post_id = '01234567-89ab-cdef-0123-456789abcdex' AND type = 'DOWNVOTE';

/*
--To check total votes in post
*/

SELECT
   COUNT(*)
FROM
   post_vote
WHERE
   post_id = '01234567-89ab-cdef-0123-456789abcdex';
