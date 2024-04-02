const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const MY_ACCESS_TOKEN = process.env.Access_token_mapbox;
const geocodingClient = mbxGeocoding({ accessToken: MY_ACCESS_TOKEN });
const listingSchema = require('../models/listing');

//home route
module.exports.index = async (req, res) => {
    const data = await listingSchema.find({}).limit(20);
    res.render('listing/index', { data });
};

//show route for listing on id
module.exports.showroute = async (req, res) => {
    const id = req.params.id;
    const data = await listingSchema
        .findById(id)
        .populate({ path: 'reviews', populate: { path: 'author' } })
        .populate('owner');
    if (!data) {
        req.flash('error', 'this listing doest not exits!');
        res.redirect('/listing');
    }
    res.render('listing/show', { data });
}

//filter 
module.exports.filterlisting = async (req, res) => {
    try {
        let category = req.query._categories;
        let data = await listingSchema.find({ categories: category });
        if (!data.length) {
            req.flash('error', 'We don\'t have  this typeof category. Please try something else!');
            res.redirect('/listing'); // Redirect to a suitable page
        } else {
            res.render('listing/index', { data });     
           }
    } catch (error) {
        console.error(error);
        req.flash('error', 'An error occurred while fetching listings.');
        res.redirect('/listing'); 
    }
};


//search
 module.exports.searchlisting =  async (req, res) => {
     let {search} =   req.query;
     let data =  await listingSchema.find({ location : search })
     if (!data.length) {
        req.flash('error', 'We don\'t have any specific house and any sorry');
        res.redirect('/listing'); 
    } else {
        res.render('listing/index', { data });     
       }
   
};

//create new listing  get
module.exports.newroute = (req, res) => {
    res.render('listing/new');
}

//create new listing post
module.exports.postroute = async (req, res, next) => {
    try {
        const response = await geocodingClient.forwardGeocode({
            query: req.body.listing.location,
            limit: 1
        }).send();
                const url = req.file.path;
        const filename = req.file.filename;
        const newListing = new listingSchema(req.body.listing);
        newListing.image = { url, filename };
        newListing.owner = req.user.id;
        newListing.geometry = response.body.features[0].geometry;
        await newListing.save();
        req.flash('success', 'New listing created successfully!');
        return res.redirect('/listing');
    } catch (error) {
        console.error("Error creating listing:", error);
        req.flash('error', 'Failed to create listing.');
        return res.redirect('/listing');
    }
};

//edit listing get
module.exports.editroute = async (req, res) => {
    const id = req.params.id;
    const data = await listingSchema.findById(id);
    if (!data) {
        req.flash('error', 'this listing doest not exits!');
        res.redirect('/listing');
    }
    let originalurl = data.image.url;
    originalurl = originalurl.replace("/upload", "/upload/w_200,e_blur:100");
    res.render('listing/edit', { data, originalurl });
}

//edit post
module.exports.updateroute = async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body.listing;
    let listing = await listingSchema.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
    if (typeof req.file !== 'undefined') {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash('success', 'listing is updated successfuly!');
    res.redirect(`/listing/${id}`);
}

//delete listing
module.exports.deleteroute = async (req, res) => {
    const id = req.params.id;
    await listingSchema.findByIdAndDelete(id);
    req.flash('success', 'listing is  deleted successfuly!');
    res.redirect('/listing');
}