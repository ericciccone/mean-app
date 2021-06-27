const { request } = require('express');
const express = require('express');
const router = express.Router();


const { Classroom } = require('../models/classroom');


//Get All Classrooms
router.get('/api/classrooms', (req, res) => {
    Classroom.find({}, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
});

// Save Classroom
router.post('/api/classrooms/add', (req, res) => {
    const clsrm = new Classroom({
        campus: req.body.campus,
        building: req.body.building,
        room: req.body.room,
        projectorCount: req.body.projectorCount,
        projectorModel: req.body.projectorModel,
        projectorIP: req.body.projectorIP
    });
    console.log(clsrm);
    clsrm.save((err, data) => {
        res.status(200).json({ code: 200, message: 'Classroom Added Successfully', 
        addClassroom:data })
    });
});


//Get Single Classroom
router.get('/api/classrooms/:id', (req, res) => {
    Classroom.findById(req.params.id, (err,data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err)
        }
    });
});


//Update Classroom

router.put('/api/classrooms/update/:id', (req, res) => {
    const clsrm = {
        campus: req.body.campus,
        building: req.body.building,
        room: req.body.room,
        projectorCount: req.body.projectorCount,
        projectorModel: req.body.projectorModel,
        projectorIP: req.body.projectorIP
    };
    Classroom.findByIdAndUpdate(req.params.id, { $set:clsrm }, { new:true }, (err, data) => {
        if(!err) {
            res.status(200).json({ code:200, message: 'Classroom Updated Successfully',
        updatedClassroom: data})
        } else {
            console.log(err);
        }
    });
});


//Delete Classroom
router.delete('/api/classrooms/:id', (req, res) => {
    Classroom.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            res.status(200).json( { code:200, message: 'Classroom Deleted Successfully',
            deleteClassroom: data });
        }
    });
});

module.exports = router;
