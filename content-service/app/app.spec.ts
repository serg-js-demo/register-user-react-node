import app from "./app";
import express = require('express');
import { Router } from 'express';
import request from "supertest";

describe("GET / - a simple api endpoint", () => {
    const agent = request.agent(app);

    it("/public", async (done) => {
        agent
            .get("/public")
            .expect("SOME PUBLIC CONTENT. Please, Sign in to see private content.")
            .expect(200, done);
    });
});