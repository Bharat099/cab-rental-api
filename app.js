const express=require('express');
const app=express();
const car=require('./car');
const buyers=require('./buyers');
const bodyparser=require('body-parser')
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://bharatkmr:admin@cluster0-xo2ti.mongodb.net/test?retryWrites=true&w=majority',()=>console.log("Connected to MongoDB!"))


const Car = mongoose.model("cars");
const Buyers = mongoose.model("buyers");

const port= process.env.PORT||3000

app.listen(port,()=>console.log('Listen on Port '+port+'...'));
app.use(bodyparser.json());

//Front Page
app.get('/cab',(req,res)=>{
	res.send("Welcome to Drive Easy!");
});

//check all cars
app.get('/cab', async (req,res)=>{
	const car=await car.find();
	res.json(car);
});

//check cars availability
app.get('/cab/availability', async (req,res)=>{
	const car=await car.find({booked:false});
	res.json(car);
});

//check booked cars
app.get('/cab/book', async (req,res)=>{
	const car=await car.find({book:true});
	res.json(car);
});

//check cars by vehicle number
app.get('/cab/carnumber/:id',async (req,res)=>{
	const car=await car.find({car_number:req.params.id});
	res.json(car);
});


//Add Car
app.post('/cab',async (req,res)=>{
	console.log(req.body);
	const car =new Car({
		car_number:req.body.car_number,
    	model:req.body.model,
    	seating_capacity:req.body.seating_capacity,
    	rent_per_day:req.body.rent_per_day,
    	booked:false,
        buyer_name:null,
        issue_date:null,
        return_date:null,
    });
    
	car.save()
	.then(data =>{
		res.json(data);
	})
	.catch(err =>{
		res.json({message:err});
	})
});

//remove cars using vehicle number
app.delete('/cab/carnumber/:id',async (req,res)=>{
	const removedcar=await car.remove({car_number:req.params.id});
	res.json(removedcar);
});

//update  cars details
app.patch('/cab/carnumber/:id',async (req,res)=>{
	const updatedcar=await car.updateOne(
		{car_number:req.params.id},
		{$set:{car_number:req.body.car_number,
    	model:req.body.model,
    	seating_capacity:req.body.seating_capacity,
    	rent_per_day:req.body.rent_per_day,
    	booked:req.body.booked,
        buyer_name:req.body.buyer_name,
        issue_date:req.body.issue_date,
        return_date:req.body.return_date,}}
		);
	res.json(updatedcar);
});

//book a car using vehice number
app.patch('/cab/availability/book/carnumber/:id',async (req,res)=>{
	const bookedcar=await car.updateOne(
		{car_number:req.params.id},
		{$set:{booked:true,
		buyer_name:req.body.buyer_name,
        issue_date:req.body.issue_date,
        return_date:req.body.return_date,}}
		);
	res.json(bookedcar);
});