import request from "supertest";
import app from "../app";
import { sequelize } from "../config/db";
import { User } from "../models/User";
import { Category } from "../models/Category";

describe("API Endpoints", () => {
  // Seed the DB before tests run
  beforeAll(async () => {
    // Sync DB and clear data
    await sequelize.sync({ force: true });
    // Create a test user & category (needed for posts and comments)
    await User.create({ username: "testUser", email: "test@example.com" });
    await Category.create({ name: "Test Category" });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("Posts Endpoints", () => {
    let createdPostId: number;

    it("should create a post with tags", async () => {
      const newPost = {
        title: "Test Post",
        content: "Content for test post",
        categoryId: 1, // from seeded category
        userId: 1, // from seeded user
        tagNames: ["tag1", "tag2"]
      };

      const res = await request(app)
        .post("/api/posts")
        .send(newPost)
        .set("Accept", "application/json");

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("tags");
      expect(Array.isArray(res.body.tags)).toBe(true);
      expect(res.body.tags.length).toBe(2);
      createdPostId = res.body.id;
    });

    it("should retrieve posts", async () => {
      const res = await request(app).get("/api/posts");
      expect(res.status).toBe(200);
      // Check that our created post exists in the returned list
      const postFound = res.body.find((post: any) => post.id === createdPostId);
      expect(postFound).toBeDefined();
      expect(postFound.title).toBe("Test Post");
    });

    it("should update a post and its tags", async () => {
      const updatedPost = {
        title: "Updated Test Post",
        content: "Updated content",
        categoryId: 1,
        userId: 1,
        tagNames: ["tag1", "tag3"]
      };

      const res = await request(app)
        .put(`/api/posts/${createdPostId}`)
        .send(updatedPost)
        .set("Accept", "application/json");

      expect(res.status).toBe(200);
      expect(res.body.title).toBe("Updated Test Post");
      expect(res.body.tags.length).toBe(2);
    });

    it("should delete a post", async () => {
      const res = await request(app).delete(`/api/posts/${createdPostId}`);
      expect(res.status).toBe(204);
      // Confirm deletion
      const getRes = await request(app).get("/api/posts");
      const postFound = getRes.body.find((post: any) => post.id === createdPostId);
      expect(postFound).toBeUndefined();
    });
  });

  describe("Comments Endpoints", () => {
    let createdPostId: number;
    let createdCommentId: number;

    beforeAll(async () => {
      // Create a post to comment on
      const newPost = {
        title: "Comment Post",
        content: "Post content for comments",
        categoryId: 1,
        userId: 1,
        tagNames: []
      };

      const res = await request(app)
        .post("/api/posts")
        .send(newPost)
        .set("Accept", "application/json");
      createdPostId = res.body.id;
    });

    it("should create a comment for a post", async () => {
      const commentData = { content: "This is a test comment" };
      const res = await request(app)
        .post(`/api/comments/${createdPostId}/1`)
        .send(commentData)
        .set("Accept", "application/json");

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id");
      createdCommentId = res.body.id;
    });

    it("should retrieve comments for a post", async () => {
      const res = await request(app).get(`/api/comments/post/${createdPostId}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      // Check at least one comment exists and matches our content
      const commentFound = res.body.find((c: any) => c.id === createdCommentId);
      expect(commentFound).toBeDefined();
      expect(commentFound.content).toBe("This is a test comment");
    });

    it("should update a comment", async () => {
      const updatedComment = { content: "Updated comment content" };
      const res = await request(app)
        .put(`/api/comments/${createdCommentId}`)
        .send(updatedComment)
        .set("Accept", "application/json");

      expect(res.status).toBe(200);
      expect(res.body.content).toBe("Updated comment content");
    });

    it("should delete a comment", async () => {
      const res = await request(app)
        .delete(`/api/comments/${createdCommentId}`);
      expect(res.status).toBe(204);
    });
  });

  describe("Stats Endpoint", () => {
    it("should retrieve application statistics", async () => {
      const res = await request(app).get("/api/stats");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("cpuUsage");
      expect(res.body).toHaveProperty("ramUsage");
      expect(res.body).toHaveProperty("complexDataOperation");
    });
  });
});