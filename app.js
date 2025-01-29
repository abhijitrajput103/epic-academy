require('dotenv').config();
var express = require('express');
var app = express();
var router = express.Router();
app.use(express.static('views'));
app.use(express.static('upload'));
var userschema = require('./model/userschema'); //Import Signup Schema
var contactModel = require('./model/contactuschema');
var addcourseModel = require('./model/addcourseschema');
var studentModel = require('./model/studentdetailschema'); //Import student schema
var config = require('./db/config');
const bodyparser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;
const emailUser = process.env.EMAIL;
const emailPass = process.env.PASSWORD;
const emailService = process.env.EMAIL_SERVICE;
const otpExpiration = process.env.OTP_EXPIRATION;

app.use(bodyparser.json()); //import body-parser
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
//Session For Admin Dashboard
app.use(session({
    key: "user_abhi",
    secret: "demo@abhijit",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 1000000,
    },
}));

app.set('view engine', 'ejs');
app.use(express.static('views'));
router.get('/', async (req, res) => {
    try {
        const addcourse = await addcourseModel.find({});
        res.render('index', { addcourse: addcourse });
        console.log(addcourse);
    } catch (err) {
        console.log(err);
    }
});
router.get('/contactus', function (req, res) {
    res.render('contactus');
});
router.get('/aboutus', function (req, res) {
    res.render('index/about-us');
});

router.get('/detail/:id', async (req, res) => {
    try {
        const product = await addcourseModel.findById(req.params.id);
        res.render('detailedpage', { product: product })
        console.log(product);
    }
    catch (err) {
        console.log(err)
    }
});
//Dashboard login API
router.get('/dashboard', async (req, res) => {
    try {
        if (req.session.user && req.cookies.user_abhi) {
            res.render('dashboard/index');
        }
        else {
            res.redirect('/');
        }
    } catch (err) {
        console.log(err);
    }

});
//Dashboard Logout API
app.get("/logout", (req, res) => {
    if (req.session.user && req.cookies.user_abhi) {
        res.clearCookie("user_abhi");
        res.redirect('/')
    }
    else {
        res.redirect('/')
    }
});
//Add Course API
router.get('/addcourse', async (req, res) => {
    try {
        if (req.session.user && req.cookies.user_abhi) {
            res.render('dashboard/addcourse');
        }
        else {
            res.redirect('/');
        }
    } catch (err) {
        console.log(err);
    }

});

//Get Signup data from database
router.get('/signupdata', async (req, res) => {
    try {
        if (req.session.user && req.cookies.user_abhi) {
            const registrationdata = await userschema.find({});
            res.render('dashboard/signupdata', { registrationdata: registrationdata });
        }
        else {
            res.redirect('/');
        }
    } catch (err) {
        console.log(err);
    }

});
//Contactus data
router.get('/contactusdata', async (req, res) => {
    try {
        if (req.session.user && req.cookies.user_abhi) {
            const contactdata = await contactModel.find({});
            res.render('dashboard/contactusdata', { contactdata: contactdata });
            console.log(contactdata);
        }
        else {
            res.redirect('/');
        }
    } catch (err) {
        console.log(err);
    }

})
//Addcourse data
router.get('/viewcourse', async (req, res) => {
    try {
        if (req.session.user && req.cookies.user_abhi) {
            const addcourse = await addcourseModel.find({});
            res.render('dashboard/viewcourse', { addcourse: addcourse });
            console.log(addcourse);
        }
        else {
            res.redirect('/')
        }
    } catch (err) {
        console.log(err);
    }

})
router.get('/studentdetails', async (req, res) => {
    try {
        if (req.session.user && req.cookies.user_abhi) {
            const studentData = await studentModel.find({});
            res.render('dashboard/studentdetails', { studentData: studentData });
            console.log(studentData);
        }
        else {
            res.redirect('/')
        }
    } catch (err) {
        console.log(err);
    }
});
router.get('/enrollmentform', function (req, res) {
    res.render('common/enrollmentform');
});
//saving data in form api
router.post('/enrollment', (req, res) => {
    // Constructing the registration object
    const enrollus = {
        name: req.body.name,
        course: req.body.course,
        phone: req.body.phone,
        dob: req.body.dob,
        gender: req.body.gender,
        address: req.body.address,
        country: req.body.country,
        city: req.body.city
    };
    // Creating a new user instance
    const regpost = new studentModel(enrollus);

    // Saving the user instance to the database
    regpost.save()
        .then(() => res.json('Enrollment Complete'))
        .catch(err => res.status(400).json({ error: err.message })); // Improved error handling
});
//get resitration form
router.get('/signupform', function (req, res) {
    res.render('common/signupform');
});
//saving data in form api
router.post('/signupform', (req, res) => {
    // Constructing the registration object
    const register = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone // Corrected the key to match intended data
    };
    // Creating a new user instance
    const regpost = new userschema(register);

    // Saving the user instance to the database
    regpost.save()
        .then(() => res.json('Registration successful'))
        .catch(err => res.status(400).json({ error: err.message })); // Improved error handling
});
// login API
router.post('/login', async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    try {
        var user = await userschema.findOne({ email: email })
            .exec()
        // console.log(`user is ${user}`)
        if (!user) {
            res.redirect('/')
        }
        user.comparePassword(password, (error, match) => {
            if (!match) {
                res.redirect('/');
            }

        });
        req.session.user = user;
        res.redirect('/dashboard')

    }
    catch (error) {
        console.log(error)
    }
});


