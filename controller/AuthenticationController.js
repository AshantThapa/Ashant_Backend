var usermodel= require('../models/usermodel');
var bcryptjs= require('bcryptjs');
var jwtoken = require('jsonwebtoken');

function validation(req,res,next){
usermodel.myUsers.findOne({
    where:{ email: req.body.email}
})
 .then(function(result){
    // req.email = result.dataValues.email;
    // req.usertype = result.dataValues.usertype;
            if(result != null){
                next();
            }else{
                next({"status":500,"message":"Credential didn't match"});
            }
        })
        .catch(function(err){
            next({"status":500,
                "message":err});
        })

}

function check(req, res, next) {
    usermodel.myUsers.findOne({
        where: { email: req.body.email }
    })

        .then(function (result) {
            if (result != null) {
                bcryptjs.compare(req.body.password, result.dataValues.password, function (err, res) {
                    if (res) {
                        next()
                    } else {
                        next({ "status": 409, "message": "Credential didn't match." });
                    }
                });
            } else {
                next({ "status": 409, "message": "Credential didn't match." });
            }
        })
        .catch(function (err) {
            next({ "status": 500, "message": "Error Occured" });
        })

}


function jwtTokenGen(req, res, next) {

    jwtoken.sign({
        email: req.body.email,
        accessLevel: 'admin'
    }, 'SecretKey', {
            expiresIn: "10h"
        },

        function (err, token) {
            if (err != null || undefined) {
                console.log(err)
                next({ "status": 401, "message": "Unauthorized token" })
            }
            else {
                req.genToken = token;
               
                next();

                console.log('token: ', token);
            }

        }
    )

}

function sendUserData(req, res, next) {

    usermodel.myUsers.findOne({
        where: { email: req.body.email }
    })

        .then(function (result) {
            if (result != null) {
                // res.json(result)
                res.send(
                    {
                        "message": "Login success !",
                        "token": req.genToken,
                        "result": result
                    }
                );
            }
        })
        .catch(function (err) {

            next({ "status": 500, "message": err });
        })
}

function tokenVerify(req, res, next) {

    console.log(req.headers)

    if (req.headers.authorization == undefined) {

        next({ status: 500, message: 'no authorization header present' })

    }
    else {

        let token = req.headers.authorization.slice(7, req.headers.authorization.length)

        jwtTokenGen.verify(token, 'SecretKey', function (err, decoded) {
            console.log(decoded);
            if (err != null) {
                next({ status: 500, message: err.message })
                console.log(err);
            }
            else {
                next();
            }
        })

    }
}


module.exports={
validation,
check,
jwtTokenGen,
tokenVerify,
sendUserData
}