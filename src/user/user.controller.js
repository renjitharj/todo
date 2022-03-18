
const user = require("./user.model")
const todo = require("./todo.model")

const jwt = require("../helpers/generateJwt")
const { types } = require("joi")

exports.userRegister = async (req, res) => {

    console.log(req.body)
    var userObject = await user.create(req.body)
    res.send(userObject)
}



exports.userLogin = async (req, res) => {

    const userObj = await user.findOne({

        username: req.body.username


    })
    if (userObj == null) {
        return res.send("Username not found")


    }

    var matched = await userObj.comparePassword(req.body.password, async (err, match) => {
        if (match) {
            gnjwt = await jwt.generateJwt(userObj._id, userObj._id, userObj._id)
            if (gnjwt.error) {
                return res.send("login failed")

            }
            else {
                return res.send({ msg: "Login success", token: gnjwt.token });

            }

        }
        else {
            return res.send("login failed")
        }

    })

}
exports.create = async (req, res) => {

    try {
        req.body.userid = req.decoded.id


        var userObject = await todo.create(req.body)
        res.send(userObject)
    }
    catch (e) {
        console.log(e)
    }


}
exports.updateTodo = async (req, res) => {
    //const todo = req.todo
    try{
    const todoobj = await todo.findByIdAndUpdate(req.params.id,req.body
   
    ,{useFindAndModify : true,new:true})
    res.send(todoobj)
}
catch(e){
    console.log(e)
}

   /* todoobj.save((err, t) => {
        if (err || !todoobj) {
            return res.status(400).json({
                error: "something went wrong while updating",
            });
        }
        res.json(todoobj);
    });*/
   
};




exports.deleteTodo = async (req, res) => {
    //const todo = req.todo;
    //todo.is_delete = true
    //var tododel = await todo.update()
    try{
        const todoobj = await todo.findByIdAndUpdate(req.params.id,{is_delete:true}
        
        ,{useFindAndModify : true,new:true})
        res.send(todoobj)
    }
    catch(e){
        console.log(e)
    }
};

exports.getTodos = async (req,res)=>{
    try{

        const todoobj = await todo.find({is_delete :false,userid : req.decoded.id})
        

        res.send(todoobj)
    }
    catch(e){
        console.log(e)
    }
     
}


