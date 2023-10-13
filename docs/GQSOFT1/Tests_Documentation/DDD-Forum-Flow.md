
## Domain Driven Design - Forum - Flow

> To run the Domain Driven Design - Test Cases, the following preconditions must be met:

   - [x] Users & Members created (2);
  
```sql

-- Create Users

INSERT INTO `data_dev`.`base_user`
(`base_user_id`, `user_email`, `is_email_verified`, `username`, `user_password`, `is_admin_user`, `is_deleted`, `created_at`, `updated_at`)
VALUES
('0f4cbd05-52ae-48c3-ba33-6170c89a5431', 'email@email.com', 0, 'username123', '$2a$10$apEpAZ4/jpDG1adc3omIJegiy2ednCTTwh5t9jTx1M7OJm3hlL27u', 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('0f4cbd05-52ae-48c3-ba33-6170c89a5432', 'tryn1@example.pt', 0, 'trynumber11', '$2a$10$apEpAZ4/jpDG1adc3omIJegiy2ednCTTwh5t9jTx1M7OJm3hlL27u', 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Create Members

INSERT INTO `data_dev`.`member`
(`member_id`, `member_base_id`, `reputation`, `created_at`, `updated_at`)
VALUES
('0152739c-86c8-46fe-87ca-61a198d9e761', '0f4cbd05-52ae-48c3-ba33-6170c89a5431', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('0152739c-86c8-46fe-87ca-61a198d9e762', '0f4cbd05-52ae-48c3-ba33-6170c89a5432', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
```

 - [x] Posts created (4);


```sql

-- Create Posts

INSERT INTO `data_dev`.`post`
(`post_id`, `member_id`, `type`, `title`, `text`, `link`, `slug`, `points`, `total_num_comments`, `created_at`, `updated_at`)
VALUES
('01234567-89ab-cdef-0123-456789abcdew', '0152739c-86c8-46fe-87ca-61a198d9e761', 'text', 'Sample Title 1', 'Sample Text 1', NULL, 'sample-slug-1', 1, 0, CURRENT_TIMESTAMP - INTERVAL 1 HOUR, CURRENT_TIMESTAMP - INTERVAL 1 HOUR),
('01234567-89ab-cdef-0123-456789abcdee', '0152739c-86c8-46fe-87ca-61a198d9e761', 'text', 'Sample Title 2', 'Sample Text 2', NULL, 'sample-slug-2', 2, 0, CURRENT_TIMESTAMP - INTERVAL 2 HOUR, CURRENT_TIMESTAMP - INTERVAL 2 HOUR),
('01234567-89ab-cdef-0123-456789abcde3', '0152739c-86c8-46fe-87ca-61a198d9e761', 'text', 'Sample Title 3', 'Sample Text 3', NULL, 'sample-slug-3', -1, 0, CURRENT_TIMESTAMP - INTERVAL 3 HOUR, CURRENT_TIMESTAMP - INTERVAL 3 HOUR),
('01234567-89ab-cdef-0123-456789abcde4', '0152739c-86c8-46fe-87ca-61a198d9e761', 'text', 'Sample Title 4', 'Sample Text 4', NULL, 'sample-slug-4', 0, 0, CURRENT_TIMESTAMP - INTERVAL 4 HOUR, CURRENT_TIMESTAMP - INTERVAL 4 HOUR);

```

- [x] Votes created (4);

```sql

-- Create Votes

INSERT INTO `data_dev`.`post_vote`
(`post_vote_id`, `post_id`, `member_id`, `type`, `created_at`, `updated_at`)
VALUES
('0d2ca687-3f2e-4db4-a575-d2fcd48c5517', '01234567-89ab-cdef-0123-456789abcdew', '0152739c-86c8-46fe-87ca-61a198d9e762', 'UPVOTE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('0d2ca687-3f2e-4db4-a575-d2fcd48c5516', '01234567-89ab-cdef-0123-456789abcdee', '0152739c-86c8-46fe-87ca-61a198d9e762', 'UPVOTE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('0d2ca687-3f2e-4db4-a575-d2fcd48c5515', '01234567-89ab-cdef-0123-456789abcde3', '0152739c-86c8-46fe-87ca-61a198d9e762', 'DOWNVOTE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('0d2ca687-3f2e-4db4-a575-d2fcd48c5514', '01234567-89ab-cdef-0123-456789abcde4', '0152739c-86c8-46fe-87ca-61a198d9e762', 'DOWNVOTE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
```

