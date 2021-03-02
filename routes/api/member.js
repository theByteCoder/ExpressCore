const express = require('express');
const router = express.Router();
const members = require('../../Member')
const uuid = require('uuid')

// get all members
router.get('/', (req, res) => res.json(members));

// get single members
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const found = members.some(member => member.id === parseInt(id));
    if (found) {
        res.json(members.filter((member) => member.id === parseInt(id)))
    } else {
        res.status(400).json({ msg: `Id ${id} not found` });
    }
    res.json()
});

// create member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active',
    }
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'name and email are mandatory' })
    }
    members.push(newMember);
    res.json(members);
})

// update member
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const found = members.some(member => member.id === parseInt(id));
    if (found) {
        const updateMmber = req.body;
        members.forEach((member) => {
            if (member.id === parseInt(id)) {
                member.name = updateMmber.name ? updateMmber.name : member.name;
                member.email = updateMmber.email ? updateMmber.email : member.email;
                res.json({ msg: 'Member is updated', member })
            }
        })
        res.json(members.filter((member) => member.id === parseInt(id)))
    } else {
        res.status(400).json({ msg: `Id ${id} not found` });
    }
    res.json()
});

// delete member
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const found = members.some(member => member.id === parseInt(id));
    if (found) {
        res.json({ msg: `Id ${id} deleted`, members: members.filter((member) => member.id !== parseInt(id)) })
    } else {
        res.status(400).json({ msg: `Id ${id} not found` });
    }
    res.json()
});

module.exports = router;