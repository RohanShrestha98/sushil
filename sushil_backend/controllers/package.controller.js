const Package = require("../models/package.model")

const addPackage = async (req, res) => {
    const { title, description, price, display_image } = req.body;

    if (!title || !description || !price || !display_image ) {
        return res.status(400).json({ message: "missing fields" })
    }

    try {

        const newPackage = new Package({
            title,
            description,
            price,
            display_image,
        })

        await newPackage.save();

        return res.status(200).json({message: "package successfully added"})

    } catch (err) {
        return res.status(500).json({ message: "internal server error" })
    }
}

const deletePackage = async (req, res) => {
    const { id } = req.params;
    try {
        const package = await Package.findOneAndDelete({_id: id});

        if(!package){
            return res.status(400).json({message: "package not found"});
        }

        return res.status(200).json({
            message: "package deleted"
        })

    } catch (err) {
        return res.status(500).json({ message: "internal server error" })
    }
}

const getPackages = async (req, res) => {
    try {
        const packages = await Package.find();
        return res.status(200).json(packages);
    } catch (err) {
        return res.status(500).json({ message: "internal server error" })
    }
}

module.exports = {
    addPackage,
    deletePackage,
    getPackages
}