**Note:** The password is encrypted using the bcrypt algorithm. The password for all users is `password123`.


## Domain Driven Design - Test Cases

### Verify sort order of data retrieved from the database

> **Test Case 1:** Check if data is successfully retrieved - order by creation date (New).

**Description:**
Retrieve the sorted list of posts by creation date by descending order.

**Preconditions:**
1. Database connection is established.
2. Required tables and columns are set up.
3. The post table exists and contains at least two rows with different creation dates.

**Test Steps:**
1. Run the following query to retrieve data from the database:

```sql
SELECT
   post_id, member_id, type, title, text, link, slug, points, total_num_comments, created_at, updated_at
FROM
    `data_dev`.`post`
ORDER BY
    created_at DESC;
```

**Expected Result:**

The query executes without errors and the result set should contain the data from the post table, sorted in descending order based on the created_at column. The values for each column should be accurate and consistent with the corresponding records in the post table.


| post_id                                | member_id                             | type | title          | text          | link | slug          | points | total_num_comments |
|----------------------------------------|---------------------------------------|------|----------------|---------------|------|---------------|--------|--------------------|
| 01234567-89ab-cdef-0123-456789abcdew | 0152739c-86c8-46fe-87ca-61a198d9e761 | text | Sample Title 1 | Sample Text 1 | NULL | sample-slug-1 | 1      | 0                  |
| 01234567-89ab-cdef-0123-456789abcdee | 0152739c-86c8-46fe-87ca-61a198d9e761 | text | Sample Title 2 | Sample Text 2 | NULL | sample-slug-2 | 2      | 0                  |
| 01234567-89ab-cdef-0123-456789abcde3 | 0152739c-86c8-46fe-87ca-61a198d9e761 | text | Sample Title 3 | Sample Text 3 | NULL | sample-slug-3 | -1     | 0                  |
| 01234567-89ab-cdef-0123-456789abcde4 | 0152739c-86c8-46fe-87ca-61a198d9e761 | text | Sample Title 4 | Sample Text 4 | NULL | sample-slug-4 | 0      | 0                  |

**Note:** The column values for created_at and updated_at were hidden due to different results each time the query is executed.

> **Test Case 2:** Check if data is successfully retrieved from the database - order by points (Popular).

**Description:**
Retrieve the sorted list of posts by points by descending order.

**Preconditions:**
1. Database connection is established.
2. Required tables and columns are set up.
3. The post table exists and contains at least two rows with different creation dates

**Test Steps:**

1. Run the following query to retrieve data from the database:

```sql
SELECT
   post_id, member_id, type, title, text, link, slug, points, total_num_comments, created_at, updated_at
FROM
    `data_dev`.`post`
ORDER BY
    points DESC;
```

**Expected Result:**

The query executes without errors and the result set should contain the data from the post table, sorted in descending order based on the points column. The values for each column should be accurate and consistent with the corresponding records in the post table.

| post_id                                | member_id                             | type | title          | text          | link | slug          | points | total_num_comments |
|----------------------------------------|---------------------------------------|------|----------------|---------------|------|---------------|--------|--------------------|
| 01234567-89ab-cdef-0123-456789abcdee | 0152739c-86c8-46fe-87ca-61a198d9e761 | text | Sample Title 2 | Sample Text 2 | NULL | sample-slug-2 | 2      | 0                  |
| 01234567-89ab-cdef-0123-456789abcdew | 0152739c-86c8-46fe-87ca-61a198d9e761 | text | Sample Title 1 | Sample Text 1 | NULL | sample-slug-1 | 1      | 0                  |
| 01234567-89ab-cdef-0123-456789abcde4 | 0152739c-86c8-46fe-87ca-61a198d9e761 | text | Sample Title 4 | Sample Text 4 | NULL | sample-slug-4 | 0      | 0                  |
| 01234567-89ab-cdef-0123-456789abcde3 | 0152739c-86c8-46fe-87ca-61a198d9e761 | text | Sample Title 3 | Sample Text 3 | NULL | sample-slug-3 | -1     | 0                  |

