import {Request, Response} from 'express';
import express from 'express';
import * as dao from './exp_reimb_dao';

export const router = express.Router();

router.get('/users', [
    async (req, resp: Response) => {
        try
        {
            let users = await dao.getusers();
            resp.json(users);
        }
        catch(err)
        {
            console.log(err);
            resp.sendStatus(500);
        }
    }
]);

router.post('/login', async (req, resp) => {
    try
    {
        const user = await dao.verifyUser(req.body.username, req.body.password);
        if(user)
        {
            resp.json(user);
        }
        else
        {
            resp.sendStatus(401);
        }
    }
    catch(err)
    {
        console.log(err);
        resp.sendStatus(500);
    }
});

router.post("/register", async (req, resp) => {
    try
    {
        const user = await dao.createUser(req.body);
        if(user)
        {
            resp.sendStatus(200);
        }
        else
        {
            resp.sendStatus(401);
        }
    }
    catch(err)
    {
        console.log(err);
        resp.sendStatus(500);
    }
});

router.post("/new-ticket", async (req, resp) => {
    try
    {
        const id = await dao.createTicket(req.body);
        if(id)
        {
            resp.sendStatus(200);
        }
        else
        {
            resp.sendStatus(401);
        }
    }
    catch(err)
    {
        console.log(err);
        resp.sendStatus(500);
    }
});

router.get("/reimbursements", async (req, resp) => {
    try
    {
        const reimbursements = await dao.getReimbursements();
        return resp.json(reimbursements);
    }
    catch(err)
    {
        console.log(err);
        resp.sendStatus(500);
    }
});

router.post("/user-reimbursements", async (req, resp) => {
    try
    {   
        const reimbursements = await dao.getReimbursementByUser(req.body.userId);
        return resp.json(reimbursements.rows);
    }
    catch(err)
    {
        console.log(err);
        resp.sendStatus(500);
    }
})