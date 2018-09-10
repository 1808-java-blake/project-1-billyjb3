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
        return resp.json(reimbursements.rows);
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
        const reimbursements = await dao.getReimbursementByUser(req.body.ers_users_id);
        return resp.json(reimbursements.rows);
    }
    catch(err)
    {
        console.log(err);
        resp.sendStatus(500);
    }
});

router.post("/reimbursement-by-id", async (req, resp) => {
    try
    {
        const reimbursement = await dao.getReimbursementById(req.body.reimb_id);
        return resp.json(reimbursement.rows);
    }
    catch(err)
    {
        console.log(err);
        resp.sendStatus(500);
    }
});

router.post("/set-reimbursement-status", async (req, resp) => {
    try
    {
        await dao.setReimbursementStatus(req.body.ticketId, req.body.statusId, req.body.managerId);
    }
    catch(err)
    {
        console.log(err);
        resp.sendStatus(500);
    }
})

router.get("/pending-reimbursements", async (req, resp) => {
    try
    {
        const reimbursements = await dao.getPendingReimbursements();
        return resp.json(reimbursements.rows);
    }
    catch(err)
    {
        console.log(err);
        resp.sendStatus(err);
    }
})

router.get("/approved-reimbursements", async (req, resp) => {
    try
    {
        const reimbursements = await dao.getApprovedReimbursements();
        return resp.json(reimbursements.rows);
    }
    catch(err)
    {
        console.log(err);
        resp.sendStatus(err);
    }
})

router.get("/denied-reimbursements", async (req, resp) => {
    try
    {
        const reimbursements = await dao.getDeniedReimbursements();
        return resp.json(reimbursements.rows);
    }
    catch(err)
    {
        console.log(err);
        resp.sendStatus(err);
    }
})