**Note:** The column values for created_at and updated_at were hidden due to different results each time the query is executed.

### Verify Data Insertion

> **Test Case 3:** Create a new post with valid content.

**Description:**
Insert a post into the post table.

**Preconditions:**
1. Database connection is established.
2. Required tables and columns are set up.


**Test Steps:**

1. Run the following query to insert data into the database:

```sql
INSERT INTO `data_dev`.`post`
(`post_id`, `member_id`, `type`, `title`, `text`, `link`, `slug`, `points`, `total_num_comments`, `created_at`, `updated_at`)
VALUES
('01234567-89ab-cdef-0123-456789abcdex', '0152739c-86c8-46fe-87ca-61a198d9e761', 'text', 'New Post - Test', 'Check that it is possible to submit a post with valid content', NULL, 'new-post-test', 0, 0, CURRENT_TIMESTAMP - INTERVAL 12 HOUR, CURRENT_TIMESTAMP - INTERVAL 12 HOUR);
```


**Expected Result:**

The query executes without errors and the new post is successfully inserted into the post table. The values for each column should be accurate with the data provided in the query.


>**Test Case 4:** Validate that the post was successfully inserted into the database.

**Description:**
Retrieve the post details from the database.

**Preconditions:**

1. Database connection is established.
2. Required tables and columns are set up.
   

**Test Steps:**

1. Run the following query to retrieve data from the database:

```sql
SELECT
   post_id, member_id, type, title, text, link, slug, points, total_num_comments, created_at, updated_at
FROM
   `data_dev`.`post`
WHERE
   text = 'Check that it is possible to submit a post with valid content';
```

**Expected Result:**

The query executes without errors and a post with the specified text is returned.

| post_id                                | member_id                              | type | title           | text                                           | link | slug         | points | total_num_comments |
|----------------------------------------|----------------------------------------|------|-----------------|------------------------------------------------|------|--------------|--------|--------------------|
| 01234567-89ab-cdef-0123-456789abcdex   | 0152739c-86c8-46fe-87ca-61a198d9e761   | text | New Post - Test | Check that it is possible to submit a post with valid content |      | new-post-test | 0      | 0                  |

**Note:** The column values for created_at and updated_at were hidden due to different results each time the query is executed.

> **Repeat Test Case 1:** Check if data is successfully retrieved - order by creation date (New).

**New Expected Result:**

The query executes without errors and the result set should contain the data from the post table, sorted in descending order based on the created_at column. The values for each column should be accurate and consistent with the corresponding records in the post table.


| post_id                                | member_id                             | type | title          | text          | link | slug          | points | total_num_comments |
|----------------------------------------|---------------------------------------|------|----------------|---------------|------|---------------|--------|--------------------|
| 01234567-89ab-cdef-0123-456789abcdex   | 0152739c-86c8-46fe-87ca-61a198d9e761 | text | New Post - Test | Check that it is possible to submit a post with valid content | NULL | new-post-test | 0      | 0                  |
| 01234567-89ab-cdef-0123-456789abcdew | 0152739c-86c8-46fe-87ca-61a198d9e761 | text | Sample Title 1 | Sample Text 1 | NULL | sample-slug-1 | 1      | 0                  |
| 01234567-89ab-cdef-0123-456789abcdee | 0152739c-86c8-46fe-87ca-61a198d9e761 | text | Sample Title 2 | Sample Text 2 | NULL | sample-slug-2 | 2      | 0                  |
| 01234567-89ab-cdef-0123-456789abcde3 | 0152739c-86c8-46fe-87ca-61a198d9e761 | text | Sample Title 3 | Sample Text 3 | NULL | sample-slug-3 | -1     | 0                  |
| 01234567-89ab-cdef-0123-456789abcde4 | 0152739c-86c8-46fe-87ca-61a198d9e761 | text | Sample Title 4 | Sample Text 4 | NULL | sample-slug-4 | 0      | 0                  |

