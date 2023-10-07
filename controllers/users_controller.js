const User = require('../models/user');

module.exports.profile = function(req,res){
    return res.render('user_sign_up',{
        title:"Sign up page"
    })
}

module.exports.signUp = function(req,res){
     return res.render('user_sign_up',{
       title:"Sign up page"
    })
}

module.exports.signIn = function(req,res){
     return res.render('user_sign_in',{
        title:'Sign in',
    })
}

// get the sign up data
module.exports.create = async function (req,res){
    User.findOne({email:req.body.email})
        .then (function(user){
        if(!user){
           User.create(req.body)
           .catch(function(err){
            console.log("error in finding a user",err);
            return res.send('/users/sign-in');
           })
        }
        else{
            console.log("already user is present ")
            alert("already user is present")
            return res.send('back');

        }
        return res.send('/users/sign-in');
    });
  

}

// sign in and create a session for user
module.exports.createSession = async function(req,res){

    // steps to authenticate
    await User.findOne({email : req.body.email})
    .then(
        function(user){
            if(user){
                if(user.password != req.body.password){
                    console.log("password did not match");
                    return res.send('back');
                }
                res.cookie('user_id',user.id);
                console.log("user logged in and cookies are");
                console.log(res.cookie);
                return res.send('/');
            }
            else{
                res.send('back');
            }
        }
    ).catch(function(err){
        console.log(err);
    })
}

// logout

module.exports.destroySession = async function(req,res){
    res.cookie('user_id','');
    res.redirect('/users/sign-in');
}