//get Add--Course form
router.get('/addcourse', function (req, res) {
    res.render('/addcourse');
});
//File Upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
        //cb(null,uuidv4()+'-'+Date.now()+path.extname(file.originalanme))
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'img/webp', 'img/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}
let upload = multer({ storage, fileFilter });
//saving data in form api
router.post('/addcourse', upload.single('courseimage'), (req, res) => {
    // Constructing the registration object
    const viewcourse = {
        coursename: req.body.coursename,
        price: req.body.price,
        discount: req.body.discount,
        courseimage: req.file.filename,
        courseoverview:req.body.courseoverview,
        subjects:req.body.subjects,
    };
    // Creating a new user instance
    const addcourse = new addcourseModel(viewcourse);

    // Saving the user instance to the database
    addcourse.save()
        .then(() => res.json('Course Added'))
        .catch(err => res.status(400).json({ error: err.message })); // Improved error handling
});



//Delete api for registration
router.get("/delete/:id", async (req, res) => {
    try {
        const logindata = await userschema.findByIdAndDelete
            (req.params.id);
        res.redirect('/signupdata');
    } catch (err) {
        console.log(err);
    }
});
//Edit API for regitration
router.get('/edit/:id', async (req, res) => {
    try {
        const useredit = await userschema.findById(req.params.id);
        res.render('dashboard/edit-register', { useredit: useredit })
        console.log(useredit);
    }
    catch (err) {
        console.log(err)
    }
})
//Update/Post data of edited field
router.post('/edit/:id', async (req, res) => {
    // Constructing the registration object
    const itemId = req.params.id;
    const updatedData = {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    }
    try {
        const updatedItem = await userschema.findByIdAndUpdate(itemId, updatedData)
        if (!updatedItem) {
            return res.status(404).json({ message: "item not found" });
        }
        res.redirect('../signupdata');
    }
    catch (err) {
        res.status(500).json({ message: 'server erroer' });
    }
});
//get contactus form
router.get('/contactusform', function (req, res) {
    res.render('/contactusform');
});
//saving data in form api
router.post('/contactusform', (req, res) => {
    // Constructing the registration object
    const contactus = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    };
    // Creating a new user instance
    const regpost = new contactModel(contactus);

    // Saving the user instance to the database
    regpost.save()
        .then(() => res.json('Message Sent'))
        .catch(err => res.status(400).json({ error: err.message })); // Improved error handling
});
//Delete api for contactus
router.get("/delete_2/:id", async (req, res) => {
    try {
        const contactusdata = await contactModel.findByIdAndDelete
            (req.params.id);
        res.redirect('/contactusdata');
    } catch (err) {
        console.log(err);
    }
});
//Edit APIs for contactus
router.get('/edit_2/:id', async (req, res) => {
    try {
        const contactusEdit = await contactModel.findById(req.params.id);
        res.render('dashboard/edit-contactus', { contactusEdit: contactusEdit })
        console.log(contactusEdit);
    }
    catch (err) {
        console.log(err)
    }
});
//Update/Post data of edited field
router.post('/edit_2/:id', async (req, res) => {
    // Constructing the registration object
    const contactusId = req.params.id;
    const editContactus = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    }
    try {
        const updatedContactus = await contactModel.findByIdAndUpdate(contactusId, editContactus)
        if (!updatedContactus) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.redirect('../contactusdata');
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

//Delete api for add course
router.get("/delete_3/:id", async (req, res) => {
    try {
        const viewcourse = await addcourseModel.findByIdAndDelete
            (req.params.id);
        res.redirect('/viewcourse');
    } catch (err) {
        console.log(err);
    }
});
//Edit APIs for add course
router.get('/edit_3/:id', async (req, res) => {
    try {
        const courseEdit = await addcourseModel.findById(req.params.id);
        res.render('dashboard/edit-course', { courseEdit: courseEdit })
        console.log(courseEdit);
    }
    catch (err) {
        console.log(err)
    }
})
//Update/Post data of edited field
router.post('/edit_3/:id', async (req, res) => {
    // Constructing the registration object
    const courseId = req.params.id;
    const editedCourse = {
        coursename: req.body.coursename,
        price: req.body.price,
        discount: req.body.discount,
        courseimage: req.body.courseimage,
        courseoverview:req.body.courseoverview,
        subjects:req.body.subjects,
    }
    try {
        const updatedCourses = await addcourseModel.findByIdAndUpdate(courseId, editedCourse)
        if (!updatedCourses) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.redirect('dashboard/edit-course');
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});
//Edit and delete for Student Details

router.get("/delete_4/:id", async (req, res) => {
    try {
        const studentData = await studentModel.findByIdAndDelete
            (req.params.id);
        res.redirect('/studentdetails');
    } catch (err) {
        console.log(err);
    }
});
//Edit API for Student Deatils
router.get('/edit_4/:id', async (req, res) => {
    try {
        const stuedit = await studentModel.findById(req.params.id);
        res.render('dashboard/edit-studentdetails', { stuedit: stuedit })
        console.log(stuedit);
    }
    catch (err) {
        console.log(err)
    }
})
//Update/Post data of edited field
router.post('/edit_4/:id', async (req, res) => {
    // Constructing the registration object
    const itemId = req.params.id;
    const updatedData = {
        name: req.body.name,
        course: req.body.course,
        phone: req.body.phone,
        dob: req.body.dob,
        gender: req.body.gender,
        address: req.body.address,
        country: req.body.country,
        city: req.body.city
    }
    try {
        const updatedItem = await studentModel.findByIdAndUpdate(itemId, updatedData)
        if (!updatedItem) {
            return res.status(404).json({ message: "item not found" });
        }
        res.redirect('../studentdetails');
    }
    catch (err) {
        res.status(500).json({ message: 'server erroer' });
    }
});

//Forgot password form
router.get("/forget", async (req, res) => {
        res.render('forgetpassword');
});
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
router.post('/generate-otp', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    // Generate OTP
    const otp = generateOTP();

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE, // or another email provider
        auth: {
            user: process.env.EMAIL, // Add your email in .env
            pass: process.env.PASSWORD, // Add your email password in .env
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`,
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);

        // Save OTP in memory or a database (for demonstration, saving in session)
        req.session.otp = otp;
        req.session.otpEmail = email;
        req.session.otpExpires = Date.now() + 300000; // OTP valid for 5 minutes

        res.json({ message: 'OTP sent successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to send OTP' });
    }
});
router.post('/verify-otp', (req, res) => {
    const { otp } = req.body;

    if (!otp) {
        return res.status(400).json({ error: 'OTP is required' });
    }

    const sessionOtp = req.session.otp;
    const otpExpires = req.session.otpExpires;

    if (Date.now() > otpExpires) {
        return res.status(400).json({ error: 'OTP has expired' });
    }

    if (otp !== sessionOtp) {
        return res.status(400).json({ error: 'Invalid OTP' });
    }

    // OTP verified
    res.json({ message: 'OTP verified successfully!' });

    // Clear the OTP from the session
    req.session.otp = null;
    req.session.otpEmail = null;
    req.session.otpExpires = null;

});

app.use('/', router);
//ip addresss of local host
app.listen(3456);