**Note:** The column values for created_at and updated_at were hidden due to different results each time the query is executed.

> **Repeat Test Case 2:** Check if data is successfully retrieved from the database - order by points (Popular).

**New Expected Result:**

The query executes without errors and the result set should contain the data from the post table, sorted in descending order based on the points column. The values for each column should be accurate and consistent with the corresponding records in the post table.

| post_id                                | member_id                             | type | title           | text           | link | slug          | points | total_num_comments |
|----------------------------------------|---------------------------------------|------|-----------------|-----------------|------|---------------|--------|--------------------|
| 01234567-89ab-cdef-0123-456789abcdee   | 0152739c-86c8-46fe-87ca-61a198d9e761  | text | Sample Title 2  | Sample Text 2   | NULL | sample-slug-2 | 2      | 0                  |
| 01234567-89ab-cdef-0123-456789abcdew   | 0152739c-86c8-46fe-87ca-61a198d9e761  | text | Sample Title 1  | Sample Text 1   | NULL | sample-slug-1 | 1      | 0                  |
| 01234567-89ab-cdef-0123-456789abcde4   | 0152739c-86c8-46fe-87ca-61a198d9e761  | text | Sample Title 4  | Sample Text 4   | NULL | sample-slug-4 | 0      | 0                  |
| 01234567-89ab-cdef-0123-456789abcdex   | 0152739c-86c8-46fe-87ca-61a198d9e761  | text | New Post - Test | Check that it is possible to submit a post with valid content | NULL | new-post-test | 0      | 0                  |
| 01234567-89ab-cdef-0123-456789abcde3   | 0152739c-86c8-46fe-87ca-61a198d9e761  | text | Sample Title 3  | Sample Text 3   | NULL | sample-slug-3 | -1     | 0                  |


**Note:** The column values for created_at and updated_at were hidden due to different results each time the query is executed.

> **Test Case 5:** Upvote a post.

**Description:**
Verify that a post can be upvoted.

**Preconditions:**

1. Database connection is established.
2. Required tables and columns are set up.

**Test Steps:**

1. Run the following query to insert data into the database:

```sql
INSERT INTO `data_dev`.`post_vote`
(`post_vote_id`, `post_id`, `member_id`, `type`, `created_at`, `updated_at`)
VALUES
('0d2ca687-3f2e-4db4-a575-d2fcd48c5519', '01234567-89ab-cdef-0123-456789abcdex', '0152739c-86c8-46fe-87ca-61a198d9e762', 'UPVOTE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
```

2. Run the following query to update the points column of the post table:

```sql
UPDATE
   data_dev.post
SET
   points = 1
WHERE
   post_id = '01234567-89ab-cdef-0123-456789abcdex';
```

**Expected Result:**

The new post vote is successfully inserted into the post_vote table. The queries execute without errors and the points column of the post table is updated to 1. The values for each column should be accurate with the data provided in the query.


> **Test Case 6:** Downvote a post.

**Description:**
Verify that a post can be downvoted.

**Preconditions:**

1. Database connection is established.
2. Required tables and columns are set up.

**Test Steps:**

1. Run the following query to insert data into the database:

```sql
INSERT INTO `data_dev`.`post_vote`
(`post_vote_id`, `post_id`, `member_id`, `type`, `created_at`, `updated_at`)
VALUES
('0d2ca687-3f2e-4db4-a575-d2fcd48c5510', '01234567-89ab-cdef-0123-456789abcdew', '0152739c-86c8-46fe-87ca-61a198d9e762', 'DOWNVOTE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
```

2. Run the following query to update the points column of the post table:

```sql
UPDATE
   data_dev.post
SET
   points = 0
WHERE
   post_id = '01234567-89ab-cdef-0123-456789abcdew';
```

**Expected Result:**

The new post vote is successfully inserted into the post_vote table. The queries execute without errors and the points column of the post table is updated to 0. The values for each column should be accurate with the data provided in the query.


> **Test Case 7:** Validate the order of the posts after voting.

**Description:**
Verify that the posts are ordered correctly after voting.

**Preconditions:**
1. Database connection is established.
2. Required tables and columns are set up.
3. The post table exists and contains at least two rows with different creation dates

**Test Steps:**

1. Run the following query to retrieve data from the database:

```sql
SELECT
   post_id, member_id, type, title, text, link, slug, points, total_num_comments, created_at, updated_at
FROM
    `data_dev`.`post`
ORDER BY
    points DESC;
```

**Expected Result:**

The query executes without errors and the posts are returned in descending order based on their points. The posts with the highest points should be returned first.

| post_id                            | member_id                          | type  | title            | text            | link | slug           | points | total_num_comments |
|------------------------------------|------------------------------------|-------|------------------|-----------------|------|----------------|--------|--------------------|
| 01234567-89ab-cdef-0123-456789abcdee | 0152739c-86c8-46fe-87ca-61a198d9e761 | text  | Sample Title 2   | Sample Text 2   | NULL | sample-slug-2  | 2      | 0                  |
| 01234567-89ab-cdef-0123-456789abcdew | 0152739c-86c8-46fe-87ca-61a198d9e761 | text  | Sample Title 1   | Sample Text 1   | NULL | sample-slug-1  | 1      | 0                  |
| 01234567-89ab-cdef-0123-456789abcdex | 0152739c-86c8-46fe-87ca-61a198d9e761 | text  | New Post - Test  | Check that it is possible to submit a post with valid content | NULL | new-post-test  | 1      | 0                  |
| 01234567-89ab-cdef-0123-456789abcde4 | 0152739c-86c8-46fe-87ca-61a198d9e761 | text  | Sample Title 4   | Sample Text 4   | NULL | sample-slug-4  | 0      | 0                  |
| 01234567-89ab-cdef-0123-456789abcde3 | 0152739c-86c8-46fe-87ca-61a198d9e761 | text  | Sample Title 3   | Sample Text 3   | NULL | sample-slug-3  | -1     | 0                  |

**Note:** The column values for created_at and updated_at were hidden due to different results each time the query is executed.

> **Test Case 8:** Validate that the upvote was successfully inserted into the database.

**Description:**

Verify that the votes were successfully inserted into the post_vote table.

**Preconditions:**

1. Database connection is established.
2. Required tables and columns are set up.

**Test Steps:**

1. Run the following query to retrieve the number of downvotes for the post:

```sql

SELECT
   COUNT(*) 
FROM
   post_vote 
WHERE
   post_id = '01234567-89ab-cdef-0123-456789abcdex' AND type = 'DOWNVOTE';
```

2. Run the following query to retrieve the number of upvotes for the post:

```sql
 SELECT
   COUNT(*) 
FROM
   post_vote 
WHERE
   post_id = '01234567-89ab-cdef-0123-456789abcdex' AND type = 'UPVOTE'
```

**Expected Result:**

The queries execute without errors and the number of posts points are returned. 
One upvote and zero downvotes should be returned.


> **Test Case 9:** Validate that the downvote was successfully inserted into the database.

**Description:**

Verify that the votes were successfully inserted into the post_vote table.

**Preconditions:**

1. Database connection is established.
2. Required tables and columns are set up.

**Test Steps:**

1. Run the following query to retrieve the number of downvotes for the post:

```sql
SELECT
   COUNT(*) 
FROM
   post_vote 
WHERE
   post_id = '01234567-89ab-cdef-0123-456789abcdew' AND type = 'DOWNVOTE';
```

2. Run the following query to retrieve the number of upvotes for the post:

```sql
 SELECT
   COUNT(*) 
FROM
   post_vote 
WHERE
   post_id = '01234567-89ab-cdef-0123-456789abcdew' AND type = 'UPVOTE';
```

**Expected Result:**

The queries execute without errors and the number of posts points are returned.
Zero upvotes and one downvote should be returned.
